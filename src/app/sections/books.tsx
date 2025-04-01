'use client'

import Image from 'next/image'
import React from 'react'

// Book recommendation type
interface Book {
  title: string
  author: string
  year: number
  coverUrl: string
  goodreadsUrl: string
  description: string
}

// Books I've learned from
const learningBooks: Book[] = [
  {
    title: 'Foundation',
    author: 'Isaac Asimov',
    year: 1951,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/29579.Foundation',
    description:
      'A groundbreaking sci-fi epic exploring psychohistory and the fall and rise of a galactic civilization',
  },
  {
    title: 'How to Create a Mind',
    author: 'Ray Kurzweil',
    year: 2012,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1355117137i/13589153.jpg',
    goodreadsUrl:
      'https://www.goodreads.com/book/show/13589153-how-to-create-a-mind',
    description:
      'Fascinating exploration of reverse-engineering the human brain and the future of artificial intelligence',
  },
  {
    title: 'The Righteous Mind',
    author: 'Jonathan Haidt',
    year: 2012,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1534528902i/11324722.jpg',
    goodreadsUrl:
      'https://www.goodreads.com/book/show/11324722-the-righteous-mind',
    description:
      'Illuminating insights into moral psychology and why good people are divided by politics and religion',
  },
]

// Books I've enjoyed and escaped into
const enjoymentBooks: Book[] = [
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    year: 2011,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1500930947i/9969571.jpg',
    goodreadsUrl:
      'https://www.goodreads.com/book/show/9969571-ready-player-one',
    description:
      'Thrilling virtual reality adventure filled with 80s pop culture nostalgia and a high-stakes digital treasure hunt',
  },
  {
    title: 'Red Rising',
    author: 'Pierce Brown',
    year: 2014,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1461354651i/15839976.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/15839976-red-rising',
    description:
      'Gripping sci-fi saga set in a color-coded dystopian society on Mars with intense action and political intrigue',
  },
  {
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    year: 2022,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg',
    goodreadsUrl:
      'https://www.goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow',
    description:
      'Beautiful story about friendship, love, and creativity through the lens of video game development across decades',
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
    goodreadsUrl:
      'https://www.goodreads.com/book/show/54493401-project-hail-mary',
    description:
      'Exhilarating space adventure about a lone astronaut with amnesia who must save humanity with unexpected alien help',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/44767458-dune',
    description:
      'Masterful sci-fi epic set on a desert planet featuring complex political intrigue, ecology, and mystical transformation',
  },
]

export default function Books() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
        Books that have shaped my thinking
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {learningBooks.map((book, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md flex flex-col"
          >
            <div className="relative h-56 bg-muted">
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} book cover`}
                  fill
                  className="object-contain"
                />
              </a>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <div className="mb-1">
                <h3 className="font-medium text-sm leading-tight">
                  {book.title}
                </h3>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {book.author} • {book.year}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4 border-b border-primary/20">
        Books I've enjoyed and escaped into
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {enjoymentBooks.map((book, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground border rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md flex flex-col"
          >
            <div className="relative h-56 bg-muted">
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} book cover`}
                  fill
                  className="object-contain"
                />
              </a>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <div className="mb-1">
                <h3 className="font-medium text-sm leading-tight">
                  {book.title}
                </h3>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {book.author} • {book.year}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://www.goodreads.com/user/show/71264931-brenner-spear"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline inline-flex items-center"
        >
          View my full reading list on Goodreads
          <svg
            className="h-4 w-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
