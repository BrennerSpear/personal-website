'use client'

import Image from 'next/image'
import React from 'react'

export default function Articles() {
  return (
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
              Essential framework for having better arguments in an increasingly
              polarized world
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
              Excellent analysis that cuts through the hype and explores the
              nuanced reality
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
            <h3 className="font-medium text-sm mb-1">The Great Online Game</h3>
            <p className="text-xs text-muted-foreground">
              Changed how I think about career development in the internet age
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
            <h3 className="font-medium text-sm mb-1">Meditations on Moloch</h3>
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
            <h3 className="font-medium text-sm mb-1">Aggregation Theory</h3>
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
              Prescient exploration of AI development and potential implications
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
