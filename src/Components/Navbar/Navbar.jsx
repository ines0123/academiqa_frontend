import teacherPhoto from "../../assets/images/Sellaouti.jpg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MidNavbar from "../MidNavbar/MidNavbar";

import "../Navbar/Navbar.css";
import EmptyNavbar from "./EmptyNavbar";
import FirstCalendar from "../Calendar/FirstCalendar";
import SmallCalendar from "../Calendar/SmallCalendar";
import { Sessions } from "../../data/sessionsData";

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const nav = useNavigate();

  let role ='';
  if (window.location.pathname.includes("student")) { role = "student"; }
  if (window.location.pathname.includes("teacher")) {  role = "teacher"; }
  if (window.location.pathname.includes("admin")) {  role = "admin"; }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <MidNavbar>
          <Link to="/calendar" className="CalendarbuttonNav">
            <svg viewBox="0 0 22 22" className="calendarNav">
              <path d="M19 3H17V1H15V3H9V1H7V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM17 12H13V8H17V12Z"></path>
            </svg>
          </Link>
        </MidNavbar>
      ) : (
        <>
          <EmptyNavbar width={'22rem'}>
            <div className="profileNav">
              <img src={teacherPhoto} alt="teacher" className="profilePhoto" />
              <div className="accountName">Mohamed Aziz mansour elloumi</div>
              <Link to="/profile" className="nameButton">
                My Profile
              </Link>
            </div>
            <div title='go to calendar' className="calendar" onClick={() => nav(`/${role}/calendar`)}>
              <SmallCalendar sessions={Sessions.filter((session) => session.LevelId === 1)
              } role={role} />
            </div>
            <div className="calendardiv">
              <Link to="/calendar" className="calendarButton">
                My Calendar
              </Link>
            </div>
          </EmptyNavbar>
        </>
      )}
    </>
  );
};

export default Navbar;
