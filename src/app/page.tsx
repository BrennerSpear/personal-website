'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  siFarcaster,
  siGithub,
  siInstagram,
  siSubstack,
  siX,
} from 'simple-icons'

// Import section components
import About from '@/app/sections/about'
import Essays from '@/app/sections/essays'
import Code from '@/app/sections/code'
import Vibe from '@/app/sections/vibe'
import Skiing from '@/app/sections/skiing'
import Articles from '@/app/sections/articles'
import Books from '@/app/sections/books'

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    'about' | 'essays' | 'code' | 'vibe' | 'skiing' | 'articles' | 'books'
  >('about')

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
        'books',
      ]

      if (hash && validSections.includes(hash)) {
        setActiveSection(
          hash as
            | 'about'
            | 'essays'
            | 'code'
            | 'vibe'
            | 'skiing'
            | 'articles'
            | 'books',
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
            <button
              onClick={() => {
                window.location.hash = 'books'
                setActiveSection('books')
              }}
              className={cn(
                'text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded',
                activeSection === 'books' && 'text-primary font-medium',
              )}
            >
              Books
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

        {activeSection === 'about' && <About />}
        {activeSection === 'essays' && <Essays />}
        {activeSection === 'code' && <Code />}
        {activeSection === 'vibe' && <Vibe />}
        {activeSection === 'skiing' && <Skiing />}
        {activeSection === 'articles' && <Articles />}
        {activeSection === 'books' && <Books />}
      </div>
    </div>
  )
}
