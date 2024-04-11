import teacherPhoto from "../../assets/images/sellaouti.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MidNavbar from "../MidNavbar/MidNavbar";

import "../Navbar/Navbar.css";
import EmptyNavbar from "./EmptyNavbar";

const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
              <div className="accountName">Aymen Sellaouti</div>
              <Link to="/profile" className="nameButton">
                My Profile
              </Link>
            </div>
            <div className="calendar">Calendar</div>
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