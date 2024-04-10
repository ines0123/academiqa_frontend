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
import Note from "../../../Components/Note/Note.jsx";
import notesData from "../Notes/noteData.json";
import Ressources from "../../../Components/Ressources/Ressources.jsx";

export default function SessionStudent() {
    const NoteColors = [
        "192, 222, 189", // green
        "198, 206, 235", // blue
        "230, 235, 198", // light yellow
        "179, 159, 209", // purple
        "228, 235, 188", // light green
        "237, 203, 199", // light pink
        "247, 226, 224", // pink
        "246, 232, 214", // light orange
    ];

    const date = useDate();
    const sliderRef = useRef(null);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    return (
        <div className="d-flex student-session-page">
            <div className="session-content flex-grow-1 mt-3 ps-4 pe-4">
                <div className="d-flex justify-content-between">
                    <div className="the-course d-flex ms-3 p-3 ">
                        <div className="courses-icon">
                            <FaBookOpenReader size={35}/>
                        </div>
                        <h1 className="ms-2 fw-bold" >Developpement Web</h1>
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
                <div className="ressources-tasks d-flex justify-content-center mt-3">
                    <div className="ressources">
                        <Ressources role={"student"}/>
                    </div>
                </div>
                <div className=" notes mt-3">
                    <div className="add-note ms-2 d-flex align-items-center cursor-pointer">
                        <h3 className="fw-bold mt-1 me-1">New Note</h3>
                        <img src={NewNote} alt={"NewNote"} className="new-note"/>
                    </div>
                    <div className="slider mt-1 d-flex justify-content-center">
                        {notesData && notesData.length > 2 ? (<Slider ref={sliderRef} {...settings}>
                                {notesData.map((note, index) => (
                                    <div key={index} className="note">
                                        <Note
                                            note={note}
                                            baseColor={NoteColors[index % NoteColors.length]}
                                        />
                                    </div>
                                ))}
                            </Slider>) :
                            notesData.map((note, index) => (
                                <React.Fragment key={index}>
                                    <div className={`col-lg-4 col-md-6 col-sm-12 course-${index} mt-2  p-0 d-flex flex-column justify-content-center align-items-center`}>
                                        <Note
                                            maxWidth={true}
                                            note={note}
                                            baseColor={NoteColors[index % NoteColors.length]}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        {notesData.length === 0 && (
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