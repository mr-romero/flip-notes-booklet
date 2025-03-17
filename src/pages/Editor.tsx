
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/components/Booklet';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Load existing notes from localStorage
  const savedNotes = localStorage.getItem('notes');
  const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];
  
  // Find the note to edit if an ID is provided
  const noteToEdit = id ? notes.find(note => note.id === id) : undefined;
  
  const handleSaveNote = (note: Omit<Note, 'id'>) => {
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
  };
  
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
