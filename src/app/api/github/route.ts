'use server'

import { NextResponse } from 'next/server'

// GitHub API types
interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
}

// Featured projects configuration - can be expanded with other metadata
interface FeaturedConfig {
  [key: string]: {
    featured: boolean
    order?: number
    description?: string // Override GitHub description if needed
  }
}

// List of repos you want to feature and their order
const featuredRepoConfig: FeaturedConfig = {
  'metaverse-sdk': { 
    featured: true, 
    order: 1 
  },
  'blockchain-identity': { 
    featured: true, 
    order: 2 
  },
  'defi-dashboard': { 
    featured: true, 
    order: 3 
  },
  // Add more repos here as needed
}

export async function GET() {
  try {
    // GitHub username - replace with yours
    const username = 'BrennerSpear'
    
    // Fetch repos from GitHub API - no sort parameter, we'll sort them ourselves
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Use GitHub token from env if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && { 
          'Authorization': `token ${process.env.GITHUB_TOKEN}` 
        })
      },
      next: { 
        revalidate: 3600 // Cache for 1 hour
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Process and filter repos
    const processedRepos = repos
      .filter(repo => !repo.fork) // Only include non-forked repos
      .map(repo => {
        const config = featuredRepoConfig[repo.name] || { featured: false }
        
        return {
          name: repo.name,
          description: config.description || repo.description || '',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          url: repo.html_url,
          featured: config.featured,
          order: config.order,
          updatedAt: repo.updated_at
        }
      })

    // Sort all repositories by star count (highest first)
    const starSortedRepos = [...processedRepos].sort((a, b) => b.stars - a.stars)
    
    // Get featured repos in their configured order
    const featuredRepos = processedRepos
      .filter(repo => repo.featured)
      .sort((a, b) => {
        // Sort by specified order if available
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        // Fall back to stars for featured repos without explicit order
        return b.stars - a.stars
      })
    
    // Get non-featured repos sorted by stars
    const nonFeaturedRepos = starSortedRepos.filter(repo => !repo.featured)
    
    // Combine: featured repos first (in order), then non-featured by stars
    const sortedRepos = [...featuredRepos, ...nonFeaturedRepos]

    return NextResponse.json(sortedRepos)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}