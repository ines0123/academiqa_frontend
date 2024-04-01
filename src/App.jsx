import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomeStudent from './Pages/Student/HomeStudent';
import Calendar from './Pages/Common/Calendar';
import SessionStudent from './Pages/Student/SessionStudent';
import Attendance from './Pages/Teacher/Attendance';
import { Route, Routes } from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';

export default function App() {
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

        <Routes>
          <Route path="/" element={<HomeStudent />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/session/:id" element={<SessionStudent />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
        </Routes>
      </div>
    </>
  );
}