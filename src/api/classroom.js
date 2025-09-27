// Mock API for classroom management
const mockClassrooms = JSON.parse(localStorage.getItem('classrooms') || '[]');

export const classroomAPI = {
  // Generate classroom code
  generateCode: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Create classroom
  createClassroom: async (classroomData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newClassroom = {
          id: Date.now().toString(),
          code: classroomAPI.generateCode(),
          ...classroomData,
          notes: [],
          students: [],
          createdAt: new Date().toISOString()
        };
        mockClassrooms.push(newClassroom);
        localStorage.setItem('classrooms', JSON.stringify(mockClassrooms));
        resolve(newClassroom);
      }, 1000);
    });
  },

  // Join classroom (for students)
  joinClassroom: async (code, studentName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const classroom = mockClassrooms.find(c => c.code === code);
        if (classroom) {
          const student = {
            id: Date.now().toString(),
            name: studentName,
            joinedAt: new Date().toISOString()
          };
          classroom.students.push(student);
          localStorage.setItem('classrooms', JSON.stringify(mockClassrooms));
          localStorage.setItem('currentStudent', JSON.stringify({ ...student, classroomId: classroom.id }));
          resolve({ classroom, student });
        } else {
          reject(new Error('Invalid classroom code'));
        }
      }, 1000);
    });
  },

  // Get classroom by code
  getClassroomByCode: async (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const classroom = mockClassrooms.find(c => c.code === code);
        if (classroom) {
          resolve(classroom);
        } else {
          reject(new Error('Classroom not found'));
        }
      }, 500);
    });
  },

  // Get classrooms by teacher
  getTeacherClassrooms: async (teacherId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const classrooms = mockClassrooms.filter(c => c.teacherId === teacherId);
        resolve(classrooms);
      }, 500);
    });
  }
};