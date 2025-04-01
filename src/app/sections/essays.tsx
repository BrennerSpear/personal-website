'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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

export default function Essays() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  // Load posts
  useEffect(() => {
    async function loadPosts() {
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
  }, [])

  return (
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
  )
}
