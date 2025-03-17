
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/components/Booklet';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      // Load existing notes from localStorage
      const savedNotes = localStorage.getItem('notes');
      const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
      
      // Find the note to edit if an ID is provided
      if (id) {
        const foundNote = notes.find(note => note.id === id);
        setNoteToEdit(foundNote);
        
        // If ID is provided but note isn't found, show error
        if (!foundNote) {
          setError(`Note with ID ${id} not found`);
          toast({
            title: "Note not found",
            description: `We couldn't find the note you're looking for.`,
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error("Error loading notes:", err);
      setError("Failed to load notes");
      toast({
        title: "Error",
        description: "There was an error loading your notes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);
  
  const handleSaveNote = (note: Omit<Note, 'id'>) => {
    try {
      // Load existing notes from localStorage
      const savedNotes = localStorage.getItem('notes');
      const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
      
      if (id) {
        // Update existing note
        const updatedNotes = notes.map(existingNote => 
          existingNote.id === id 
            ? { ...note, id } 
            : existingNote
        );
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        // Add new note
        const newNote = {
          ...note,
          id: Date.now().toString(),
        };
        localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
      }
      
      // Navigate back to the main page after saving
      navigate('/');
    } catch (err) {
      console.error("Error saving note:", err);
      toast({
        title: "Error saving note",
        description: "There was an error saving your note. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading editor...</div>
      </div>
    );
  }
  
  if (error && id) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">Note Not Found</h1>
          <p className="text-muted-foreground">We couldn't find the note you're looking for.</p>
          <Button onClick={() => navigate('/')}>
            Return to Booklet
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-6 flex items-center border-b border-border/40">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="mr-4"
          aria-label="Back to booklet"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          {noteToEdit ? 'Edit Note' : 'Create New Note'}
        </h1>
      </header>
      
      <main className="container py-8 px-4 animate-fade-in">
        <NoteEditor 
          onSaveNote={handleSaveNote} 
          initialNote={noteToEdit}
        />
      </main>
    </div>
  );
};

export default Editor;
