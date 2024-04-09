import Chat from "../../../Components/CommonSessionChat/Chat.jsx";
import './Session.css';
import {FaBookOpenReader} from "react-icons/fa6";
import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDate} from "../../../Context/DateContext.jsx";

export default function SessionTeacher() {

    const date = useDate();
    return (
        <div className="d-flex teacher-session-page">
            <div className="session-content flex-grow-1 mt-4 ps-4 pe-4">
                <div className="d-flex justify-content-between">
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
                </div>
                <div className="">
                    hello
                </div>
                <div className="presence-sheet">
                </div>
            </div>
            <Chat/>

        </div>
    )
}