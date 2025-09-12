# 🌐 Glob - Modern Blog Starter

*Read this in other languages: [English](README.md), [한국어](README-ko.md)*

A thoughtfully crafted blog starter built with Astro, React, and shadcn/ui. Glob combines performance, beautiful design, and developer experience.

## ✨ Features

- **Material 3 Typography** with major second scale
- **shadcn/ui Components** with dark/light mode
- **Astro Islands** architecture with selective hydration
- **MDX Support** with embedded React components
- **Automatic tag system** with filtering
- **shadcn/ui MCP & Astro MCP** integration

## 🚀 Quick Start

```bash
git clone https://github.com/gnujoow/glob-astro-blog-template.git my-blog
cd my-blog && pnpm install && pnpm dev
```

Or with Astro CLI:
```bash
pnpm create astro@latest my-blog -- --template gnujoow/glob-astro-blog-starter
```

## 📝 Writing Posts

Add `.mdx` files to `src/content/blog/`:

```yaml
---
title: "Post Title"
description: "Description"
publishDate: "2024-01-15"
author: "Author"
tags: ["astro", "web-dev"]
layout: "../../layouts/BlogLayout.astro"
---
```

Use React components in MDX:
```mdx
import { Button } from "@/components/ui/button";

<Button>Interactive content</Button>
```

## 🎨 Customization

### Theme with TweakCN
1. Visit [tweakcn.com](https://tweakcn.com/)
2. Customize colors, fonts, spacing
3. Copy CSS to `src/styles/global.css`

### Typography Classes
```css
.text-display-l, .text-display-m, .text-display-s    /* Display */
.text-headline-l, .text-headline-m, .text-headline-s  /* Headlines */
.text-title-l, .text-title-m, .text-title-s          /* Titles */
.text-body-l, .text-body-m, .text-body-s             /* Body */
.text-label-l, .text-label-m, .text-label-s          /* Labels */
```

### Add Components
```bash
pnpm dlx shadcn@latest add avatar badge dialog dropdown-menu
```

## 🚀 Deploy

Deploy to any static hosting platform using your preferred method. See [Astro deployment guides](https://docs.astro.build/en/guides/deploy/) for platform-specific instructions.

## 🛠️ Tech Stack

- **Astro** - Static site generator with island architecture
- **React** - Interactive components
- **shadcn/ui** - Component library
- **Tailwind CSS v4** - Styling with CSS variables
- **MDX** - Markdown with React
- **TypeScript** - Type safety

---

**Made with ❤️ by [gnujoow](https://github.com/gnujoow)**
