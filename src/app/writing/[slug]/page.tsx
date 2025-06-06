'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as React from 'react'

// Article type
type Article = {
  title: string
  link: string
  pubDate: string
  content: string
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

// Extract slug from post URL
function getSlugFromUrl(url: string): string {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1] || ''
}

// Function to clean up HTML content
function cleanHtmlContent(html: string): string {
  if (!html) return ''

  // Remove social buttons, sharing sections, and other Substack UI elements
  let cleanedHtml = html

  // Remove Substack buttons container
  cleanedHtml = cleanedHtml.replace(
    /<div class="button-wrapper.*?<\/div>/gs,
    '',
  )

  // Remove share buttons
  cleanedHtml = cleanedHtml.replace(/<div class="share.*?<\/div>/gs, '')

  // Remove subscription widget wrap editor completely
  cleanedHtml = cleanedHtml.replace(
    /<div class="subscription-widget-wrap-editor".*?<\/div><\/div><\/div>/gs,
    '',
  )

  // Remove "Like" buttons and counters
  cleanedHtml = cleanedHtml.replace(/<button.*?like-button.*?<\/button>/gs, '')

  // Remove comment sections
  cleanedHtml = cleanedHtml.replace(
    /<section class="comments.*?<\/section>/gs,
    '',
  )

  // Remove any other UI elements with specific classes
  cleanedHtml = cleanedHtml.replace(
    /<div class="button-container.*?<\/div>/gs,
    '',
  )
  cleanedHtml = cleanedHtml.replace(/<div class="social-share.*?<\/div>/gs, '')

  // Remove Substack footer section (which often contains buttons)
  cleanedHtml = cleanedHtml.replace(/<div class="post-footer.*?<\/div>/gs, '')
  cleanedHtml = cleanedHtml.replace(/<div class="footer.*?<\/div>/gs, '')

  // Remove any divs with IDs commonly used for UI elements
  cleanedHtml = cleanedHtml.replace(/<div id="share-buttons.*?<\/div>/gs, '')

  // Remove any div with "button" in its class name
  cleanedHtml = cleanedHtml.replace(
    /<div[^>]*class="[^"]*button[^"]*".*?<\/div>/gs,
    '',
  )

  // Remove any buttons
  cleanedHtml = cleanedHtml.replace(/<button.*?<\/button>/gs, '')

  // Remove all SVG elements and divs containing SVGs
  cleanedHtml = cleanedHtml.replace(/<svg.*?<\/svg>/gs, '')
  cleanedHtml = cleanedHtml.replace(
    /<div[^>]*>(\s*<svg.*?<\/svg>\s*)<\/div>/gs,
    '',
  )

  return cleanedHtml
}

async function fetchPostFromRSS(slug: string): Promise<Article | null> {
  try {
    // Try fetching from both RSS feeds
    const metaverseFeedUrl = 'https://themetaverseiscoming.substack.com/feed'
    const avanthropologyFeedUrl = 'https://avanthropology.substack.com/feed'

    const [metaverseResponse, avanthropologyResponse] = await Promise.all([
      fetch(`/api/rss?url=${encodeURIComponent(metaverseFeedUrl)}`),
      fetch(`/api/rss?url=${encodeURIComponent(avanthropologyFeedUrl)}`),
    ])

    if (!metaverseResponse.ok || !avanthropologyResponse.ok) {
      throw new Error('Failed to fetch from one or both RSS feeds')
    }

    const metaverseData = await metaverseResponse.json()
    const avanthropologyData = await avanthropologyResponse.json()

    // Search in both feeds for the article with the matching slug
    const metaverseArticle = metaverseData.items.find(
      (item: { link: string }) => {
        const itemSlug = getSlugFromUrl(item.link || '')
        return itemSlug === slug
      },
    )

    const avanthropologyArticle = avanthropologyData.items.find(
      (item: { link: string }) => {
        const itemSlug = getSlugFromUrl(item.link || '')
        return itemSlug === slug
      },
    )

    // Use the article we found
    const foundArticle = metaverseArticle || avanthropologyArticle

    if (!foundArticle) {
      console.error('Post not found with slug:', slug)
      return null
    }

    // Clean up the HTML content to remove unwanted UI elements
    const cleanedContent = cleanHtmlContent(foundArticle.content || '')

    return {
      title: foundArticle.title,
      link: foundArticle.link,
      pubDate: foundArticle.pubDate,
      content: cleanedContent,
      publication: metaverseArticle ? 'Into the Metaverse' : 'Avanthropology',
      slug: slug,
    }
  } catch (error) {
    console.error('Error fetching post data:', error)
    return null
  }
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  // Unwrap params using React.use()
  const resolvedParams = React.use(params)
  const { slug } = resolvedParams

  // Load article data
  useEffect(() => {
    async function loadArticle() {
      try {
        const fetchedArticle = await fetchPostFromRSS(slug)
        setArticle(fetchedArticle)
      } catch (error) {
        console.error('Error loading article:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  // Add style to ensure buttons don't show
  useEffect(() => {
    // Add CSS to hide any remaining buttons that might be in the content
    const style = document.createElement('style')
    style.innerHTML = `
      /* Hide Substack UI elements */
      .button-wrapper, .button-container, .social-share, .share,
      button[class*="like"], section.comments, .post-footer, .footer,
      div[class*="button"]:not(.primary), div[id*="button"], button:not(.primary), .action-bar, 
      div[class*="share"], div[class*="social"], div[class*="follow"], 
      .subscription-footer, .footer-wrapper, .fake-input-wrapper {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        pointer-events: none !important;
      }
      
      /* Hide images that are often used as social buttons or UI elements */
      img[src*="button"], img[src*="share"], img[src*="social"], 
      img[src*="facebook"], img[src*="twitter"], img[src*="linkedin"] {
        display: none !important;
      }
      
      /* Hide all SVG elements */
      svg, div > svg, figure > svg, span > svg {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* Hide any subscription widget that might not be caught by the regex */
      .subscription-widget-wrap-editor, .subscription-widget-subscribe, .subscription-widget {
        display: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="flex items-center text-primary hover:underline text-sm"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Home
          </Link>
          <ThemeToggle />
        </header>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-4">
        <Link
          href="/"
          className="flex items-center text-primary hover:underline text-sm"
        >
          <ArrowLeft className="h-3 w-3 mr-1" />
          Home
        </Link>
        <ThemeToggle />
      </header>

      <article className="mb-8">
        <div className="mb-4">
          <div className="text-xs text-primary mb-1">{article.publication}</div>
          <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
          <div className="text-xs text-muted-foreground">
            {article.pubDate ? formatDate(article.pubDate) : 'Unknown date'}
          </div>
        </div>

        <div
          className="prose dark:prose-invert max-w-none prose-sm 
                     prose-headings:font-semibold prose-a:text-primary
                     prose-img:rounded-md prose-pre:bg-muted prose-pre:text-muted-foreground prose-blockquote:border-primary
                     prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 pt-6 border-t border-border">
          <Link
            href="/#essays"
            className="flex items-center text-primary hover:underline text-sm"
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to Essays
          </Link>
        </div>
      </article>
    </div>
  )
}
