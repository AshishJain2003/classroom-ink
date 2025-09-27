// Mock API for authentication
const mockTeachers = JSON.parse(localStorage.getItem('teachers') || '[]');

export const authAPI = {
  // Teacher signup
  signup: async (teacherData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingTeacher = mockTeachers.find(t => t.email === teacherData.email);
        if (existingTeacher) {
          reject(new Error('Teacher already exists'));
        } else {
          const newTeacher = {
            id: Date.now().toString(),
            ...teacherData,
            classrooms: []
          };
          mockTeachers.push(newTeacher);
          localStorage.setItem('teachers', JSON.stringify(mockTeachers));
          localStorage.setItem('currentTeacher', JSON.stringify(newTeacher));
          resolve(newTeacher);
        }
      }, 1000);
    });
  },

  // Teacher login
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const teacher = mockTeachers.find(t => t.email === email && t.password === password);
        if (teacher) {
          localStorage.setItem('currentTeacher', JSON.stringify(teacher));
          resolve(teacher);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Get current teacher
  getCurrentTeacher: () => {
    const teacher = localStorage.getItem('currentTeacher');
    return teacher ? JSON.parse(teacher) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentTeacher');
  }
};