'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  siX,
  siGithub,
  siInstagram,
  siSubstack,
  siFarcaster,
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
  return urlParts[urlParts.length - 1]
}

async function fetchSubstackPosts(feedUrl: string, publicationName: string): Promise<Post[]> {
  try {
    // Use our internal API route to fetch the RSS feed
    const response = await fetch(`/api/rss?url=${encodeURIComponent(feedUrl)}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`Feed "${publicationName}" fetched successfully:`, data.title)
    console.log('Items found:', data.items.length)
    
    return data.items.map(item => {
      const slug = getSlugFromUrl(item.link || '')
      const date = new Date(item.pubDate || item.isoDate)
      
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        date: date,
        content: item.content,
        contentSnippet: item.contentSnippet,
        publication: publicationName,
        slug: slug
      }
    })
  } catch (error) {
    console.error(`Error fetching ${publicationName} feed:`, error)
    return []
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    'about' | 'writings' | 'code' | 'vibe'
  >('about')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      if (activeSection !== 'writings') return;
      
      setLoading(true);
      
      try {
        // Fetch posts from both publications
        const [metaversePosts, avanthropologyPosts] = await Promise.all([
          fetchSubstackPosts('https://themetaverseiscoming.substack.com/feed', 'Into the Metaverse'),
          fetchSubstackPosts('https://avanthropology.substack.com/feed', 'Avanthropology')
        ])
        
        // Combine and sort all posts by date
        const allPosts = [...metaversePosts, ...avanthropologyPosts]
          .sort((a, b) => b.date.getTime() - a.date.getTime())
        
        setPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
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
              onClick={() => setActiveSection('about')}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'about' && 'text-primary font-medium',
              )}
            >
              About
            </button>
            <button
              onClick={() => setActiveSection('writings')}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'writings' && 'text-primary font-medium',
              )}
            >
              Writings
            </button>
            <button
              onClick={() => setActiveSection('code')}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'code' && 'text-primary font-medium',
              )}
            >
              Code Projects
            </button>
            <button
              onClick={() => setActiveSection('vibe')}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'vibe' && 'text-primary font-medium',
              )}
            >
              Vibe Projects
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
                With a background in both software engineering and digital economics,
                I've spent the last several years studying how new technologies are 
                reshaping our social and economic landscape.
              </p>
              <p>
                Currently, I'm focused on exploring the future of digital identity, 
                creator economies, and the evolution of online communities. I publish 
                regularly through my Substack publications: "The Metaverse is Coming" and "Avanthropology."
              </p>
              <p>
                When I'm not writing or coding, you can find me experimenting with generative art,
                collecting NFTs, or diving into the latest developments in blockchain and cryptocurrency.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'writings' && (
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
              Writings
            </h2>
            
            {loading ? (
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
                <p className="text-muted-foreground">No posts available. Check back later.</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'code' && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">
              Code Projects
            </h2>
            <ul className="text-sm space-y-3">
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    project-alpha
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">TypeScript</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      42
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  A decentralized application for NFT trading and marketplace
                  analytics
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    crypto-analytics
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">Python</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      28
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  Data visualization tools for cryptocurrency markets and trend
                  analysis
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    metaverse-sdk
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">JavaScript</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      76
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  Developer toolkit for building metaverse experiences and
                  virtual environments
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    blockchain-identity
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">Rust</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      54
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  Decentralized identity solution using blockchain technology
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    defi-dashboard
                  </Link>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-3">TypeScript</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      31
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  Dashboard for monitoring DeFi investments and portfolio
                  performance
                </p>
              </li>
            </ul>
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
      </div>
    </div>
  )
}