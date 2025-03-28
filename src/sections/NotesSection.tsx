import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const handleAddNote = () => {
    if (currentNote.trim() === '') return; // Don't add empty notes

    const newNote: Note = {
      id: crypto.randomUUID(), // Simple unique ID
      content: currentNote.trim(),
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]); // Add new note to the beginning
    setCurrentNote(''); // Clear the input field
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <section aria-labelledby="notes-heading" className="space-y-6">
      <h2 id="notes-heading" className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
        Notes
      </h2>

      {/* Input Area */}
      <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Jot down a quick note..."
          rows={4}
          className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-colors"
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAddNote}
            disabled={!currentNote.trim()}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-light-muted-foreground dark:text-dark-muted-foreground italic">No notes yet. Add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow flex justify-between items-start">
              <p className="text-light-foreground dark:text-dark-foreground whitespace-pre-wrap break-words flex-1 mr-4">
                {note.content}
              </p>
              <div className="flex flex-col items-end space-y-1 text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                 <span className="whitespace-nowrap">{note.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 <span className="whitespace-nowrap">{note.createdAt.toLocaleDateString()}</span>
                 <button
                   onClick={() => handleDeleteNote(note.id)}
                   className="mt-2 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition-colors"
                   aria-label={`Delete note created at ${note.createdAt.toLocaleString()}`}
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default NotesSection;
