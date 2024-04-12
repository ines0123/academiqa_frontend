import React from "react";
import CourseName from "../../../components/SessionsAnnouncements/CourseName.jsx";
import SessionsAnnouncement from "../../../components/SessionsAnnouncements/SessionsAnnouncement.jsx";
import SessionsList from "../../../components/SessionsList/SessionsList.jsx";

const Course = () => {
    return (
        <div className=" row">
            <div className=" col-8">
                <CourseName role="student"/>
                <SessionsAnnouncement role="student"/>
            </div>
            <div className="col-4 p-0">
                <SessionsList/>
            </div>
        </div>
    );
};

export default Course;