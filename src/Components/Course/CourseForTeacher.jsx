import React, {useEffect, useState} from 'react';
import './Course.css';
import teacher from "../../assets/images/training.png";
import {NavLink} from "react-router-dom";
import { MdOutlineMoreVert } from "react-icons/md";
import PopUp from "../Common/PopUp/PopUp.jsx";
import Sellaouti from "../../assets/images/Sellaouti.jpg";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import { PiStudent } from "react-icons/pi";

// eslint-disable-next-line react/prop-types
const CourseForTeacher = ({course,color}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState(false);
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
    const handleStudentList = () => {
        setIsOpen(true);
        setDisplay(false)
    }
    return (
        <div className="course card-teacher d-flex justify-content-start ps-3 pe-1 pt-3" style={{background: `${color}`}}>
            <div className="d-flex">
                <div className="card-content d-flex align-items-start justify-content-start">
                    <div className="card-image" style={{marginTop: '3px'}}>
                        <img src={teacher} alt="teacher" className="img-fluid"
                             style={{
                                 width: 'auto',
                                 height: 'auto',
                                 maxHeight: '30px',
                                 maxWidth: '30px',
                                 opacity: '0.8'
                             }}/>
                    </div>
                    <div className="card-top ms-2">
                        <h4 className="card-title-teacher m-0 fw-bold">{course?.name}</h4>
                        <h6 className="m-0 mt-2 font-bold">{course?.sectorLevel}</h6>
                    </div>
                </div>
                <div className="see-more mt-1 cursor-pointer ">
                    <MdOutlineMoreVert size={30} onClick={()=>setDisplay(!display)}/>
                    {display &&(<div className="dropdown-course-content">
                        <div  className="dropdown-course-item d-flex align-items-center justify-content-center">
                            <NavLink to={`/course/${course?.id}`} >Course Details</NavLink>
                        </div>
                        <div onClick={handleStudentList} className="dropdown-course-item d-flex align-items-center justify-content-center">Students List</div>
                    </div>)}

                    <PopUp fromCourse={true} width={`${screenWidth > 900 ? '30vw' : screenWidth > 600 ? '45vw' : '60vw'} `} isOpen={isOpen} setIsOpen={setIsOpen}>
                        <div className="d-flex align-items-center mb-1 ms-1">
                            <PiStudent size={30}/>
                            <p className="fs-5 fw-bold ms-2 mt-1"> List of Students:</p>
                        </div>
                        <div className="student-list d-flex justify-content-center">
                            <Scrollbar thumbColor={"#692E5F"} trackColor={"#F0EDF2"} maxHeight={'69vh'}>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>
                                        <div
                                            className="student-item d-flex align-items-center justify-content-start ms-2 "
                                            style={{width: "90%"}}>
                                            <img
                                                className="rounded-circle"
                                                src={Sellaouti}
                                                alt={"student"}
                                                style={{width: '35px', height: '35px'}}
                                            />
                                            <p className="fs-6 px-3">Rym jbeli</p>
                                        </div>


                                    </Scrollbar>
                                </div>
                    </PopUp>

                </div>

            </div>
        </div>
    );
};

export default CourseForTeacher;