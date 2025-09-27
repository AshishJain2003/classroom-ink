import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing teacher session
    const currentTeacher = authAPI.getCurrentTeacher();
    if (currentTeacher) {
      setTeacher(currentTeacher);
    }

    // Check for existing student session
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      setStudent(JSON.parse(studentData));
    }

    setLoading(false);
  }, []);

  const loginTeacher = async (email, password) => {
    const teacher = await authAPI.login(email, password);
    setTeacher(teacher);
    return teacher;
  };

  const signupTeacher = async (teacherData) => {
    const teacher = await authAPI.signup(teacherData);
    setTeacher(teacher);
    return teacher;
  };

  const logoutTeacher = () => {
    authAPI.logout();
    setTeacher(null);
  };

  const setStudentData = (studentData) => {
    setStudent(studentData);
    localStorage.setItem('currentStudent', JSON.stringify(studentData));
  };

  const logoutStudent = () => {
    localStorage.removeItem('currentStudent');
    setStudent(null);
  };

  const value = {
    teacher,
    student,
    loading,
    loginTeacher,
    signupTeacher,
    logoutTeacher,
    setStudentData,
    logoutStudent,
    isTeacher: !!teacher,
    isStudent: !!student,
    isAuthenticated: !!teacher || !!student
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};