// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Auth/Login.jsx'
import RequireAuth from './pages/Auth/RequireAuth.jsx'
import HomeStudent from './pages/Student/HomeStudent.jsx'
import Courses from './pages/Student/Courses.jsx'
import Notes from './pages/Student/Notes.jsx'
import ProfileStudent from './pages/Student/ProfileStudent.jsx'
import SessionStudent from './pages/Student/SessionStudent.jsx'
import HomeTeacher from './pages/Teacher/HomeTeacher.jsx'
import ProfileTeacher from './pages/Teacher/ProfileTeacher.jsx'
import SessionTeacher from './pages/Teacher/SessionTeacher.jsx'
import Calendar from './pages/Common/Calendar.jsx'
import Chat from './pages/Common/Chat.jsx'

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  // Public Routes
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      // Protected Routes

      // Student Routes
      { element: <RequireAuth allowedRole={['student']} />,
        children: [
          { path: 'student/', element: <HomeStudent /> },
          { path: 'student/courses', element: <Courses /> },
          { path: 'student/notes', element: <Notes /> },
          { path: 'student/profile', element: <ProfileStudent /> },
          { path: 'student/session/:id', element: <SessionStudent /> }
        ]
      },

      // Teacher Routes
      {  element: <RequireAuth allowedRole={['teacher']} />,
        children: [
          { path: 'teacher/', element: <HomeTeacher /> },
          { path: 'teacher/profile', element: <ProfileTeacher /> },
          { path: 'teacher/session/:id', element: <SessionTeacher /> },
      ]
      },

      // common routes
      {  element: <RequireAuth allowedRole={['student, teacher']} />,
        children: [
          { path: '/calendar', element: <Calendar /> },
          { path: '/chat', element: <Chat /> },
      ]
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
