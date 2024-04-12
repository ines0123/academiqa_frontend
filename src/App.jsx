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
import ProfileStudent from "./Pages/Student/ProfileStudent.jsx";
import SessionStudent from "./Pages/Student/SessionStudent.jsx";
import HomeTeacher from "./Pages/Teacher/HomeTeacher.jsx";
import ProfileTeacher from "./Pages/Teacher/ProfileTeacher.jsx";
import SessionTeacher from "./Pages/Teacher/SessionTeacher.jsx";
import Calendar from "./Pages/Common/Calendar.jsx";
import Chatbot from "./Components/Chatbot/Chatbot.jsx";
import CoursesRecommender from "./Components/CoursesRecommender/CoursesRecommender.jsx";
import Course from "./Components/Course/Course.jsx";
import NotificationCard from "./Components/Notification/NotificationCard.jsx";
import EmptyNavbar from "./Components/Navbar/EmptyNavbar.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import SideBar from "./Components/SideBar/SideBar.jsx";
import RecommendCourse from "./Pages/Student/RecommendCourse.jsx";
import Courses from "./Pages/Student/Courses/Courses.jsx";
import Chat from "./Components/CommonSessionChat/Chat.jsx";
import Note from "./Components/Note/Note.jsx";

import Task from "./Components/Task/Task.jsx";
import AddNote from "./Components/PopUpNote/AddNote/AddNote.jsx";
import EditNote from "./Components/PopUpNote/EditNote/EditNote.jsx";

const Layout = () => {
  return (
    <div className="layout-container">
      <SideBar />
      <div className="layout-content">
        <Outlet />
      </div>
      <NotificationCard />
    </div>
  );
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route element={<RequireAuth allowedRole={["student"]} />}>
            <Route path="student/" element={<HomeStudent />}></Route>
            <Route path="student/courses" element={<Courses />}></Route>
            <Route path="student/notes" element={<Notes />}></Route>
            <Route path="student/profile" element={<ProfileStudent />}></Route>
            <Route
              path="student/session/:id"
              element={<SessionStudent />}
            ></Route>
          </Route>
          <Route element={<RequireAuth allowedRole={["teacher"]} />}>
            <Route path="teacher/" element={<HomeTeacher />}></Route>
            <Route path="teacher/profile" element={<ProfileTeacher />}></Route>
            <Route
              path="teacher/session/:id"
              element={<SessionTeacher />}
            ></Route>
          </Route>
          <Route element={<RequireAuth allowedRole={["student", "teacher"]} />}>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/notification" element={<NotificationCard />}></Route>
          </Route>
        </Route>
      </Routes>

      {/* <Note note={note} baseColor={baseColor} /> */}
      {/* <Notes /> */}
      {/*<Chatbot/>*/}
      {/*<CoursesRecommender/>*/}
      {/*<div className="d-flex">*/}
      {/*    {courses}*/}
      {/*</div>*/}
      {/*<Chat/>*/}
      {/*<Courses/>*/}
      {/* <Task role="teacher" /> */}

      {/* <AddNote
        isOpen={true}
        setIsOpen={() => {}}
        session={{
          subject: "Developpement web eet application reparties",
          type: "TP",
          date: "12 Novembre 2024, Thursday",
          sessionTime: "08:00 - 09:30",
        }}
      /> */}

      {/*<EditNote
        isOpen={true}
        setIsOpen={() => {}}
        note={{
          session: {
            subject: "Developpement web",
            type: "TP",
            sessionTime: "08:00 - 09:30",
          },
          date: "7 November 2023, Tuesday",
          title: "Web avec react js",
          content:
            "Lorem Ipsum is simply dummy text of the printing and ever Lorem Ipsum is simply dummy text of the printing and ever Lorem Ipsum is simply dummy text of the printing and ever Lorem Ipsum is simply dummy text of the printing and ever Lorem Ipsum is simply dummy text of the printing and ever Lorem Ipsum is simply dummy text of the printing and ever",
        }}
      /> */}
    </>
  );
}
