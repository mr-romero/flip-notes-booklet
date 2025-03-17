
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Note } from './Booklet';
import { EditableMathField } from 'react-mathquill';
import 'mathquill/build/mathquill.css';

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
  const [showMathEditor, setShowMathEditor] = useState(false);
  const [latexInput, setLatexInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const insertLatex = () => {
    if (!latexInput.trim()) return;
    
    // Create LaTeX delimiters to mark math content
    const latexFormatted = `$${latexInput}$`;
    
    if (textareaRef.current) {
      const cursorPos = textareaRef.current.selectionStart;
      const textBefore = content.substring(0, cursorPos);
      const textAfter = content.substring(cursorPos);
      
      // Insert the LaTeX at the cursor position
      const newContent = textBefore + latexFormatted + textAfter;
      setContent(newContent);
      
      // Reset the LaTeX input
      setLatexInput('');
      setShowMathEditor(false);
      
      // Focus back on the textarea
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = 
            textareaRef.current.selectionEnd = 
            cursorPos + latexFormatted.length;
        }
      }, 10);
    }
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
          <div className="flex gap-2 mb-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowMathEditor(!showMathEditor)}
              className="border-primary/20 hover:border-primary/60"
            >
              {showMathEditor ? "Hide Math Editor" : "Insert Math Formula"}
            </Button>
          </div>
          
          {showMathEditor && (
            <div className="p-3 border rounded-md bg-background mb-3">
              <p className="text-sm mb-2 font-medium">Enter LaTeX Formula:</p>
              <div className="mb-3">
                <EditableMathField
                  latex={latexInput}
                  onChange={(mathField) => {
                    setLatexInput(mathField.latex());
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Examples: "x^2 + y^2 = z^2", "\frac{a}{b}", "\sqrt{x}", "\int_{a}^{b}"
              </p>
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  onClick={insertLatex}
                  className="bg-primary hover:bg-primary/90 transition-colors"
                >
                  Insert Formula
                </Button>
              </div>
            </div>
          )}
          
          <Textarea
            id="content"
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            className="min-h-[300px] border-primary/20 focus:border-primary/60"
          />
          <p className="text-xs text-muted-foreground">
            Use double line breaks for new paragraphs. Wrap math formulas in $ symbols.
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
