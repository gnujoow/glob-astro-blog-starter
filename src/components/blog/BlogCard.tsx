import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import type { BlogPost } from "@/lib/blog/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  const { url, frontmatter } = post;
  const { title, description, publishDate, author, tags = [] } = frontmatter;

  return (
    <a href={url} className="block h-full group">
      <Card className="h-full transition-colors hover:bg-muted/50 group-hover:shadow-md flex flex-col">
        <CardHeader className="flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <time dateTime={publishDate}>
              {new Date(publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </time>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors leading-tight mb-2">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 mt-0">
            {description}
          </CardDescription>
        </CardHeader>
        {tags.length > 0 && (
          <CardContent className="pt-0 mt-auto">
            <div className="flex flex-wrap gap-1 items-center">
              {tags.slice(0, 3).map((tag) => (
                <Tag
                  key={tag}
                  tag={tag}
                  onClick={(e) => e.stopPropagation()}
                />
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </a>
  );
}