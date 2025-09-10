# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development**
- `pnpm dev` - Start development server (typically runs on localhost:4321, may auto-increment port if occupied)
- `pnpm build` - Build production site to `./dist/`  
- `pnpm preview` - Preview production build locally
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check code formatting without writing changes

**Dependencies**
- `pnpm install` - Install dependencies
- `pnpm dlx shadcn@latest add <component>` - Add shadcn/ui components (e.g., `avatar badge dialog`)

## Architecture Overview

This is an Astro blog template called "Glob" that combines static site generation with selective React hydration using Astro's island architecture.

**Core Technologies:**
- **Astro** - Main framework with React integration for interactive components
- **MDX** - Blog posts written in Markdown with embedded React components
- **shadcn/ui** - Component system built on Radix UI and Tailwind CSS v4
- **TypeScript** - Strict type checking throughout
- **Material 3 Typography** - Typography system with major second scale

**Key Architectural Patterns:**

**Centralized Blog Management:**
- All blog logic centralized in `src/lib/blog/utils.ts` to reduce code duplication
- Key functions: `getAllPosts()`, `getSortedPosts()`, `getTagsWithCounts()`, `getPostsByTag()`
- BlogPost interface includes Content component for MDX rendering
- Uses `import.meta.glob()` to load MDX files with frontmatter and default exports

**Content System:**
- Blog posts are `.mdx` files in `src/content/blog/` 
- Each post requires frontmatter with `title`, `description`, `publishDate`, `author`, `tags`, and `layout: "../../layouts/BlogLayout.astro"`
- Dynamic routing: `src/pages/blog/[...slug].astro` uses `getSortedPosts()` for static path generation
- URLs constructed from filenames using `generatePostUrl()` utility

**Component Hydration Strategy:**
- Most UI is static Astro components (layouts, pages, PageHeader, EmptyState)
- React components use `client:load` directive for hydration (BlogCard, ThemeToggle, TagCard)
- Interactive components: theme toggle in header, clickable blog cards, tag navigation
- Reusable UI components: Tag, TagCard for consistent tag styling

**Routing & Navigation:**
- `/` - Homepage with Glob branding and feature cards
- `/blog` - Blog post listing using BlogCard components
- `/blog/[slug]` - Individual blog posts with "목록으로 가기" back button
- `/tags` - Tag overview using TagCard components with post counts
- `/tags/[tag]` - Posts filtered by specific tag with breadcrumb navigation
- `/about` - MDX-based about page

**Styling System:**
- Tailwind CSS v4 with OKLCH color format for theme variables
- Material 3 typography classes: `.text-display-*`, `.text-headline-*`, `.text-title-*`, `.text-body-*`, `.text-label-*`
- Theme customization via TweakCN (tweakcn.com) → copy CSS to `src/styles/global.css`
- Dark/light mode with ThemeToggle component and persistent localStorage

**Important Implementation Details:**
- Blog utilities prevent code duplication across pages (blog listing, tag pages, individual posts)
- Tag system is fully automated - tags from frontmatter automatically generate tag pages and counts
- BlogCard components are fully clickable with event.stopPropagation() on tag links
- ThemeToggle uses React useState and localStorage for theme persistence
- Material 3 typography uses direct CSS properties (not @apply) due to Tailwind CSS v4 compatibility
- Prettier configured with Astro plugin for consistent code formatting

**Content Creation Workflow:**
1. Create `.mdx` file in `src/content/blog/` with required frontmatter
2. Use React components from shadcn/ui directly in MDX content
3. Tags automatically appear in tag system via utility functions
4. "목록으로 가기" button automatically added to all blog posts