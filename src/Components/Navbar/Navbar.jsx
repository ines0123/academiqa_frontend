import avatar from "../../assets/images/avatar.png";
import {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import MidNavbar from "../MidNavbar/MidNavbar";
import { FaCircleUser } from "react-icons/fa6";
import "../Navbar/Navbar.css";
import EmptyNavbar from "./EmptyNavbar";
import FirstCalendar from "../Calendar/FirstCalendar";
import SmallCalendar from "../Calendar/SmallCalendar";
import { Sessions } from "../../data/sessionsData";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { SESSIONS_BY_GROUP, SESSIONS_BY_TEACHER, baseURL, SESSION } from "../../Api/Api";
import { CurrentUser } from "../../Context/CurrentUserContext";
import axios from "axios";



const Navbar = () => {
  const {currentUser, user} = useContext(CurrentUser);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("academiqa");
  const role = jwtDecode(token).role;
  const userContext = useContext(CurrentUser);
  const user = userContext.currentUser;
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    try{
    const pathRequest = role === "teacher" ? `${SESSIONS_BY_TEACHER}/${jwtDecode(token).id}`: `${SESSIONS_BY_GROUP}/${user.group.sector}/${user.group.level}/${user.group.group}`;  
    if (user) {
      axios.get(`${baseURL}/${SESSION}/${pathRequest}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(
        (response) => {
          console.log(response.data);
          response.data.forEach((session) => {
            session.Subject = session.name;
            if (!session.StartTime) {
              session.StartTime = session.date;
            }
            if (!session.EndTime) {
              session.EndTime = session.endTime;
            }
          });
          setSessionsData(response.data);
        }).catch((err) => {
          console.log(err);
        });
    }}
    catch(err){
      console.log(userContext);}
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 760);
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
              <img src={user?.photo || avatar } alt="teacher" className="profilephoto"/>
              <div className="accountName">{user?.username}</div>
              <Link to={`/${currentUser?.role}/profile`} className="nameButton">
                My Profile
              </Link>
            </div>
            <div title='go to calendar' className="calendar" onClick={() => nav(`/${role}/calendar`)}>
              <SmallCalendar sessions={sessionsData} role={role} />
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
