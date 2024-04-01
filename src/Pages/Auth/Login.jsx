
import '../../Components/SideBar/bars.css'
import logo from '../../Assets/SideBar/Logo.png'
import '../../Components/Calendar/styles.css'
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function Login() {
    return (
        <div className='login-layout-container'>
            <div className="login-side-bar pt-5" >
                {/* Logo */}
                <img src={logo} alt="Logo" className='login-logo'/>
                {/* Bar Content */}
                <p className='login-logo-description'>Learning Beyond Limits</p>
                <div style={{marginTop: '80px'}}>
                    <div className='d-flex align-items-center gap-3 login-bar-content' >
                        <FontAwesomeIcon
                        className="gap-3 side-bar-link "
                        icon={faCircleCheck}
                        />
                        <p className='login-bar-text'> Organized Sessions </p>
                    </div>
                    <div className='d-flex align-items-center gap-3 login-bar-content ' >
                        <FontAwesomeIcon
                        className="gap-3 side-bar-link"
                        icon={faCircleCheck}
                        />
                        <p className='login-bar-text'> Intelligent Presence System </p>
                    </div>
                    <div className='d-flex align-items-center gap-3 login-bar-content ' >
                        <FontAwesomeIcon
                        className="gap-3 side-bar-link"
                        icon={faCircleCheck}
                        />
                        <p className='login-bar-text'> Limitless AI Assistance </p>
                    </div>
                    <div className='d-flex align-items-center gap-3 login-bar-content ' >
                        <FontAwesomeIcon
                        className="gap-3 side-bar-link"
                        icon={faCircleCheck}
                        />
                        <p className='login-bar-text'> And Much More ... </p>
                    </div>
                </div>
            </div>

            <div className='layout-content' style={{marginLeft: '-50px'}}>
                <h1>Login</h1>
            </div>
        </div>
        )
}