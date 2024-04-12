import Chat from "../../../Components/CommonSessionChat/Chat.jsx";
import './Session.css';
import {FaBookOpenReader} from "react-icons/fa6";
import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDate} from "../../../Context/DateContext.jsx";
import Ressources from "../../../Components/Ressources/Ressources.jsx";
import Task from "../../../Components/Task/Task.jsx";

export default function SessionTeacher() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const date = useDate();
    return (
        <div className="d-flex teacher-session-page">
            <div className="session-content flex-grow-1 mt-4 ps-4 pe-4">
                {screenWidth>=1030 ? (<div className="d-flex justify-content-between">
                        <div className="the-course d-flex ms-3 p-3 ">
                            <div className="courses-icon">
                                <FaBookOpenReader size={35}/>
                            </div>
                            <h1 className="ms-2 fw-bold">Developpement Web</h1>
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center">
                            <div className="date mb-2">
                                {date}
                            </div>
                            <div className="num-session">
                                Session n° 1
                            </div>
                        </div>
                    </div>):
                    (<div className="">
                        <div className="ms-4 d-flex flex-column justify-content-center">
                            <div className="date mb-2">
                                {date}
                            </div>
                            <div className="num-session">
                                Session n° 1
                            </div>
                        </div>
                        <div className="the-course d-flex ms-3 p-3 ">
                            <div className="courses-icon">
                                <FaBookOpenReader size={35}/>
                            </div>
                            <h1 className="ms-2 fw-bold">Developpement Web</h1>
                        </div>
                    </div>)
                }
                <div className="ressources-tasks row mt-3">
                    <div className="col-lg-6 pe-lg-2 ps-lg-4 p-sm-0 tasks d-flex justify-content-lg-end justify-content-sm-center">
                        <Task role={'teacher'}/>
                    </div>
                    <div className="col-lg-6 ps-2 pe-lg-4 p-sm-0 mt-sm-3 mt-lg-0 ressources d-flex justify-content-center">
                        <Ressources role={"teacher"}/>
                    </div>
                </div>
                <div className="presence-sheet">
                </div>
            </div>
            <Chat/>

        </div>
    )
}