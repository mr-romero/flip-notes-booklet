
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Booklet, { Note } from '@/components/Booklet';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Load notes from localStorage if available
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const navigate = useNavigate();

  const handleAddNote = () => {
    navigate('/editor');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 flex justify-between items-center border-b border-border/40">
        <h1 className="text-2xl font-semibold tracking-tight">Class Notes Booklet</h1>
        <Button 
          onClick={handleAddNote}
          className="group bg-primary hover:bg-primary/90 transition-all duration-300"
        >
          <PlusCircle className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-300" />
          Add Note
        </Button>
      </header>
      
      <main className="container py-8 px-4 animate-fade-in">
        {notes.length > 0 ? (
          <Booklet notes={notes} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center max-w-md space-y-4 animate-slide-up">
              <h2 className="text-2xl font-semibold text-primary">Your booklet is empty</h2>
              <p className="text-muted-foreground">
                Start by adding your first note for students. 
                Your notes will appear as pages in a beautiful interactive booklet.
              </p>
              <Button 
                onClick={handleAddNote}
                className="mt-4 group"
              >
                <PlusCircle className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-300" />
                Create Your First Note
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
