import React, {useEffect, useState} from "react";
import "./App.css";
import {
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
import Course from "./Pages/Common/Course/Course.jsx";
import Courses from "./Pages/Student/Courses/Courses.jsx";
import Layout from './Layouts/Layout.jsx'
import CalendarAdmin from './Pages/Admin/Calendar/CalendarAdmin.jsx'
import TeacherCalendar from './Pages/Teacher/TeacherCalendar.jsx'
import StudentCalendar from './Pages/Student/StudentCalendar.jsx'
import Attendance from './Pages/Teacher/Attendance.jsx'
import LoadingComponent from "./Components/Preloader/Preloader.jsx";
import axios from "axios";
import HomeAdmin from "./Pages/Admin/Home/HomeAdmin.jsx";
import ProfessorsAdmin from "./Pages/Admin/Professor/ProfessorsAdmin.jsx";
import StudentsAdmin from "./Pages/Admin/Student/StudentsAdmin.jsx";
import CoursesAdmin from "./Pages/Admin/Course/CoursesAdmin.jsx";
import Profile from "./Pages/Admin/Profile/profile.jsx";
export default function App() {
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/subject/SectorLevel/GL3').then(
        (response) => {
          console.log('courses',response.data);
          setCourses(response.data);
        }).catch((err) => {
          console.log(err);
        }
    )

  },[])
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout />}>
            <Route element={<RequireAuth allowedRole={['student']} />}>
              <Route path="/student/home" element={<HomeStudent courses={courses?.slice(0,3)}/>}></Route>
              <Route path="student/courses" element={<Courses courses={courses} />}></Route>
              <Route path="student/notes" element={<Notes />}></Route>
              <Route path="student/profile" element={<ProfileStudent />}></Route>
              <Route path="student/session/:id" element={<SessionStudent />}></Route>
              <Route path="student/calendar" element={<StudentCalendar />}></Route>

            </Route>
            <Route element={<RequireAuth allowedRole={['teacher']} />}>
              <Route path="/teacher/home" element={<HomeTeacher />}></Route>
              <Route path="teacher/profile" element={<ProfileTeacher />}></Route>

              <Route path="teacher/session/:id" element={<SessionTeacher />}></Route>
              <Route path="teacher/session/:id/attendance" element={<Attendance />}></Route>
              <Route path="teacher/calendar/:id?" element={<TeacherCalendar />}></Route>

            </Route>
            <Route element={<RequireAuth allowedRole={['student', 'teacher']} />}>
              <Route path="/chat" element={<SessionStudent />}></Route>
              {/*<Route path="/chat" element={<SessionTeacher />}></Route>*/}
              <Route path="/course" element={<Course />}></Route>
            </Route>
            <Route element={<RequireAuth allowedRole={['admin']} />}>
              <Route path="admin/home" element={<HomeAdmin />}></Route>
              <Route path="admin/professors" element={<ProfessorsAdmin />}></Route>
              <Route path="admin/students" element={<StudentsAdmin />}></Route>
              <Route path="admin/calendar/:id?" element={<CalendarAdmin />}></Route>
              <Route path="admin/courses" element={<CoursesAdmin />}></Route>
              <Route path="admin/profile" element = {<Profile role={"student"}/>} ></Route>
            </Route>
          </Route>
        </Routes>

      {/*<LoadingComponent />*/}
    </>
  );
}