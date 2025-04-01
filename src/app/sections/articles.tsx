'use client'

import Image from 'next/image'
import React from 'react'

// Article recommendation type
interface Article {
  title: string
  publication: string
  author: string
  date: string
  imageUrl: string
  url: string
  description: string
}

// Recommended articles
const recommendedArticles: Article[] = [
  {
    title: 'The AI Revolution: The Road to Superintelligence (part 1)',
    publication: 'Wait But Why',
    author: 'Tim Urban',
    date: 'January 2015',
    imageUrl: 'https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/01/Edge1.png',
    url: 'https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html',
    description: 'Prescient exploration of AI development and potential implications'
  },
  {
    title: 'The AI Revolution: Our Immortality or Extinction (part 2)',
    publication: 'Wait But Why',
    author: 'Tim Urban',
    date: 'January 2015',
    imageUrl: 'https://149909199.v2.pressablecdn.com/wp-content/uploads/2015/01/beam2-1024x836.jpg',
    url: 'https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-2.html',
    description: 'Part 2 of the exploration into superintelligence and its implications for humanity'
  },
  {
    title: 'Status as a Service',
    publication: 'Eugene Wei',
    author: 'Eugene Wei',
    date: 'February 2019',
    imageUrl: '/staas-photo.png',
    url: 'https://www.eugenewei.com/blog/2019/2/19/status-as-a-service',
    description: 'Brilliant analysis of social networks through the lens of status and social capital'
  }
]

export default function Articles() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
        Seminal pieces that have shaped my thinking
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedArticles.map((article, index) => (
          <a 
            key={index}
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md block"
          >
            <div className="h-40 bg-muted relative">
              <Image
                src={article.imageUrl}
                alt={`${article.title} thumbnail`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground mb-1">
                {article.publication} • {article.author} • {article.date}
              </div>
              <h3 className="font-medium text-sm mb-1">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {article.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
