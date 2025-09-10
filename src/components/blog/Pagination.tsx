import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  basePath = "/blog" 
}: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const getPaginationUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/${page}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t">
      <div className="flex items-center gap-2">
        {prevPage ? (
          <Button variant="outline" size="sm" asChild>
            <a href={getPaginationUrl(prevPage)} className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Previous
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft size={16} />
            Previous
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {nextPage ? (
          <Button variant="outline" size="sm" asChild>
            <a href={getPaginationUrl(nextPage)} className="flex items-center gap-2">
              Next
              <ChevronRight size={16} />
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}