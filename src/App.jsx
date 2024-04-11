import React from 'react'
import './index.css'
import { Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
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


const Layout = () => {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    {/* <SideBar /> */}
      <Outlet />
    </div>
  )
}



export default function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout />}>
            <Route element={<RequireAuth allowedRole={['student']} />}>
              <Route path="student/" element={<HomeStudent />}></Route>
              <Route path="student/courses" element={<Courses />}></Route>
              <Route path="student/notes" element={<Notes />}></Route>
              <Route path="student/profile" element={<ProfileStudent />}></Route>
              <Route path="student/session" element={<SessionStudent />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['teacher']} />}>
              <Route path="teacher/" element={<HomeTeacher />}></Route>
              <Route path="teacher/profile" element={<ProfileTeacher />}></Route>
              <Route path="teacher/session" element={<SessionTeacher />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['student', 'teacher']} />}>
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/chat" element={<Chat />}></Route>
            </Route>
          </Route>
        </Routes>
    </>
  );
}