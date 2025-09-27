import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import StudentJoin from './pages/StudentJoin';
import TeacherOptions from './pages/TeacherOptions';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignup from './pages/TeacherSignup';
import TeacherDashboard from './pages/TeacherDashboard';
import ClassroomView from './pages/ClassroomView';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/student-join',
    element: <StudentJoin />,
  },
  {
    path: '/teacher-options',
    element: <TeacherOptions />,
  },
  {
    path: '/teacher-login',
    element: <TeacherLogin />,
  },
  {
    path: '/teacher-signup',
    element: <TeacherSignup />,
  },
  {
    path: '/teacher-dashboard',
    element: <TeacherDashboard />,
  },
  {
    path: '/classroom-view',
    element: <ClassroomView />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);