'use client'

import { GitHubProject } from '@/components/github-project'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// GitHub project type
interface GitHubProjectType {
  name: string
  description: string
  language: string
  stars: number
  url: string
  featured: boolean
  order?: number
  updatedAt: string
  owner: string
  fullName: string
}

export default function Code() {
  const [projects, setProjects] = useState<GitHubProjectType[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projectError, setProjectError] = useState<string | null>(null)

  // Fetch GitHub repos
  useEffect(() => {
    async function fetchGitHubProjects() {
      setLoadingProjects(true)

      try {
        const response = await fetch('/api/github')
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub projects')
        }

        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
          setProjectError(null)
        } else {
          console.error('GitHub API returned no projects')
          setProjectError('No GitHub projects found')
        }
      } catch (error) {
        console.error('Error fetching GitHub projects:', error)
        setProjectError('Error loading GitHub projects')
      } finally {
        setLoadingProjects(false)
      }
    }

    fetchGitHubProjects()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
        Code Projects
      </h2>

      {loadingProjects ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Loading GitHub projects...</p>
        </div>
      ) : projectError ? (
        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            {projectError}.{' '}
            <Link
              href="https://github.com/BrennerSpear"
              className="text-primary hover:underline"
            >
              View all projects on GitHub
            </Link>
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            No GitHub projects found.{' '}
            <Link
              href="https://github.com/BrennerSpear"
              className="text-primary hover:underline"
            >
              View all projects on GitHub
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {projects.map((project) => (
              <GitHubProject
                key={project.fullName || project.name}
                name={project.name}
                description={project.description}
                language={project.language}
                stars={project.stars}
                url={project.url}
                owner={project.owner}
                fullName={project.fullName}
                featured={false}
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="https://github.com/BrennerSpear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View more projects on GitHub →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
