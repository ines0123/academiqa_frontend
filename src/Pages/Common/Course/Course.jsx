import React from "react";
import CourseName from "../../../Components/SessionsAnnouncements/CourseName.jsx";
import SessionsAnnouncement from "../../../Components/SessionsAnnouncements/SessionsAnnouncement.jsx";
import SessionsList from "../../../Components/SessionsList/SessionsList.jsx";
import MidNavbar from "../../../Components/MidNavbar/MidNavbar.jsx";
import "./Course.css";
import {useDate} from "../../../Context/DateContext.jsx";
import {useLocation} from "react-router-dom";

const Course = () => {
    const date = useDate();
    const location = useLocation();
    const {currentUser, user} = useContext(CurrentUser)
    const course = location.state?.course; // Accessing the course object

    // Now you can use the course object in your component
    console.log(course);

    return (
        <div className="course-page container-fluid pt-6">
            <div className="row date pl-10 mb-12">
                {date}
            </div>
            <MidNavbar/>
            <div className="row">
                <div className="col-sm-9 pl-10 course-name">
                    <CourseName course={course} role={currentUser?.role}/>

                    <div className="box-announcement">
                        <SessionsAnnouncement course={course} role={currentUser?.role}/>
                    </div>
                </div>
                <div className="col-sm-3 pr-2.5 my-3 box-sessions d-flex justify-end">
                        <SessionsList/>
                </div>
            </div>
        </div>
    );
};

export default Course;