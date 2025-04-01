# Claude Project Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter and fix issues (auto-fixes problems)
- `npm run typecheck` - Run TypeScript type checking

## Style Guidelines
- **Formatting**: Biome (2-space indentation, 80-char line width)
- **Quotes**: Single quotes for strings, double quotes for JSX attributes
- **Semicolons**: Optional (auto-added as needed)
- **Imports**: Use `@/` path aliases (@/components, @/lib, etc.), sorted with Biome
- **Types**: Strict TypeScript with explicit types, NEVER use `any` (enforced)
- **Functions**: Arrow functions preferred, use parameter parens always
- **Components**: React 19 with Server Components (use 'use client' directive when needed)
- **CSS**: Tailwind CSS with shadcn/ui components, use cn() utility for conditionals
- **Error Handling**: try/catch blocks required for async operations
- **State**: Use React hooks (useState, useEffect) for state management

## Project Structure
- `/src/app/` - Next.js app router pages
- `/src/components/` - Reusable UI components (shadcn/ui in /components/ui)
- `/src/lib/` - Utility functions and shared logic
- `/src/hooks/` - Custom React hooks
- `/public/` - Static assets (images, etc.)