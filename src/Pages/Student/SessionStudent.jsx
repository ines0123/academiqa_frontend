import CourseName from "../../components/SessionsAnnouncements/CourseName.jsx";
import React from "react";
import SessionsAnnouncement from "../../components/SessionsAnnouncements/SessionsAnnouncement.jsx";

export default function SessionStudent() {
    return (
        <div>
            <CourseName role="student" />
            <SessionsAnnouncement role="teacher" />
        </div>
    );
}