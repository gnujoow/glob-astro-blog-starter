// Blog utility functions to reduce code duplication

export interface BlogPost {
  url: string;
  file: string;
  frontmatter: {
    title: string;
    description: string;
    publishDate: string;
    author?: string;
    tags?: string[];
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
  };
  default?: any;
}

/**
 * Get all blog posts using Astro.glob
 */
export async function getAllPosts(): Promise<RawPost[]> {
  const posts = await import.meta.glob('/src/content/blog/*.mdx', { eager: true });
  return Object.entries(posts).map(([path, post]: [string, any]) => ({
    file: path,
    frontmatter: post.frontmatter,
    default: post.default
  }));
}

/**
 * Generate URL from file path
 */
export function generatePostUrl(filePath: string): string {
  const filename = filePath.split('/').pop()?.replace('.mdx', '');
  return `/blog/${filename}`;
}

/**
 * Transform raw post to blog post with URL
 */
export function transformPost(rawPost: RawPost): BlogPost {
  return {
    ...rawPost,
    url: generatePostUrl(rawPost.file),
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
  return sortPostsByDate(postsWithUrls);
}

/**
 * Get unique tags with post counts
 */
export async function getTagsWithCounts(): Promise<Array<{ tag: string; count: number }>> {
  const posts = await getAllPosts();
  
  const tagCounts = posts.reduce((acc, post) => {
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