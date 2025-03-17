
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookletNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isFlipping: boolean;
}

const BookletNavigation: React.FC<BookletNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isFlipping,
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevPage}
        disabled={currentPage <= 0 || isFlipping}
        className={cn(
          "transition-all duration-300 border-primary/20 hover:border-primary/60",
          isFlipping ? "opacity-50" : "hover:scale-105"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="text-sm text-muted-foreground">
        Page {currentPage + 1} of {totalPages}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onNextPage}
        disabled={currentPage >= totalPages - 1 || isFlipping}
        className={cn(
          "transition-all duration-300 border-primary/20 hover:border-primary/60",
          isFlipping ? "opacity-50" : "hover:scale-105"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default BookletNavigation;
