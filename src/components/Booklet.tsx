
import React, { useState, useEffect, useRef } from 'react';
import Page from './Page';
import BookletNavigation from './BookletNavigation';
import { useToast } from '@/components/ui/use-toast';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const DEMO_NOTES: Note[] = [
  {
    id: '1',
    title: 'Introduction to Physics',
    content: 'Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines, with its main goal being to understand how the universe behaves.\n\nPhysics is one of the oldest academic disciplines and, through its inclusion of astronomy, perhaps the oldest. Over much of the past two millennia, physics, chemistry, biology, and certain branches of mathematics were a part of natural philosophy, but during the Scientific Revolution in the 17th century, these natural sciences emerged as unique research endeavors in their own right.',
    date: '2023-01-15',
  },
  {
    id: '2',
    title: 'Quantum Mechanics Fundamentals',
    content: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.\n\nClassical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary (macroscopic) scale, but is not sufficient for describing them at small (atomic and subatomic) scales. Most theories in classical physics can be derived from quantum mechanics as an approximation valid at large (macroscopic) scale.',
    date: '2023-02-10',
  },
  {
    id: '3',
    title: 'Newton\'s Laws of Motion',
    content: 'Newton\'s laws of motion are three basic laws of classical mechanics that describe the relationship between the motion of an object and the forces acting on it. These laws can be paraphrased as follows:\n\n1. A body remains at rest, or in motion at a constant speed in a straight line, unless acted upon by a force.\n\n2. When a body is acted upon by a force, the time rate of change of its momentum equals the force.\n\n3. If two bodies exert forces on each other, these forces have the same magnitude but opposite directions.',
    date: '2023-03-05',
  },
  {
    id: '4',
    title: 'Einstein\'s Theory of Relativity',
    content: 'The theory of relativity usually encompasses two interrelated theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively. Special relativity applies to all physical phenomena in the absence of gravity. General relativity explains the law of gravitation and its relation to other forces of nature.\n\nIt introduced concepts including spacetime as a unified entity of space and time, relativity of simultaneity, kinematic and gravitational time dilation, and length contraction.',
    date: '2023-04-20',
  },
];

interface BookletProps {
  initialPage?: number;
  notes?: Note[];
}

const Booklet: React.FC<BookletProps> = ({ 
  initialPage = 0, 
  notes = DEMO_NOTES 
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'right' | 'left' | null>(null);
  const bookletRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Maximum number of pages (each note takes 2 pages in our booklet)
  const maxPages = notes.length * 2;

  const goToNextPage = () => {
    if (currentPage < maxPages - 1 && !isFlipping) {
      setFlipDirection('right');
      setIsFlipping(true);
      
      // Wait for animation to complete
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    } else if (currentPage >= maxPages - 1) {
      toast({
        title: "End of booklet",
        description: "You've reached the last page of notes",
        duration: 2000,
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('left');
      setIsFlipping(true);
      
      // Wait for animation to complete
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    } else if (currentPage <= 0) {
      toast({
        title: "Start of booklet",
        description: "You're already on the first page",
        duration: 2000,
      });
    }
  };

  // Calculate which note to show based on the current page
  const getNoteIndex = () => Math.floor(currentPage / 2);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-8">
      <div 
        ref={bookletRef}
        className="relative perspective bg-book-cover rounded-sm overflow-hidden shadow-book w-full max-w-3xl aspect-[3/2]"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[30px] bg-book-spine shadow-page-right z-10"></div>
        
        {/* Cover page */}
        {currentPage === 0 && (
          <div className="absolute inset-0 bg-paper p-8 flex flex-col justify-center items-center">
            <div className="w-24 h-24 rounded-full bg-primary mb-6 flex items-center justify-center">
              <span className="text-primary-foreground text-4xl font-semibold">N</span>
            </div>
            <h1 className="text-4xl font-semibold mb-2 text-primary tracking-tight">Class Notes</h1>
            <p className="text-muted-foreground">A collection of lessons for students</p>
          </div>
        )}

        {/* Pages */}
        {notes.map((note, index) => {
          const notePageIndex = index * 2 + 1; // +1 because page 0 is the cover
          const isCurrentNote = getNoteIndex() === index;
          const isVisiblePage = 
            currentPage === notePageIndex || 
            currentPage === notePageIndex + 1;
          
          if (!isVisiblePage) return null;
          
          return (
            <Page
              key={note.id}
              note={note}
              isFlipping={isFlipping}
              flipDirection={flipDirection}
              isLeftPage={currentPage % 2 === 1}
              isRightPage={currentPage % 2 === 0 && currentPage > 0}
              pageNumber={notePageIndex}
            />
          );
        })}
        
        <div className="book-shadow"></div>
      </div>
      
      <BookletNavigation
        currentPage={currentPage}
        totalPages={maxPages}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        isFlipping={isFlipping}
      />
    </div>
  );
};

export default Booklet;
