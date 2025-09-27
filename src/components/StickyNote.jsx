import { Trash2 } from 'lucide-react';

const StickyNote = ({ note, onDelete, isTeacher = false }) => {
  const colorClasses = {
    yellow: 'bg-note-yellow border-note-yellow-dark',
    blue: 'bg-note-blue border-note-blue-dark',
    green: 'bg-note-green border-note-green-dark',
    orange: 'bg-note-orange border-note-orange-dark',
    pink: 'bg-note-pink border-note-pink-dark',
    purple: 'bg-note-purple border-note-purple-dark'
  };

  return (
    <div className={`relative p-4 rounded-xl border-2 shadow-note transition-all duration-300 hover:shadow-hover hover:-translate-y-1 ${colorClasses[note.color]} group min-h-[200px] flex flex-col`}>
      {isTeacher && (
        <button
          onClick={() => onDelete(note.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      )}
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground text-lg">{note.studentName}</h3>
          <span className="text-xs bg-white/60 px-2 py-1 rounded-full text-foreground">
            {note.category}
          </span>
        </div>
        
        <p className="text-foreground text-sm leading-relaxed">
          {note.question}
        </p>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default StickyNote;