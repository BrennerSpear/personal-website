'use client'

import React from 'react'
import Link from 'next/link'

export default function Vibe() {
  return (
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
  )
}
