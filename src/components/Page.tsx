
import React from 'react';
import { Note } from './Booklet';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface PageProps {
  note: Note;
  isFlipping: boolean;
  flipDirection: 'right' | 'left' | null;
  isLeftPage: boolean;
  isRightPage: boolean;
  pageNumber: number;
}

const Page: React.FC<PageProps> = ({
  note,
  isFlipping,
  flipDirection,
  isLeftPage,
  isRightPage,
  pageNumber,
}) => {
  // Determine animation class based on page position and flip direction
  const getAnimationClass = () => {
    if (!isFlipping) return '';
    
    if (flipDirection === 'right' && isLeftPage) {
      return 'animate-page-turn-right';
    }
    
    if (flipDirection === 'left' && isRightPage) {
      return 'animate-page-turn-left';
    }
    
    return '';
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full",
        getAnimationClass(),
        isLeftPage ? "z-20" : "z-10"
      )}
    >
      {/* Front of page (visible when on left side) */}
      <div className={cn(
        "absolute inset-0 bg-paper p-8 shadow-page page-content",
        isLeftPage ? "shadow-page-fold" : ""
      )}>
        <div className="h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-primary">{note.title}</h2>
            <p className="text-sm text-muted-foreground">{formatDate(note.date)}</p>
          </div>
          
          <div className="flex-grow overflow-auto prose prose-sm max-w-none">
            {note.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="text-right text-sm text-muted-foreground">
            Page {pageNumber}
          </div>
        </div>
      </div>
      
      {/* Back of page (visible when on right side) */}
      <div className={cn(
        "absolute inset-0 bg-paper-dark p-8 shadow-page page-back",
        isRightPage ? "" : "hidden"
      )}>
        <div className="h-full flex flex-col justify-between">
          <div className="text-center italic text-muted-foreground">
            Notes continued...
          </div>
          <div className="text-right text-sm text-muted-foreground">
            Page {pageNumber + 1}
          </div>
        </div>
      </div>
      
      {/* Bookmark (only on first page of each note) */}
      {isLeftPage && pageNumber % 2 === 1 && (
        <div className="bookmark"></div>
      )}
    </div>
  );
};

export default Page;
