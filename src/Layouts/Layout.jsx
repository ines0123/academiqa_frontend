import SideBar from "../Components/SideBar/SideBar";
import { Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import { Menu } from "../Context/MenuContext";
import React, { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../Context/WindowContext'
import NotificationCard from "../Components/Notification/NotificationCard.jsx";
import { CurrentUser } from "../Context/CurrentUserContext.jsx";
import MidNavbar from "../Components/MidNavbar/MidNavbar.jsx";
import Cookie from 'cookie-universal';
import { jwtDecode } from "jwt-decode";
import Loading from "../Components/Loading/Loading.jsx";
import Preloader from "../Components/Preloader/Preloader.jsx";
import axios from "axios";
import { baseURL } from "../Api/Api";



export default function Layout(){

    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    const windowContext = useContext(WindowSize);
    const { currentUser, loading, setLoading } = useContext(CurrentUser);
    const [role, setRole] = useState('');
    useEffect(() => {
        const cookie = Cookie();
        if (!cookie.get('academiqa')) { 
         ; userContext.setCurrentUser(null); }
        else{
        const userToken = cookie.get('academiqa');
        setRole(jwtDecode(userToken).role);
        const userPath = jwtDecode(userToken).role === 'admin' ? 'admin' : (jwtDecode(userToken).role === 'teacher' ? 'teacher' : 'student');

        // if (jwtDecode(userToken).role.toLowerCase() === 'student') {
        axios.get(`${baseURL}/${userPath}/${jwtDecode(userToken).id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then(
            (response) => {
                userContext.setCurrentUser(response.data);
                console.log('current user:', userContext.currentUser);
            }).catch((err) => {
                console.log(err);
            });
        // }
        

        setTimeout(() => {
            setLoading(false);
        }, 2000);}
    }
    ,[])


    return (
      <>
          <div className='layout-container'>
              {loading && <Preloader onPreloaderEnd={()=>setLoading(false)} />}
              <SideBar role={role} />
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
      </>
      )
  }