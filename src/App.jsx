import React, {useEffect, useState} from 'react'
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
import Chat from './Components/CommonSessionChat/Chat.jsx'
import Chatbot from "./Components/Chatbot/Chatbot.jsx";
import CoursesRecommender from "./Components/CoursesRecommender/CoursesRecommender.jsx";
import Course from "./Components/Course/Course.jsx";
import NotificationCard from "./Components/Notification/NotificationCard.jsx";


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
    const colors = ['#F7E2E0', '#E8F5F7', '#F6E8D6', '#D8ECD6', '#E1E2F0', '#F3F6E0'];
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const coursesArray = [];
        for (let i = 0; i < 5; i++) {
            const colorIndex = i % colors.length;
            coursesArray.push(<Course key={i} color={colors[colorIndex]} placement={'absence'}/>);
        }
        setCourses(coursesArray);
    }, []);
  return (
    <>
        {/*<Routes>*/}
        {/*  <Route path="/login" element={<Login />}></Route>*/}
        {/*  <Route element={<Layout />}>*/}
        {/*    <Route element={<RequireAuth allowedRole={['student']} />}>*/}
        {/*      <Route path="student/" element={<HomeStudent />}></Route>*/}
        {/*      <Route path="student/courses" element={<Courses />}></Route>*/}
        {/*      <Route path="student/notes" element={<Notes />}></Route>*/}
        {/*      <Route path="student/profile" element={<ProfileStudent />}></Route>*/}
        {/*      <Route path="student/session/:id" element={<SessionStudent />}></Route>*/}
        {/*    </Route>*/}
        {/*    <Route element={<RequireAuth allowedRole={['teacher']} />}>*/}
        {/*      <Route path="teacher/" element={<HomeTeacher />}></Route>*/}
        {/*      <Route path="teacher/profile" element={<ProfileTeacher />}></Route>*/}
        {/*      <Route path="teacher/session/:id" element={<SessionTeacher />}></Route>*/}
        {/*    </Route>*/}
        {/*    <Route element={<RequireAuth allowedRole={['student', 'teacher']} />}>*/}
        {/*      <Route path="/calendar" element={<Calendar />}></Route>*/}
        {/*      <Route path="/chat" element={<Chat />}></Route>*/}
        {/*      <Route path="/notification" element={<NotificationCard />}></Route>*/}

        {/*    </Route>*/}
        {/*  </Route>*/}
        {/*</Routes>*/}


        <Chatbot/>
        {/*<CoursesRecommender/>*/}
        {/*<div className="d-flex">*/}
        {/*    {courses}*/}
        {/*</div>*/}
        {/*<Chat/>*/}
        {/*<NotificationCard/>*/}
    </>
  );
}