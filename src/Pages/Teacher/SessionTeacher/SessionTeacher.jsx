import React from "react";
import "./SessionTeacher.css";
import CourseName from "../../../components/SessionsAnnouncements/CourseName.jsx";
import SessionsAnnouncement from "../../../components/SessionsAnnouncements/SessionsAnnouncement.jsx";
import SessionsList from "../../../components/SessionsList/SessionsList.jsx";

export default function SessionTeacher() {
    return (
        <div >
            <CourseName role="teacher" />
            <SessionsAnnouncement role="teacher" />
            <SessionsList />
        </div>
    )
}