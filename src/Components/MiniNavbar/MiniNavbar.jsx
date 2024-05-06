import "../MiniNavbar/MiniNavbar.css";
import {useNotification} from "../../Context/NotificationContext.jsx";
import Cookie from "cookie-universal";
import {useNavigate} from "react-router-dom";

const MiniNavbar = () => {
  const {toggleVisibility,notifCount} = useNotification();
  const navigate = useNavigate();
  const logout = () => {
    Cookie().remove("academiqa");
    navigate('/login');
  };
  return (
    <nav className="mininavbar">
      <div className="flex items-center">
        {/* <button className="navbar__button">
          <FaBell size={25} />
        </button> */}
        <button className="Bellbutton" onClick={toggleVisibility}>
          <svg viewBox="0 0 448 512" className="bellM">
            <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
          </svg>
          {notifCount > 0 &&(<div className="notification-dot d-flex justify-content-center">
            {notifCount}
          </div>)}
        </button>

        {/* <button className="navbar__button">
          <IoLogOutOutline size={30} />
        </button> */}
        <button className="Logoutbutton" onClick={logout}>
          <svg viewBox="0 0 512 512" className="logoutt">
            <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default MiniNavbar;
