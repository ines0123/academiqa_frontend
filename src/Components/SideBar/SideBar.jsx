import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { Menu } from '../../Context/MenuContext'
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../../Context/WindowContext'
import { links } from './NavLink'
import './bars.css'
import BotIcon from '../../assets/SideBar/BotIcon.png'
import BigLogo from '../../assets/SideBar/academIQa.png'
import SmallLogo from '../../assets/SideBar/SmallLogo.png'
import Chatbot from '../../assets/SideBar/Chatbot.png'
import CoursesRecommender from "../CoursesRecommender/CoursesRecommender.jsx";
import ChatbotDiscussion from "../Chatbot/Chatbot.jsx"



export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const [recommend, setRecommend] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const SeeMoreCourses =() =>{
    setRecommend(true);
  }
  const SeeChatbot =() =>{
    setChatbot(true);
  }

  const windowContext = useContext(WindowSize);
  // console.log(windowContext.windowSize);

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
        // onClick={handleClick}
        style={{
          width: isOpen ? (windowContext.windowSize < "768" ? "245px" :"350px") : "185px",
          zIndex: (windowContext.windowSize < "768" && isOpen) ? '99' : '0',
          transition: (windowContext.windowSize < "768" ) ? "all 0.1s" : "all 0.5s",
      }}>

        {/* Logo */}
        <img src={isOpen ? BigLogo : SmallLogo} alt="Logo" className={isOpen ? 'sidebar-logo-large' : 'sidebar-logo-small'} style={{position: 'fixed'}}/>

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
              {links.filter(link => link.role.includes('student')).map((link, key) => {
                  return (
                      //Buttons
                      <NavLink
                          to={link.path}
                          className="d-flex align-items-center gap-2 side-bar-link"
                          style={{padding:"10px 43px", height:'45px'}}
                          key={key}
                      >
                          {/* Recommend Courses Icon */}
                          <FontAwesomeIcon icon={link.icon}
                                           className={` link-icons ${link.className ? link.className : 'icon-button'}`}/>

                          {/*  Text */}
                          <p
                              style={{
                                  display: isOpen ? "block" : "none",
                                  margin: "4px 0 0 0",
                              }}
                          >
                              {link.name}
                          </p>
                      </NavLink>
                  )
                  // );
              })}
              <div onClick={SeeMoreCourses}
                   className="see-courses d-flex gap-1 justify-content-center align-items-center cursor-pointer"
                   style={{padding: !menu.isOpen ? "10px 0" : "10px 0 0 25px"}}
              >
                  <img src={BotIcon} alt={"See More Courses"} className='sidebar-recommend-icon' />
                  <p
                      className="recommend-text"
                      style={{
                          display: isOpen ? "block" : "none",
                          margin: "0",
                      }}
                  >
                      See More Courses
                  </p>
              </div>
              <CoursesRecommender isOpen={recommend} setIsOpen={setRecommend}/>
          </div>
          <div onClick={SeeChatbot} className='sidebar-chatbot-div cursor-pointer'>
              <img src={Chatbot} alt="Chatbot" style={{width: '100px', height: '115px'}}/>
              <p className='sidebar-chatbot-text mt-3 ms-2'>AI help?</p>
          </div>
          <ChatbotDiscussion isOpen={chatbot} setIsOpen={setChatbot} />
      </div>
      {
            windowContext.windowSize < "768" && isOpen && (
                <div
                style={{zIndex:'1', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => menu.setIsOpen(false)}
                ></div>
            )
            }
    </>
  );
}
