import {useEffect, useState} from 'react';
import axios from "axios";
import { FaLink } from "react-icons/fa6";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import PopUp from "../Common/PopUp/PopUp";
import './ChangePassword.css';
import {PiPaperPlaneTiltBold} from "react-icons/pi";
import {FaStar} from "react-icons/fa";
import chatbotRecommend from "../../assets/images/chatbotRecommend.svg";
// Modal.setAppElement(document.getElementById('__next'));

// eslint-disable-next-line react/prop-types
const ChangePassword = ({isOpen, setIsOpen}) => {
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [courses, setCourses] = useState([])
    const [numRec, setNumRec] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
    };

    const [isMediumScreen, setIsMediumScreen] = useState(false); // Adjust breakpoint as needed

    useEffect(() => {
        const handleResize = () => setIsMediumScreen(window.innerWidth < 993);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isSmallScreen, setIsSmallScreen] = useState(false); // Adjust breakpoint as needed

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <PopUp width={!isMediumScreen ? "45vw": "65vw"} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className={`
                Recommend-title 
                mb-2 
                p-2 
                row 
                d-flex
                flex-column 
                justify-content-center align-items-center 
                rounded-5`
                }>
                    {!isSmallScreen && <div className="col-2 p-0"></div>}
                    <h1 className={` m-0 font-bold text-center ${isMediumScreen ? 'medium-h1 col ' : 'col-10'}`}> Change Password </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit} 
                        // className="recommend-form"
                        >
                            <div className="row mb-2 mt-2">
                                <div className="course-input mb-1 p-0 d-flex justify-content-center">
                                    <input
                                        style={{color: 'black'}}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={"Type Email ..."}
                                    />
                                </div>
                                <div
                                    className="course-input mb-1 p-0 d-flex justify-content-center">
                                    <input
                                        style={{color: 'black'}}
                                        placeholder={"Type New Password ..."}
                                        value={newPassword}
                                        type='password'
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div
                                    className=" course-input mb-1 p-0 d-flex justify-content-center ">
                                    <input
                                        type='password'
                                        style={{color: 'black'}}
                                        placeholder={"Confirm New Password ..."}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-outline-dark">
                                        Submit
                                    </button>

                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </PopUp>
    );
};

export default ChangePassword;