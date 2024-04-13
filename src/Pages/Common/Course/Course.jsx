import React from "react";
import CourseName from "../../../Components/SessionsAnnouncements/CourseName.jsx";
import SessionsAnnouncement from "../../../Components/SessionsAnnouncements/SessionsAnnouncement.jsx";
import SessionsList from "../../../Components/SessionsList/SessionsList.jsx";
import MidNavbar from "../../../Components/MidNavbar/MidNavbar.jsx";
import "./Course.css";
import {useDate} from "../../../Context/DateContext.jsx";

const Course = () => {
    const date = useDate();

    return (
        <div className="course-page container-fluid pt-12">
            <div className="row date pl-10 mb-8">
                {date}
            </div>
            <MidNavbar/>
            <div className="row">
                <div className="col-sm-9 course-name">
                    <CourseName role="student"/>

                    <div className="box-announcement">
                        <SessionsAnnouncement role="student"/>
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