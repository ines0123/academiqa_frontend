import CourseName from "../../components/SessionsAnnouncements/CourseName.jsx";
import React from "react";
import SessionsAnnouncement from "../../components/SessionsAnnouncements/SessionsAnnouncement.jsx";
export default function SessionTeacher() {
    return (
        <div >
            <CourseName role="teacher" />
            <SessionsAnnouncement role="teacher" />
        </div>
    )
}