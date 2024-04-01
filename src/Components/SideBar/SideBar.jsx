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



export default function SideBar() {
  const menu = useContext(Menu);
  const [logo, setLogo] = useState(BigLogo);

  const isOpen = menu.isOpen;

  const windowContext = useContext(WindowSize);
  console.log(windowContext.windowSize);

  function handleClick() {
    if (!menu.isOpen) {
      setLogo(BigLogo);
      menu.setIsOpen(!menu.isOpen);
    }
  }

  return (
    <>
      <div
        style={{ 
          position: "fixed", top: "70px", left: "0", backgroundColor: "rgba(0,0,0,0.1)", width: "100%", height: "100vh",
          display:
            windowContext.windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>

      <div
        className=" side-bar pt-3"
        onClick={handleClick}
        style={{
          left:
            windowContext.windowSize < "768" ? (isOpen ? 0 : "-100%") : "0px",
          width: isOpen ? "270px" : "fit-content",
          position: windowContext.windowSize < "768" ? "fixed" : "sticky",
          transition: "all 0.5s ease-in-out",
        }}>

        <img src={logo} alt="Logo" className={isOpen ? 'logo-large' : 'logo-small'}/>

        <div style={{position: 'fixed', top: '150px'}}>


        <FontAwesomeIcon
          className="d-flex align-items-center gap-2 side-bar-link resize-button"
          cursor={"pointer"}
          style={{ marginLeft: isOpen ? "90%" : "28px" }}
          icon={menu.isOpen ? faAnglesLeft : faAnglesRight}
          onClick={() => {
            menu.isOpen ? setLogo(SmallLogo) : setLogo(BigLogo);
            menu.setIsOpen(!menu.isOpen);
          }}

        />

        {links.map((link, key) => {
          return (
            // link.role.includes(user.role) && (
              
              <NavLink
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
                style={{ display: "flex", flexDirection: "row", padding: !menu.isOpen ?  "10px 45px" : "10px 20px"}}
                key={key}
              >
                {link.icon? (
                <FontAwesomeIcon icon={link.icon} className= {link.className?link.className:'icon-button'}  />):(
                  <img src={BotIcon} alt={link.name} className='recommend-icon' />                  
                )}
                <p
                  style={{
                    display: isOpen ? "block" : "none",
                    margin: (link.name!=="See More Courses")? "3px 0 0 20px": "15px 0 0 10px",
                  }}
                  className="m-0"
                >
                  {link.name}
                </p>
              </NavLink>
            )
          // );
        })}
        </div>
        {/* <div style={{margin: isOpen ? '0 80px' : '0 8px', position: 'fixed', bottom: menu.isOpen ? '20px' : '50px', transition: 'all 0.5s ease-in-out'}}>
          <img src={Chatbot} alt="Chatbot" style={{width: '100px', height: '130px'}} />
          <p style={{margin: '0 0 0 20px', color: '#fff'}}
          >AI help ?</p>
        </div> */}
        <div style={{margin: '0 12px', position: 'fixed', bottom:'20px', display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s ease-in-out'}}>
          <img src={Chatbot} alt="Chatbot" style={{width: '100px', height: '130px'}} />
          <p style={{
            margin: '0 0 0 15px', 
            fontSize: '20px',
            display: isOpen ? "block" : "none",
            transition: 'all 0.5s ease-in-out',
            color: '#fff'}}
          >AI help ?</p>
        </div>
      </div>
    </>
  );
}
