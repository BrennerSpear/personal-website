# Claude Project Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter and fix issues
- `npm run typecheck` - Run TypeScript type checking

## Style Guidelines
- **Formatting**: Use Biome (configured in biome.json) with 2-space indentation
- **Quotes**: Single quotes for strings, double quotes for JSX
- **Semicolons**: Not required (added as needed)
- **Imports**: Use `@/` path alias for src/ directory imports, sorted via Biome
- **Types**: Strict TypeScript with explicit typing, avoid using `any`
- **Naming**: Use camelCase for variables/functions, PascalCase for components/types
- **Components**: React 19 with Server/Client Components (use 'use client' directive)
- **CSS**: Tailwind CSS with shadcn/ui components
- **Error Handling**: Properly catch promise rejections, use try/catch blocks
- **State**: Use React hooks for state management

## Project Structure
- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable UI components
- `/src/lib/` - Utility functions and shared logic