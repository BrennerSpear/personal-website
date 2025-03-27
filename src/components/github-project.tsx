import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface GitHubProjectProps {
  name: string
  description: string
  language: string
  stars: number
}

export function GitHubProject({
  name,
  description,
  language,
  stars,
}: GitHubProjectProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-2">{name}</h3>
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
