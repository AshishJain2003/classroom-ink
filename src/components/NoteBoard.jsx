import { useState, useEffect } from 'react';
import StickyNote from './StickyNote';
import FilterBar from './FilterBar';
import { notesAPI } from '../api/notes';

const NoteBoard = ({ classroomId, isTeacher = false, onNoteDeleted }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, [classroomId]);

  useEffect(() => {
    const filtered = notesAPI.filterNotes(notes, selectedCategory);
    setFilteredNotes(filtered);
  }, [notes, selectedCategory]);

  const loadNotes = async () => {
    try {
      const classroomNotes = await notesAPI.getNotesByClassroom(classroomId);
      setNotes(classroomNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesAPI.deleteNote(classroomId, noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      onNoteDeleted && onNoteDeleted();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const categories = ['all', ...new Set(notes.map(note => note.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {notes.length === 0 ? 'No questions yet! Students can start adding their questions.' : 'No questions in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map(note => (
            <StickyNote
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              isTeacher={isTeacher}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteBoard;