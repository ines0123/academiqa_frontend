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
import Task from "../../../Components/Task/Task.jsx";
import AddButton from "../../../Components/Common/AddButton/AddButton.jsx";
import AddNote from "../../../Components/PopUpNote/AddNote/AddNote.jsx";
import AddButtonTask from "../../../Components/Common/AddButton/AddButtonTask.jsx";

export default function SessionStudent() {
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
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
        ]
    };
    const [newNote, setNewNote] = useState(false);

    const handleAddNote = () => {
        setNewNote(true);
    }
    return (
        <div className="d-flex student-session-page">
            <div className="session-content flex-grow-1 mt-4 ps-4 pe-4">
                {screenWidth >= 1030 ? (<div className="d-flex justify-content-between">
                        <div className="the-course  ms-3 p-2 px-3">
                            <div className="d-flex">
                                <div className="courses-icon">
                                    <FaBookOpenReader size={30}/>
                                </div>
                                <h1 className="ms-2 fs-3 fw-bold">Session n° 1</h1>
                            </div>
                            <h1 className="ms-2 mt-1 fs-4 fw-bold">Developpement Web</h1>
                        </div>
                        <div className="ms-3 mt-2 d-flex flex-column justify-content-start">
                            <div className="date mb-2">
                                Date: {date}
                            </div>
                        </div>
                    </div>) :
                    (<div className="">
                        <div className="ms-4 d-flex flex-column justify-content-center">
                            <div className="date mb-2">
                                {date}
                            </div>
                        </div>
                        <div className="the-course  ms-3 p-2 ">
                            <div className="d-flex">
                                <div className="courses-icon">
                                    <FaBookOpenReader size={30}/>
                                </div>
                                <h1 className="ms-2 fs-3 fw-bold">Session n° 1</h1>
                            </div>
                            <h1 className="ms-2 mt-1 fs-4 fw-bold">Developpement Web</h1>
                        </div>
                    </div>)
                }
                <div className="ressources-tasks row mt-4">
                    <div
                        className="col-lg-6 pe-lg-2 ps-lg-4 p-sm-0 tasks d-flex justify-content-lg-end justify-content-sm-center">
                        <Task role={'teacher'}/>
                    </div>
                    <div
                        className="col-lg-6 ps-2 pe-lg-4 p-sm-0 mt-sm-3 mt-lg-0 ressources d-flex justify-content-center">
                    <Ressources role={"teacher"}/>
                    </div>
                </div>
                <div className=" notes" style={{marginTop: '15px'}}>
                    <div className="add-note mx-5 d-flex align-items-center justify-content-between">
                        <h3 className="fw-bold me-1">My Notes</h3>
                        <div className="div new-note d-flex cursor-pointer" onClick={handleAddNote}>
                            <h3 className="fw-bold fs-6 me-2">Add</h3>
                            <img src={NewNote} alt={"NewNote"} className="new-note "
                                 />
                            {/*<AddButtonTask/>*/}

                        </div>
                    </div>
                    <AddNote setIsOpen={setNewNote} isOpen={newNote} session={{
                        subject: "Developpement web eet application reparties",
                        type: "TP",
                        date: "12 Novembre 2024, Thursday",
                        sessionTime: "08:00 - 09:30",
                    }}/>
                    <div className="slider mt-2 d-flex justify-content-center">
                        {notesData && notesData.length > 2 ? (<Slider ref={sliderRef} {...settings}>
                                {notesData.map((note, index) => (
                                    <div key={index} className="">
                                        <Note
                                            note={note}
                                            baseColor={NoteColors[index % NoteColors.length]}
                                        />
                                    </div>
                                ))}
                            </Slider>) :
                            notesData.map((note, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        className={`col-lg-4 col-md-6 col-sm-12 course-${index} mt-2  p-0 d-flex flex-column justify-content-center align-items-center`}>
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