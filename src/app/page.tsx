'use client'

import { GitHubProject } from '@/components/github-project'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  siFarcaster,
  siGithub,
  siInstagram,
  siSubstack,
  siX,
} from 'simple-icons'

// Combined post type for all sources
type Post = {
  title: string
  link: string
  pubDate: string
  date: Date
  content: string
  contentSnippet?: string
  publication: string
  slug: string
}

// Format date to a more readable format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format date to a shortened format
function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

// Extract slug from post URL
function getSlugFromUrl(url: string): string {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1] || ''
}

async function fetchSubstackPosts(
  feedUrl: string,
  publicationName: string,
): Promise<Post[]> {
  try {
    // Use our internal API route to fetch the RSS feed
    const response = await fetch(`/api/rss?url=${encodeURIComponent(feedUrl)}`)

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()
    console.log(`Feed "${publicationName}" fetched successfully:`, data.title)
    console.log('Items found:', data.items.length)

    return data.items.map(
      (item: {
        title: string
        link: string
        pubDate: string
        isoDate?: string
        content: string
        contentSnippet?: string
      }) => {
        const slug = getSlugFromUrl(item.link || '')
        const date = new Date(item.pubDate || item.isoDate || new Date())

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          date: date,
          content: item.content,
          contentSnippet: item.contentSnippet,
          publication: publicationName,
          slug: slug,
        }
      },
    )
  } catch (error) {
    console.error(`Error fetching ${publicationName} feed:`, error)
    return []
  }
}

// GitHub project type
interface GitHubProject {
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

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    'about' | 'essays' | 'code' | 'vibe' | 'skiing' | 'articles'
  >('about')
  const [posts, setPosts] = useState<Post[]>([])
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [projectError, setProjectError] = useState<string | null>(null)

  // Handle URL hash for section navigation
  useEffect(() => {
    // Function to check and set the active section based on hash
    const updateSectionFromHash = () => {
      // Get section from URL hash or default to 'about'
      const hash = window.location.hash.replace('#', '')
      const validSections = [
        'about',
        'essays',
        'code',
        'vibe',
        'skiing',
        'articles',
      ]

      if (hash && validSections.includes(hash)) {
        setActiveSection(
          hash as 'about' | 'essays' | 'code' | 'vibe' | 'skiing' | 'articles',
        )
      } else if (!hash && window.location.pathname === '/') {
        // Set default hash if we're on the homepage with no hash
        window.location.hash = 'about'
      }
    }

    // Initial check
    updateSectionFromHash()

    // Listen for hash changes
    window.addEventListener('hashchange', updateSectionFromHash)
    return () => window.removeEventListener('hashchange', updateSectionFromHash)
  }, [])

  // Fetch GitHub repos
  useEffect(() => {
    async function fetchGitHubProjects() {
      if (activeSection !== 'code') return

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
  }, [activeSection])

  // Load posts when in essays section
  useEffect(() => {
    async function loadPosts() {
      if (activeSection !== 'essays') return

      setLoadingPosts(true)

      try {
        // Fetch posts from both publications
        const [metaversePosts, avanthropologyPosts] = await Promise.all([
          fetchSubstackPosts(
            'https://themetaverseiscoming.substack.com/feed',
            'Into the Metaverse',
          ),
          fetchSubstackPosts(
            'https://avanthropology.substack.com/feed',
            'Avanthropology',
          ),
        ])

        // Combine and sort all posts by date
        const allPosts = [...metaversePosts, ...avanthropologyPosts].sort(
          (a, b) => b.date.getTime() - a.date.getTime(),
        )

        setPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoadingPosts(false)
      }
    }

    loadPosts()
  }, [activeSection])

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Brenner Spear</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="space-y-4">
          <Image
            src="/profile-photo.jpg"
            alt="Profile"
            width={200}
            height={200}
            className="rounded-md"
          />

          <div className="space-y-1">
            <button
              onClick={() => {
                window.location.hash = 'about'
                setActiveSection('about')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'about' && 'text-primary font-medium',
              )}
            >
              About
            </button>
            <button
              onClick={() => {
                window.location.hash = 'essays'
                setActiveSection('essays')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'essays' && 'text-primary font-medium',
              )}
            >
              Essays
            </button>
            <button
              onClick={() => {
                window.location.hash = 'code'
                setActiveSection('code')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'code' && 'text-primary font-medium',
              )}
            >
              Code Projects
            </button>
            <button
              onClick={() => {
                window.location.hash = 'vibe'
                setActiveSection('vibe')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'vibe' && 'text-primary font-medium',
              )}
            >
              Vibe Projects
            </button>
            <button
              onClick={() => {
                window.location.hash = 'skiing'
                setActiveSection('skiing')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'skiing' && 'text-primary font-medium',
              )}
            >
              Skiing
            </button>
            <button
              onClick={() => {
                window.location.hash = 'articles'
                setActiveSection('articles')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'articles' && 'text-primary font-medium',
              )}
            >
              Articles
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://warpcast.com/Brenner.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siFarcaster.path} />
              </svg>
              <span className="sr-only">Farcaster</span>
            </a>
            <a
              href="https://twitter.com/BrennerSpear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siX.path} />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://instagram.com/BrennerSpear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siInstagram.path} />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://substack.com/@BrennerSpear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siSubstack.path} />
              </svg>
              <span className="sr-only">Substack</span>
            </a>
            <a
              href="https://github.com/BrennerSpear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siGithub.path} />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>

        {activeSection === 'about' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
              About
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                I write about technology, crypto, and culture. My work explores
                the intersection of digital economies and human behavior.
              </p>
              <p>
                With a background in both software engineering and digital
                economics, I've spent the last several years studying how new
                technologies are reshaping our social and economic landscape.
              </p>
              <p>
                Currently, I'm focused on exploring the future of digital
                identity, creator economies, and the evolution of online
                communities. I publish regular essays through my Substack
                publications: "The Metaverse is Coming" and "Avanthropology."
              </p>
              <p>
                When I'm not writing or coding, you can find me experimenting
                with generative art, collecting NFTs, or diving into the latest
                developments in blockchain and cryptocurrency.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'essays' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
              Essays
            </h2>

            {loadingPosts ? (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <ul className="text-sm space-y-1">
                {posts.map((post, index) => (
                  <li key={index} className="flex">
                    <span className="text-muted-foreground w-24 shrink-0">
                      {formatShortDate(post.date)}
                    </span>
                    <div>
                      <Link
                        href={`/writing/${post.slug}`}
                        className="hover:text-primary"
                      >
                        {post.title}
                      </Link>
                      <span className="text-xs text-muted-foreground ml-2">
                        {post.publication}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-4">
                <p className="text-muted-foreground">
                  No posts available. Check back later.
                </p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'code' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
              Code Projects
            </h2>

            {loadingProjects ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  Loading GitHub projects...
                </p>
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
        )}

        {activeSection === 'vibe' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">
              Vibe Projects
            </h2>
            <ul className="text-sm space-y-3">
              <li className="flex flex-col">
                <Link
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Digital Garden
                </Link>
                <p className="text-muted-foreground text-xs">
                  A collection of interconnected thoughts and ideas on
                  technology and culture
                </p>
              </li>
              <li className="flex flex-col">
                <Link
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Crypto Art Collection
                </Link>
                <p className="text-muted-foreground text-xs">
                  Curated NFT art pieces exploring the intersection of
                  technology and creativity
                </p>
              </li>
              <li className="flex flex-col">
                <Link
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Ambient Music Project
                </Link>
                <p className="text-muted-foreground text-xs">
                  Generative audio experiments created with algorithmic
                  composition techniques
                </p>
              </li>
              <li className="flex flex-col">
                <Link
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Photography Series: Urban Patterns
                </Link>
                <p className="text-muted-foreground text-xs">
                  Visual exploration of geometric patterns in urban environments
                </p>
              </li>
              <li className="flex flex-col">
                <Link
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Reading List & Notes
                </Link>
                <p className="text-muted-foreground text-xs">
                  Annotated collection of books and articles that have shaped my
                  thinking
                </p>
              </li>
            </ul>
          </div>
        )}

        {activeSection === 'skiing' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">
              Skiing
            </h2>
            <div className="text-muted-foreground text-sm mt-4">TBD</div>
          </div>
        )}

        {activeSection === 'articles' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
              Recommended Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    The Atlantic • Adam Grant • March 2022
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    The Science of Productive Disagreement
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Essential framework for having better arguments in an
                    increasingly polarized world
                  </p>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    MIT Technology Review • Karen Hao • February 2021
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    The Messy Truth About Social Credit
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Excellent analysis that cuts through the hype and explores
                    the nuanced reality
                  </p>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    Not Boring • Packy McCormick • May 2021
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    The Great Online Game
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Changed how I think about career development in the internet
                    age
                  </p>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    Astral Codex Ten • Scott Alexander • July 2020
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    Meditations on Moloch
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Profound exploration of coordination problems in society
                  </p>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="/placeholder.jpg"
                    alt="Article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    Stratechery • Ben Thompson • August 2019
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    Aggregation Theory
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Essential framework for understanding power in the internet
                    economy
                  </p>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md">
                <div className="h-40 bg-muted relative">
                  <Image
                    src="https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/01/Edge1.png"
                    alt="AI Revolution article thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">
                    <a
                      href="https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      Wait But Why • Tim Urban • January 2015
                    </a>
                  </div>
                  <h3 className="font-medium text-sm mb-1">
                    The AI Revolution: The Road to Superintelligence
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Prescient exploration of AI development and potential
                    implications
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
