import SideBar from "../Components/SideBar/SideBar";
import { Outlet } from 'react-router-dom'
import '../App.css'
import { Menu } from "../Context/MenuContext";
import { useContext } from 'react'
import { WindowSize } from '../Context/WindowContext'


export default function Layout(){

    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    const windowContext = useContext(WindowSize);
  
    return (
      <div className='layout-container'>
      <SideBar />
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
        <div className='layout-content' style={{zIndex: (windowContext.windowSize < "768" && isOpen) ? '-1' : '99', position: (windowContext.windowSize < "768" && isOpen) ? 'fixed' : 'relative'
    }}>
          <Outlet />
        </div>
      </div>
    )
  }