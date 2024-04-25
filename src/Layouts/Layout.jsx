import SideBar from "../Components/SideBar/SideBar";
import { Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import { Menu } from "../Context/MenuContext";
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../Context/WindowContext'
import NotificationCard from "../Components/Notification/NotificationCard.jsx";
import { CurrentUser } from "../Context/CurrentUserContext.jsx";
import Cookie from 'cookie-universal';
import { jwtDecode } from "jwt-decode";
import Loading from "../Components/Loading/Loading.jsx";


export default function Layout(){

    const [loading, setLoading] = useState(true);
    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    const windowContext = useContext(WindowSize);
    const navigate = useNavigate();
    const userContext = useContext(CurrentUser);
    if(!userContext.currentUser)
    {
        navigate('/login')
    }
    const [role, setRole] = useState('');
    console.log(userContext);

    useEffect(() => {
        const cookie = Cookie();
        if (!cookie.get('academiqa')) { navigate('/login') ; userContext.setCurrentUser(null); }
        else{
        const userToken = cookie.get('academiqa');
        userContext.setCurrentUser({
            id: jwtDecode(userToken).id,
            role: jwtDecode(userToken).role,
            username: jwtDecode(userToken).username,
            email: jwtDecode(userToken).email,
        });
        setRole(jwtDecode(userToken).role);
        setTimeout(() => {
            setLoading(false);
        }, 2000);}
    }
    ,[])


    return (
      <>
      {loading && <Loading  />}      
      <div className='layout-container'>
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
          <NotificationCard />
      </div>
      </>
      )
  }