
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Note } from './Booklet';

interface NoteEditorProps {
  onSaveNote: (note: Omit<Note, 'id'>) => void;
  initialNote?: Note;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  onSaveNote, 
  initialNote 
}) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your note",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content for your note",
        variant: "destructive",
      });
      return;
    }
    
    onSaveNote({
      title,
      content,
      date: new Date().toISOString(),
    });
    
    toast({
      title: "Note saved",
      description: "Your note has been added to the booklet",
    });
    
    navigate('/');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 bg-paper rounded-md shadow-page">
      <h1 className="text-2xl font-semibold mb-6 text-primary">
        {initialNote ? 'Edit Note' : 'Create New Note'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="border-primary/20 focus:border-primary/60"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            className="min-h-[300px] border-primary/20 focus:border-primary/60"
          />
          <p className="text-xs text-muted-foreground">
            Use double line breaks for new paragraphs
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
            className="border-primary/20 hover:border-primary/60"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            Save Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
