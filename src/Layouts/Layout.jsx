import SideBar from "../Components/SideBar/SideBar";
import { Outlet } from 'react-router-dom'
import '../App.css'
import { Menu } from "../Context/MenuContext";
import { useContext } from 'react'
import { WindowSize } from '../Context/WindowContext'
import NotificationCard from "../Components/Notification/NotificationCard.jsx";
import MidNavbar from "../Components/MidNavbar/MidNavbar.jsx";


export default function Layout(){

    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    const windowContext = useContext(WindowSize);
    let role="";
    if (window.location.pathname.includes("teacher")){
      role="teacher";
    }
    if (window.location.pathname.includes("student")){
      role="student";
    }
    if (window.location.pathname.includes("admin")){
      role="admin";
    }
  
    return (
      <div className='layout-container'>
      <SideBar role={role} />
        {/* {
            windowContext.windowSize < "768" && isOpen && (
                <div
                style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '100' }}
                onClick={() => menu.setIsOpen(false)}
                ></div>
            )
            } */}
        {/* Content */
        }
        <div
            className='layout-content'
            style={{
                zIndex: (windowContext.windowSize < "768" && isOpen) ? '-1' : '0',
                position: (windowContext.windowSize < "768" && isOpen) ? 'fixed' : 'relative',
                marginLeft: (windowContext.windowSize < "768" && isOpen) ? '0' : '-50px',
    }}>
          <Outlet />
        </div>
          {role === "admin" && <MidNavbar role={role}/>}
          <NotificationCard />
      </div>
    )
  }