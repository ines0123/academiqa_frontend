import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { Menu } from '../../Context/MenuContext'
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../../Context/WindowContext'
import { links } from './NavLink'
import './bars.css'
import BotIcon from '../../Assets/SideBar/BotIcon.png'
import BigLogo from '../../Assets/SideBar/Logo.png'
import SmallLogo from '../../Assets/SideBar/SmallLogo.png'
import Chatbot from '../../Assets/SideBar/Chatbot.png'



export default function SideBar({role}) {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;

  const windowContext = useContext(WindowSize);
  console.log(windowContext.windowSize);

  function handleClick() {
    if (!menu.isOpen) {
      // setLogo(BigLogo);
      menu.setIsOpen(!menu.isOpen);
    }
  }

  useEffect(() => {
    if (windowContext.windowSize < "768") {
      if (menu.isOpen) {
        menu.setIsOpen(false);
      }
    }
  }
  , [windowContext.windowSize]);

  return (
    <>
    {/* SideBar */}

      <div
        className=" side-bar pt-3"
        onClick={handleClick}
        style={{
          width: isOpen ? (windowContext.windowSize < "768" ? "245px" :"350px") : "185px",
          zIndex: (windowContext.windowSize < "768" && isOpen) ? '101' : '99',
          transition: (windowContext.windowSize < "768" ) ? "all 0.1s" : "all 0.5s",
      }}>

        {/* Logo */}
        <img src={isOpen ? BigLogo : SmallLogo} alt="Logo" className={isOpen ? 'sidebar-logo-large' : 'sidebar-logo-small'}/>

        {/* Bar Content */}
        <div style={{position: 'fixed', top: '150px'}}>

          {/*  Resize Button */}
          <FontAwesomeIcon
            className="d-flex align-items-center gap-2 side-bar-link sidebar-resize-button"
            cursor={"pointer"}
            style={{ marginLeft: isOpen ? "180px" : "28px" }}
            icon={menu.isOpen ? faAnglesLeft : faAnglesRight}
            onClick={() => {
              menu.setIsOpen(!menu.isOpen);
            }}
          />

          {/* Links */}
          {links.filter(link => link.role.includes(role)).map((link, key) => {
            return (        
                //Buttons 
                <NavLink
                  to={link.path}
                  className="d-flex align-items-center gap-2 side-bar-link"
                  style={{ padding: !menu.isOpen ?  "10px 45px" : "10px 20px"}}
                  key={key}
                >
                  {/* Recommend Courses Icon */}
                  {link.icon? (
                  <FontAwesomeIcon icon={link.icon} className= {link.className?link.className:'sidebar-icon-button'}  />):(
                    <img src={BotIcon} alt={link.name} className='sidebar-recommend-icon' />                  
                  )}
                  
                  {/*  Text */}
                  <p
                    style={{
                      display: isOpen ? "block" : "none",
                      margin: "0",
                    }}
                  >
                    {link.name}
                  </p>
                </NavLink>
              )
            // );
          })}
        </div>
        <div className='sidebar-chatbot-div'>
          <img src={Chatbot} alt="Chatbot" style={{width: '100px', height: '130px'}} />
          <p className='sidebar-chatbot-text'>AI help ?</p>
        </div>
      </div>
      {
            windowContext.windowSize < "768" && isOpen && (
                <div
                style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '100' }}
                onClick={() => menu.setIsOpen(false)}
                ></div>
            )
            }
    </>
  );
}
