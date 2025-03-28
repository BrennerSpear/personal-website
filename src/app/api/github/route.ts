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
// Format: 'owner/repoName' or just 'repoName' for personal repos
const featuredRepoConfig: FeaturedConfig = {
  'metaverse-sdk': { 
    featured: true, 
    order: 1 
  },
  'blockchain-identity': { 
    featured: true, 
    order: 2 
  },
  'metagame-xyz/generative-art-ui': { 
    featured: true, 
    order: 3,
    description: 'Open source UI for generative art projects with wallet connection, minting, and gallery features'
  },
  'metagame-xyz/evm-translator': {
    featured: true,
    order: 4,
    description: 'Human-readable explanations of Ethereum transactions'
  },
  // Add more repos here as needed
}

// Helper function to fetch repos from a user or organization
async function fetchGitHubRepos(source: string, isOrg = false): Promise<GitHubRepo[]> {
  const endpoint = isOrg 
    ? `https://api.github.com/orgs/${source}/repos?per_page=100` 
    : `https://api.github.com/users/${source}/repos?per_page=100`
  
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && { 
        'Authorization': `token ${process.env.GITHUB_TOKEN}` 
      })
    },
    next: { 
      revalidate: 3600 // Cache for 1 hour
    }
  })

  if (!response.ok) {
    console.error(`GitHub API error for ${source}: ${response.status}`)
    return []
  }

  return await response.json()
}

export async function GET() {
  try {
    // Sources to fetch repos from
    const personalUsername = 'BrennerSpear'
    const organizationName = 'metagame-xyz'
    
    // Fetch repos from both sources in parallel
    const [personalRepos, orgRepos] = await Promise.all([
      fetchGitHubRepos(personalUsername),
      fetchGitHubRepos(organizationName, true)
    ])
    
    // Combine repos from both sources
    const allRepos = [...personalRepos, ...orgRepos]

    // Process and filter repos
    const processedRepos = allRepos
      .filter(repo => !repo.fork) // Only include non-forked repos
      .map(repo => {
        // Get repo identifier - either 'name' for personal repos or 'org/name' for org repos
        const repoId = repo.full_name.includes('/') 
          ? repo.full_name.split('/')[1] === personalUsername 
            ? repo.name  // Personal repo
            : repo.full_name  // Org repo
          : repo.name
          
        const config = featuredRepoConfig[repoId] || featuredRepoConfig[repo.full_name] || { featured: false }
        
        return {
          name: repo.name,
          owner: repo.full_name.split('/')[0],
          fullName: repo.full_name,
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