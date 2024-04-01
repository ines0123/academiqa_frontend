import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Auth/Login.jsx'
import RequireAuth from './Pages/Auth/RequireAuth.jsx'
import HomeStudent from './Pages/Student/HomeStudent.jsx'
import Courses from './Pages/Student/Courses.jsx'
import Notes from './Pages/Student/Notes.jsx'
import ProfileStudent from './Pages/Student/ProfileStudent.jsx'
import SessionStudent from './Pages/Student/SessionStudent.jsx'
import HomeTeacher from './Pages/Teacher/HomeTeacher.jsx'
import ProfileTeacher from './Pages/Teacher/ProfileTeacher.jsx'
import SessionTeacher from './Pages/Teacher/SessionTeacher.jsx'
import Calendar from './Pages/Common/Calendar.jsx'
import Chat from './Pages/Common/Chat.jsx'
import Attendance from './Pages/Teacher/Attendance.jsx'
import { registerLicense } from '@syncfusion/ej2-base';
import SideBar from './Components/SideBar/SideBar.jsx'
import WindowContext from './Context/WindowContext.jsx'
import MenuContext from './Context/MenuContext.jsx'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVgWn5eeXBSQ2VcUkdw');

const Layout = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <SideBar />

      <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter([
  // Public Routes
  { path: '/login', element: <Login /> },
  {

    element: <WindowContext/>,
    children: [
      {
        element : <MenuContext/>,
        children: [
          {
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
                  { path: 'teacher/attendance', element: <Attendance /> }]
              },
      
              // common routes
              {  element: <RequireAuth allowedRole={['student', 'teacher']} />, 
                children: [
                  { path: '/calendar', element: <Calendar /> },
                  { path: '/chat', element: <Chat /> },]
              }
            ]
          }
        ]
        }
    ]
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
