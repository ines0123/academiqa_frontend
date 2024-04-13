import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import RequireAuth from "./Pages/Auth/RequireAuth.jsx";
import HomeStudent from "./Pages/Student/HomeStudent/HomeStudent.jsx";
import Notes from "./Pages/Student/Notes/Notes.jsx";
import ProfileStudent from "./Pages/Student/Profile/ProfileStudent.jsx";
import SessionStudent from "./Pages/Student/Session/SessionStudent.jsx";
import HomeTeacher from "./Pages/Teacher/HomeTeacher/HomeTeacher.jsx";
import ProfileTeacher from "./Pages/Teacher/Profile/ProfileTeacher.jsx";
import SessionTeacher from "./Pages/Teacher/Session/SessionTeacher.jsx";
import Calendar from "./Pages/Common/Calendar.jsx";
import Chatbot from "./Components/Chatbot/Chatbot.jsx";
import CoursesRecommender from "./Components/CoursesRecommender/CoursesRecommender.jsx";
import NotificationCard from "./Components/Notification/NotificationCard.jsx";
import EmptyNavbar from "./Components/Navbar/EmptyNavbar.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import SideBar from "./Components/SideBar/SideBar.jsx";
import Courses from "./Pages/Student/Courses/Courses.jsx";
import Chat from "./Components/CommonSessionChat/Chat.jsx";
import Note from "./Components/Note/Note.jsx";
import Layout from './Layouts/Layout.jsx'
import Task from "./Components/Task/Task.jsx";
import Course from "./Pages/Common/Course/Course.jsx";

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout />}>
            <Route element={<RequireAuth allowedRole={['student']} />}>
              <Route path="/" element={<HomeStudent />}></Route>
              <Route path="student/courses" element={<Courses />}></Route>
              <Route path="student/notes" element={<Notes />}></Route>
              <Route path="student/profile" element={<ProfileStudent />}></Route>
              <Route path="student/session/:id" element={<SessionStudent />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['teacher']} />}>
              <Route path="/" element={<HomeTeacher />}></Route>
              <Route path="teacher/profile" element={<ProfileTeacher />}></Route>
              <Route path="teacher/session/:id" element={<SessionTeacher />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['student', 'teacher']} />}>
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/chat" element={<SessionStudent />}></Route>
              {/*<Route path="/chat" element={<SessionTeacher />}></Route>*/}
              <Route path="/notification" element={<NotificationCard />}></Route>
              <Route path="/course" element={<Course />}></Route>
            </Route>
          </Route>
        </Routes>
    </>
  );
}