import Chat from "../../../Components/CommonSessionChat/Chat.jsx";
import './Session.css';
import {FaBookOpenReader} from "react-icons/fa6";
import React, {useEffect, useRef, useState} from "react";
import NewNote from "../../../assets/images/NewNote.svg"
import NoNotes from "../../../assets/images/NoNotes.svg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useDate} from "../../../Context/DateContext.jsx";
import { BiBookReader } from "react-icons/bi";

export default function SessionStudent() {
    const [notes, setNotes] = useState([
        {
        title: "Note 1",
        content: "Some text here"
    },
        {
        title: "Note 2",
        content: "Some text here"
    },
        {
        title: "Note 3",
        content: "Some text here"
    }
    ]);

    const date = useDate();
    const sliderRef = useRef(null);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    return (
        <div className="d-flex student-session-page">
            <div className="session-content flex-grow-1 mt-4 ps-5 pe-4">
                <div className="d-flex justify-content-between">
                    <div className="the-course d-flex p-3 ms-4">
                        <div className="courses-icon">
                            <FaBookOpenReader size={35}/>
                        </div>
                        <h1 className="ms-4 fw-bold">Developpement Web</h1>
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
                <div className=" notes">
                    <div className="add-note d-flex align-items-center cursor-pointer">
                        <h3 className="fw-bold mt-1 me-1">New Note</h3>
                        <img src={NewNote} alt={"NewNote"} className="new-note"/>
                    </div>
                    <div className="slider d-flex">
                        {notes && notes.length > 2 ? (<Slider ref={sliderRef} {...settings}>
                                {notes.map((note, index) => (
                                    <div key={index} className="note">
                                        <div className="note-title">
                                            {note.title}
                                        </div>
                                        <div className="note-content">
                                            {note.content}
                                        </div>
                                    </div>
                                ))}
                            </Slider>) :
                            notes.map((note, index) => (
                                <div key={index} className="note">
                                    <div className="note-title">
                                        {note.title}
                                    </div>
                                    <div className="note-content">
                                        {note.content}
                                    </div>
                                </div>
                            ))}
                        {notes.length === 0 && (
                            <div className="no-notes d-flex mt-5 justify-content-center align-items-center">
                                <img src={NoNotes} alt={"NoNotes"} className="no-notes"
                                     style={{width: '100px', height: 'auto'}}/>
                            </div>

                        )}
                    </div>
                </div>
            </div>
            <Chat/>

        </div>
    )
}