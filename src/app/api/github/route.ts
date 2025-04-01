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
  fork: boolean
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
  'metagame-xyz/evm-translator': {
    featured: true,
    order: 1,
    description: 'Human-readable explanations of Ethereum transactions',
  },
  coinbase_pro_bot_aws_lambda: {
    featured: true,
    order: 2,
    description:
      'AWS Lambda function for automated cryptocurrency trading on Coinbase Pro',
  },
  onoma: {
    featured: true,
    order: 3,
    description: 'Decentralized naming protocol with on-chain resolution',
  },
  'vibe-extension': {
    featured: true,
    order: 4,
    description: 'Browser extension for enhanced web3 social interactions',
  },
  // All other repos will be ignored or shown as non-featured
}

// Helper function to fetch repos from a user or organization
async function fetchGitHubRepos(
  source: string,
  isOrg = false,
): Promise<GitHubRepo[]> {
  const endpoint = isOrg
    ? `https://api.github.com/orgs/${source}/repos?per_page=100`
    : `https://api.github.com/users/${source}/repos?per_page=100`

  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    },
    next: {
      revalidate: 3600, // Cache for 1 hour
    },
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
      fetchGitHubRepos(organizationName, true),
    ])

    // Combine repos from both sources
    const allRepos = [...personalRepos, ...orgRepos]

    // Process and filter repos
    const processedRepos = allRepos
      .filter((repo) => !repo.fork) // No forks
      .map((repo) => {
        // Get repo identifier - either 'name' for personal repos or 'org/name' for org repos
        const repoId = repo.full_name.includes('/')
          ? repo.full_name.split('/')[1] === personalUsername
            ? repo.name // Personal repo
            : repo.full_name // Org repo
          : repo.name

        // Check if this is one of our featured repos based on repo name
        const isSpecifiedRepo =
          repo.name === 'evm-translator' ||
          repo.name === 'coinbase_pro_bot_aws_lambda' ||
          repo.name === 'onoma' ||
          repo.name === 'vibe-extension'

        // Get the config if available
        const config = featuredRepoConfig[repoId] ||
          featuredRepoConfig[repo.full_name] || { featured: false }

        return {
          name: repo.name,
          owner: repo.full_name.split('/')[0],
          fullName: repo.full_name,
          description: config.description || repo.description || '',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          url: repo.html_url,
          featured: isSpecifiedRepo, // Mark the four specific repos as featured
          order: isSpecifiedRepo ? config.order : undefined,
          updatedAt: repo.updated_at,
        }
      })

    // Define the names of repositories we want to display
    const wantedRepoNames = [
      'evm-translator',
      'coinbase_pro_bot_aws_lambda',
      'onoma',
      'vibe-extension',
    ]

    // Filter to only include these specific repos
    const specificRepos = processedRepos
      .filter((repo) => wantedRepoNames.includes(repo.name))
      .sort((a, b) => {
        // Custom sort order based on our desired sequence
        const order: Record<string, number> = {
          'evm-translator': 1,
          coinbase_pro_bot_aws_lambda: 2,
          onoma: 3,
          'vibe-extension': 4,
        }
        return (order[a.name] || 99) - (order[b.name] || 99)
      })

    // Other repos (not the specific four we want) sorted by star count
    const otherRepos = processedRepos
      .filter(
        (repo) =>
          repo.name !== 'evm-translator' &&
          repo.name !== 'coinbase_pro_bot_aws_lambda' &&
          repo.name !== 'onoma' &&
          repo.name !== 'vibe-extension',
      )
      .sort((a, b) => b.stars - a.stars)

    // Return just the specific repos
    const resultRepos = specificRepos

    return NextResponse.json(resultRepos)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 },
    )
  }
}
