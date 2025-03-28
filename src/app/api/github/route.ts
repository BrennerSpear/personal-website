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
    
    // Fetch repos from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
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

    // Sort repos: featured first (by order), then by stars
    const sortedRepos = processedRepos.sort((a, b) => {
      // First sort by featured status
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then sort featured repos by order
      if (a.featured && b.featured) {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        return b.stars - a.stars // Fallback to stars if order is not defined
      }
      
      // Sort non-featured repos by stars
      return b.stars - a.stars
    })

    return NextResponse.json(sortedRepos)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}