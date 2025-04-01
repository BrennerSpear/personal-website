import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface GitHubProjectProps {
  name: string
  description: string
  language: string
  stars: number
  url: string
  featured?: boolean
  owner?: string
  fullName?: string
}

export function GitHubProject({
  name,
  description,
  language,
  stars,
  url,
  featured = false,
  owner = 'BrennerSpear',
  fullName,
}: GitHubProjectProps) {
  // Determine if this is an org repo (not owned by BrennerSpear)
  const isOrgRepo = owner !== 'BrennerSpear'
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="pt-3 pb-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex-1">
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h3 className="text-base font-medium group-hover:text-primary transition-colors">
                {isOrgRepo ? `${owner}/` : ''}
                {name}
              </h3>
            </Link>
            <p className="text-muted-foreground text-xs line-clamp-1">
              {description}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span>{language}</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {stars}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
