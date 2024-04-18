import React from 'react'
import './App.css'
import {Route, Routes } from 'react-router-dom'
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
import Chat from './Pages/Common/Chat.jsx'
import RecommendCourse from './Pages/Student/RecommendCourse.jsx'
import Layout from './Layouts/Layout.jsx'
import CalendarAdmin from './Pages/Admin/CalendarAdmin.jsx'
import TeacherCalendar from './Pages/Teacher/TeacherCalendar.jsx'
import StudentCalendar from './Pages/Student/StudentCalendar.jsx'
import Attendance from './Pages/Teacher/Attendance.jsx'
import Navbar from './Components/NavBar/Navbar.jsx'

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route element={<Layout />}>
            <Route element={<RequireAuth allowedRole={['student']} />}>
              <Route path="student/home" element={<HomeStudent />}></Route>
              <Route path="student/courses" element={<Courses />}></Route>
              <Route path="student/notes" element={<Notes />}></Route>
              <Route path="student/profile" element={<ProfileStudent />}></Route>
              <Route path="student/recommend" element={<RecommendCourse />}></Route>
              <Route path="student/session/:id" element={<SessionStudent />}></Route>
              <Route path="student/calendar" element={<StudentCalendar />}></Route>

            </Route>
            <Route element={<RequireAuth allowedRole={['teacher']} />}>
              <Route path="teacher/home" element={<HomeTeacher />}></Route>
              <Route path="teacher/profile" element={<ProfileTeacher />}></Route>
              <Route path="teacher/session/:id" element={<SessionTeacher />}></Route>
              <Route path="teacher/session/:id/attendance" element={<Attendance />}></Route>
              <Route path="teacher/calendar/:id?" element={<TeacherCalendar />}></Route>

            </Route>
            <Route element={<RequireAuth allowedRole={['student', 'teacher']} />}>
              <Route path="/chat" element={<Chat />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['admin']} />}>
              <Route path="admin/calendar/:id?" element={<CalendarAdmin />}></Route>
            </Route>
          </Route>
        </Routes>
    </>
  );
}