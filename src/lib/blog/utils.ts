// Blog utility functions to reduce code duplication

export interface BlogPost {
  url: string;
  file: string;
  category: string;
  frontmatter: {
    title: string;
    description: string;
    publishDate: string;
    author?: string;
    tags?: string[];
    draft?: boolean;
  };
  Content?: any;
}

export interface RawPost {
  file: string;
  frontmatter: {
    title: string;
    description: string;
    publishDate: string;
    author?: string;
    tags?: string[];
    draft?: boolean;
  };
  default?: any;
}

/**
 * Get all blog posts using Astro.glob (including nested category folders)
 */
export async function getAllPosts(): Promise<RawPost[]> {
  const posts = await import.meta.glob('/src/content/blog/**/*.mdx', { eager: true });
  return Object.entries(posts).map(([path, post]: [string, any]) => ({
    file: path,
    frontmatter: post.frontmatter,
    default: post.default
  }));
}

/**
 * Extract category from file path
 */
export function extractCategory(filePath: string): string {
  const pathParts = filePath.split('/');
  const blogIndex = pathParts.findIndex(part => part === 'blog');
  if (blogIndex !== -1 && blogIndex < pathParts.length - 2) {
    return pathParts[blogIndex + 1];
  }
  return 'misc'; // fallback category
}

/**
 * Generate URL from file path
 */
export function generatePostUrl(filePath: string): string {
  const pathParts = filePath.split('/');
  const filename = pathParts.pop()?.replace('.mdx', '');
  const category = extractCategory(filePath);
  return `/blog/${category}/${filename}`;
}

/**
 * Transform raw post to blog post with URL and category
 */
export function transformPost(rawPost: RawPost): BlogPost {
  return {
    ...rawPost,
    url: generatePostUrl(rawPost.file),
    category: extractCategory(rawPost.file),
    Content: rawPost.default
  };
}

/**
 * Sort posts by publication date (newest first)
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => 
    new Date(b.frontmatter.publishDate).getTime() - 
    new Date(a.frontmatter.publishDate).getTime()
  );
}

/**
 * Get all posts with URLs and sorted by date
 */
export async function getSortedPosts(): Promise<BlogPost[]> {
  const rawPosts = await getAllPosts();
  const postsWithUrls = rawPosts.map(transformPost);
  const filteredPosts = import.meta.env.PROD 
    ? postsWithUrls.filter(post => !post.frontmatter.draft)
    : postsWithUrls;
  return sortPostsByDate(filteredPosts);
}

/**
 * Get unique tags with post counts
 */
export async function getTagsWithCounts(): Promise<Array<{ tag: string; count: number }>> {
  const posts = await getAllPosts();
  const filteredPosts = import.meta.env.PROD 
    ? posts.filter(post => !post.frontmatter.draft)
    : posts;
  
  const tagCounts = filteredPosts.reduce((acc, post) => {
    const tags = post.frontmatter.tags || [];
    tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(targetTag: string): Promise<BlogPost[]> {
  const allPosts = await getSortedPosts();
  return allPosts.filter(post => 
    post.frontmatter.tags?.includes(targetTag)
  );
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const allTags = posts.flatMap(post => post.frontmatter.tags || []);
  return [...new Set(allTags)];
}

/**
 * Get posts filtered by category
 */
export async function getPostsByCategory(targetCategory: string): Promise<BlogPost[]> {
  const allPosts = await getSortedPosts();
  return allPosts.filter(post => post.category === targetCategory);
}

/**
 * Get all unique categories with post counts
 */
export async function getCategoriesWithCounts(): Promise<Array<{ category: string; count: number }>> {
  const posts = await getSortedPosts();
  
  const categoryCounts = posts.reduce((acc, post) => {
    const category = post.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => ({ category, count }));
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getSortedPosts();
  const allCategories = posts.map(post => post.category);
  return [...new Set(allCategories)];
}