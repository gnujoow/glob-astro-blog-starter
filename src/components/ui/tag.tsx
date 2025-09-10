import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: "default" | "link";
}

export function Tag({ tag, onClick, className, variant = "link" }: TagProps) {
  const baseClasses = "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-colors";
  
  if (variant === "link") {
    return (
      <a
        href={`/tags/${tag}`}
        className={cn(
          baseClasses,
          "hover:bg-primary hover:text-primary-foreground",
          className
        )}
        onClick={onClick}
      >
        #{tag}
      </a>
    );
  }

  return (
    <span
      className={cn(
        baseClasses,
        "bg-muted text-muted-foreground",
        className
      )}
    >
      #{tag}
    </span>
  );
}