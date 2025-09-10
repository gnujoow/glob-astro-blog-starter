import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TagCardProps {
  tag: string;
  count: number;
}

export function TagCard({ tag, count }: TagCardProps) {
  return (
    <a href={`/tags/${tag}`} className="block group">
      <Card className="h-full transition-colors hover:bg-muted/50 group-hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            #{tag}
          </CardTitle>
          <CardDescription>
            {count} {count === 1 ? 'post' : 'posts'}
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}