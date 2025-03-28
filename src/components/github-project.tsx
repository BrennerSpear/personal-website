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
}

export function GitHubProject({
  name,
  description,
  language,
  stars,
  url,
  featured = false,
}: GitHubProjectProps) {
  return (
    <Card className={`h-full transition-shadow hover:shadow-md ${featured ? 'border-primary/20' : ''}`}>
      <CardContent className="pt-6">
        <Link 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
            {name}
            {featured && <span className="ml-2 text-xs text-primary">★</span>}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>{language}</div>
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1 fill-current" />
          {stars}
        </div>
      </CardFooter>
    </Card>
  )
}
