// Mock API for notes management
const mockClassrooms = JSON.parse(localStorage.getItem('classrooms') || '[]');

export const notesAPI = {
  // Add note to classroom
  addNote: async (classroomId, noteData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const classroomIndex = mockClassrooms.findIndex(c => c.id === classroomId);
        if (classroomIndex !== -1) {
          const newNote = {
            id: Date.now().toString(),
            ...noteData,
            createdAt: new Date().toISOString()
          };
          mockClassrooms[classroomIndex].notes.push(newNote);
          localStorage.setItem('classrooms', JSON.stringify(mockClassrooms));
          resolve(newNote);
        }
      }, 500);
    });
  },

  // Delete note (teachers only)
  deleteNote: async (classroomId, noteId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const classroomIndex = mockClassrooms.findIndex(c => c.id === classroomId);
        if (classroomIndex !== -1) {
          mockClassrooms[classroomIndex].notes = mockClassrooms[classroomIndex].notes.filter(n => n.id !== noteId);
          localStorage.setItem('classrooms', JSON.stringify(mockClassrooms));
          resolve();
        }
      }, 300);
    });
  },

  // Get notes by classroom
  getNotesByClassroom: async (classroomId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const classroom = mockClassrooms.find(c => c.id === classroomId);
        resolve(classroom ? classroom.notes : []);
      }, 300);
    });
  },

  // Filter notes by category
  filterNotes: (notes, category) => {
    if (!category || category === 'all') return notes;
    return notes.filter(note => note.category === category);
  }
};