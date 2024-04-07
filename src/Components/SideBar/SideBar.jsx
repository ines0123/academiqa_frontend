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
  const [logo, setLogo] = useState(BigLogo);
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
      setLogo(BigLogo);
      menu.setIsOpen(!menu.isOpen);
    }
  }

  return (
    <>
    {/* SideBar */}
      <div
        className=" side-bar pt-3"
        onClick={handleClick}
        style={{
          left:
            windowContext.windowSize < "768" ? (isOpen ? 0 : "-100%") : "0px",
          width: isOpen ? "345px" : "157px",
          position: windowContext.windowSize < "768" ? "fixed" : "sticky",
          transition: "all 0.5s ease-in-out",
          display: windowContext.windowSize > "768" ? "block" : "none",
      }}>

        {/* Logo */}
        <img src={logo} alt="Logo" className={isOpen ? 'logo-large' : 'logo-small'} style={{position: 'fixed'}}/>

        {/* Bar Content */}
          <div style={{position: 'fixed', top: '150px'}}>

              {/*  Resize Button */}
              <FontAwesomeIcon
                  className="d-flex align-items-center gap-2 side-bar-link resize-button"
                  cursor={"pointer"}
                  style={{marginLeft: isOpen ? "180px" : "28px"}}
                  icon={menu.isOpen ? faAnglesLeft : faAnglesRight}
                  onClick={() => {
                      menu.isOpen ? setLogo(SmallLogo) : setLogo(BigLogo);
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
                          style={{padding: !menu.isOpen ? "10px 43px" : "10px 43px"}}
                          key={key}
                      >
                          {/* Recommend Courses Icon */}
                          <FontAwesomeIcon icon={link.icon}
                                           className={` link-icons ${link.className ? link.className : 'icon-button'}`}/>

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
              <div onClick={SeeMoreCourses}
                   className="see-courses d-flex gap-1 justify-content-center align-items-center cursor-pointer"
                   style={{padding: !menu.isOpen ? "10px 0" : "10px 0 0 25px"}}
              >
                  <img src={BotIcon} alt={"See More Courses"} className='recommend-icon' />
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
          <div onClick={SeeChatbot} className='chatbot-div cursor-pointer'>
              <img src={Chatbot} alt="Chatbot" style={{width: '100px', height: '115px'}}/>
              <p className='chatbot-text mt-3 ms-1'>Need AI help?</p>
          </div>
          <ChatbotDiscussion isOpen={chatbot} setIsOpen={setChatbot} />
      </div>
    </>
  );
}
