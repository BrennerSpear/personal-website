import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'

// Enable full debugging
const DEBUG = true

// Create a type for the RSS feed items with all possible fields
type CustomFeedItem = {
  title: string
  link: string
  pubDate: string
  content: string
  'content:encoded': string
  'content:encodedSnippet': string
  contentSnippet: string
  guid: string
  isoDate: string
  creator: string
  'dc:creator': string
  categories: string[]
}

// Define a custom parser with typed items
type CustomParser = Parser<{}, CustomFeedItem>

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 },
    )
  }

  try {
    // Create a parser with all possible custom fields
    const parser: CustomParser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'content:encoded'],
          'content',
          'contentSnippet',
          ['dc:creator', 'dc:creator'],
          'creator',
          'isoDate',
          'categories',
        ],
      },
    })

    // Log for debugging
    if (DEBUG) console.log(`Fetching RSS feed from: ${url}`)

    // Use node-fetch to get the raw XML
    const response = await fetch(url)
    const rawXml = await response.text()

    // Log for debugging
    if (DEBUG) console.log(`Raw XML length: ${rawXml.length} bytes`)
    if (DEBUG) console.log(`Raw XML sample: ${rawXml.substring(0, 200)}...`)

    // Parse the feed
    const feed = await parser.parseString(rawXml)

    // Log for debugging
    if (DEBUG) {
      console.log(`Feed title: ${feed.title}`)
      console.log(`Items found: ${feed.items.length}`)

      if (feed.items.length > 0) {
        const item = feed.items[0]
        if (item) {
          console.log(`First item title: ${item.title || 'Untitled'}`)
          console.log(
            `First item has content:encoded: ${!!item['content:encoded']}`,
          )
          console.log(`First item has content: ${!!item.content}`)
          console.log(
            `First item content:encoded length: ${item['content:encoded']?.length || 0}`,
          )
          console.log(`First item content length: ${item.content?.length || 0}`)
        }
      }
    }

    return NextResponse.json({
      title: feed.title,
      description: feed.description,
      items: feed.items.map((item) => {
        // Prioritize content:encoded over content
        const fullContent = item['content:encoded'] || item.content || ''

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || item.isoDate,
          creator: item['dc:creator'] || item.creator,
          content: fullContent,
          contentSnippet: item.contentSnippet,
          guid: item.guid,
          // Include raw fields for debugging
          rawFields: DEBUG
            ? {
                hasContentEncoded: !!item['content:encoded'],
                hasContent: !!item.content,
                contentEncodedLength: item['content:encoded']?.length || 0,
                contentLength: item.content?.length || 0,
              }
            : undefined,
        }
      }),
    })
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch RSS feed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
