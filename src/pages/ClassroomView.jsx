import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import NoteBoard from '../components/NoteBoard';
import NoteForm from '../components/NoteForm';
import { authAPI } from '../api/auth';
import { classroomAPI } from '../api/classroom';
import { notesAPI } from '../api/notes';
import { useToast } from '@/hooks/use-toast';
import Loader from '../components/Loader';

const ClassroomView = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [classroom, setClassroom] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadClassroomData();
  }, []);

  const loadClassroomData = async () => {
    try {
      // Check for teacher
      const teacher = authAPI.getCurrentTeacher();
      if (teacher) {
        setUser(teacher);
        setUserType('teacher');
        
        const classroomId = localStorage.getItem('currentClassroomId');
        if (classroomId) {
          const classrooms = await classroomAPI.getTeacherClassrooms(teacher.id);
          const currentClassroom = classrooms.find(c => c.id === classroomId);
          if (currentClassroom) {
            setClassroom(currentClassroom);
            setLoading(false);
            return;
          }
        }
      } else {
        // Check for student
        const studentData = localStorage.getItem('currentStudent');
        if (studentData) {
          const student = JSON.parse(studentData);
          setUser(student);
          setUserType('student');
          
          const classroomData = await classroomAPI.getClassroomByCode(
            JSON.parse(localStorage.getItem('classrooms') || '[]')
              .find(c => c.id === student.classroomId)?.code || ''
          );
          if (classroomData) {
            setClassroom(classroomData);
            setLoading(false);
            return;
          }
        }
      }

      // If we get here, no valid user/classroom found
      navigate('/');
    } catch (error) {
      console.error('Error loading classroom data:', error);
      toast({
        title: "Error",
        description: "Failed to load classroom data.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      await notesAPI.addNote(classroom.id, noteData);
      setShowNoteForm(false);
      setRefreshTrigger(prev => prev + 1);
      toast({
        title: "Question Added!",
        description: "Your question has been posted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    if (userType === 'teacher') {
      authAPI.logout();
      navigate('/');
    } else {
      localStorage.removeItem('currentStudent');
      navigate('/');
    }
  };

  const handleNoteDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return <Loader message="Loading classroom..." />;
  }

  if (!user || !classroom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Classroom not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        user={user}
        userType={userType}
        onLogout={handleLogout}
        classroomInfo={classroom}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{classroom.name}</h1>
            <p className="text-muted-foreground">
              {userType === 'teacher' 
                ? `Managing questions from ${classroom.students?.length || 0} students`
                : 'Share your questions and doubts here'
              }
            </p>
          </div>

          {userType === 'student' && (
            <Button 
              onClick={() => setShowNoteForm(true)}
              className="bg-gradient-primary text-white shadow-hover"
            >
              <Plus size={16} className="mr-2" />
              Add Question
            </Button>
          )}
        </div>

        {showNoteForm && (
          <div className="mb-8">
            <NoteForm 
              onSubmit={handleAddNote}
              onCancel={() => setShowNoteForm(false)}
            />
          </div>
        )}

        <NoteBoard 
          classroomId={classroom.id}
          isTeacher={userType === 'teacher'}
          onNoteDeleted={handleNoteDeleted}
          key={refreshTrigger}
        />
      </div>
    </div>
  );
};

export default ClassroomView;