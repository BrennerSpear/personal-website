"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Twitter, Instagram, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"writings" | "code" | "vibe">("writings")

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">John Doe</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="space-y-4">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Profile"
            width={200}
            height={200}
            className="rounded-md"
          />

          <div>
            <h2 className="text-lg font-semibold mb-1 border-b border-primary/20">About</h2>
            <p className="text-sm">
              I write about technology, crypto, and culture. My work explores the intersection of digital economies and
              human behavior.
            </p>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActiveSection("writings")}
              className={cn(
                "text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded",
                activeSection === "writings" && "text-primary font-medium",
              )}
            >
              Writings
            </button>
            <button
              onClick={() => setActiveSection("code")}
              className={cn(
                "text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded",
                activeSection === "code" && "text-primary font-medium",
              )}
            >
              Code Projects
            </button>
            <button
              onClick={() => setActiveSection("vibe")}
              className={cn(
                "text-sm w-full text-left px-1 py-0.5 hover:bg-muted rounded",
                activeSection === "vibe" && "text-primary font-medium",
              )}
            >
              Vibe Projects
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">Elsewhere</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://twitter.com/username" className="text-muted-foreground hover:text-primary">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://farcaster.xyz/username" className="text-muted-foreground hover:text-primary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground hover:text-primary"
                >
                  <path
                    d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM11.5 22.5H8.5V9.5H11.5V22.5ZM23.5 22.5H20.5V9.5H23.5V22.5ZM20.5 14.5V17.5H11.5V14.5H20.5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Farcaster</span>
              </a>
              <a href="https://instagram.com/username" className="text-muted-foreground hover:text-primary">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://letterboxd.com/username" className="text-muted-foreground hover:text-primary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground hover:text-primary"
                >
                  <path
                    d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM10 22L16 16L10 10V22ZM16 16L22 10V22L16 16Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">Letterboxd</span>
              </a>
              <a href="https://github.com/username" className="text-muted-foreground hover:text-primary">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {activeSection === "writings" && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">Into the Metaverse</h2>
              <ul className="text-sm space-y-1">
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Jan 2025</span>
                  <Link href="/writing/the-endgame-is-within-view" className="hover:text-primary">
                    The Endgame is within View
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">May 2024</span>
                  <Link href="/writing/cryptocurrency" className="hover:text-primary">
                    [crypto]currency
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Apr 2024</span>
                  <Link href="/writing/boomer-washing-memecoins" className="hover:text-primary">
                    Boomer-washing Memecoins: Relevance Investing
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Mar 2021</span>
                  <Link href="/writing/nfts-and-lord-joseph-duveen" className="hover:text-primary">
                    NFTs and Lord Joseph Duveen
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Feb 2021</span>
                  <Link href="/writing/the-metaverse-is-coming" className="hover:text-primary">
                    The Metaverse is coming
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">Avanathropology</h2>
              <ul className="text-sm space-y-1">
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Nov 15, 2023</span>
                  <Link href="/writing/the-anti-anti-social-club" className="hover:text-primary">
                    The Anti Anti Social Club
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Oct 31, 2023</span>
                  <Link href="/writing/a-poem-about-money" className="hover:text-primary">
                    a poem about money
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Oct 24, 2023</span>
                  <Link href="/writing/the-kids-are-alright" className="hover:text-primary">
                    The Kids are Alright
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Oct 4, 2023</span>
                  <Link href="/writing/the-only-way-out-is-through" className="hover:text-primary">
                    The Only Way Out is Through
                  </Link>
                </li>
                <li className="flex">
                  <span className="text-muted-foreground w-24 shrink-0">Oct 3, 2023</span>
                  <Link href="/writing/avanthropology-an-intro" className="hover:text-primary">
                    Avanthropology, an intro
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === "code" && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">Code Projects</h2>
            <ul className="text-sm space-y-3">
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-primary hover:underline font-medium">
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
                  A decentralized application for NFT trading and marketplace analytics
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-primary hover:underline font-medium">
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
                  Data visualization tools for cryptocurrency markets and trend analysis
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-primary hover:underline font-medium">
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
                  Developer toolkit for building metaverse experiences and virtual environments
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link href="#" className="text-primary hover:underline font-medium">
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
                  <Link href="#" className="text-primary hover:underline font-medium">
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
                  Dashboard for monitoring DeFi investments and portfolio performance
                </p>
              </li>
            </ul>
          </div>
        )}

        {activeSection === "vibe" && (
          <div>
            <h2 className="text-lg font-semibold mb-2 border-b border-primary/20">Vibe Projects</h2>
            <ul className="text-sm space-y-3">
              <li className="flex flex-col">
                <Link href="#" className="text-primary hover:underline font-medium">
                  Digital Garden
                </Link>
                <p className="text-muted-foreground text-xs">
                  A collection of interconnected thoughts and ideas on technology and culture
                </p>
              </li>
              <li className="flex flex-col">
                <Link href="#" className="text-primary hover:underline font-medium">
                  Crypto Art Collection
                </Link>
                <p className="text-muted-foreground text-xs">
                  Curated NFT art pieces exploring the intersection of technology and creativity
                </p>
              </li>
              <li className="flex flex-col">
                <Link href="#" className="text-primary hover:underline font-medium">
                  Ambient Music Project
                </Link>
                <p className="text-muted-foreground text-xs">
                  Generative audio experiments created with algorithmic composition techniques
                </p>
              </li>
              <li className="flex flex-col">
                <Link href="#" className="text-primary hover:underline font-medium">
                  Photography Series: Urban Patterns
                </Link>
                <p className="text-muted-foreground text-xs">
                  Visual exploration of geometric patterns in urban environments
                </p>
              </li>
              <li className="flex flex-col">
                <Link href="#" className="text-primary hover:underline font-medium">
                  Reading List & Notes
                </Link>
                <p className="text-muted-foreground text-xs">
                  Annotated collection of books and articles that have shaped my thinking
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

