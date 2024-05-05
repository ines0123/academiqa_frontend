import React, { useContext, useEffect, useState } from "react";
import "./SessionsAnnouncement.css";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import AnnouncementMessage from "./AnnouncementMessage";
import AnnouncementInput from "./AnnouncementInput";
import noAnnouncement from "../../assets/images/noAnnouncement.svg";
import axios from "axios";
import { baseURL } from "../../Api/Api.jsx";
import { useParams } from "react-router-dom";
import { CurrentUser } from "../../Context/CurrentUserContext.jsx";
import Cookie from "cookie-universal";

function SessionsAnnouncement({ role , course}) {
    // Define initial state for announcements
    const [announcementsForStudent, setAnnouncementsForStudent] = useState([]);
    const [announcementsForTeacher, setAnnouncementsForTeacher] = useState([]);
    const { id } = useParams();
    const { user } = useContext(CurrentUser);
    const userToken = Cookie().get('academiqa');
    // State for tracking the input value
    const [newAnnouncement, setNewAnnouncement] = useState("");

    // Fetch announcements from the server
    useEffect(() => {
        axios.get(`${baseURL}/announcement/subject/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                setAnnouncementsForStudent(res.data);
            })
            .catch((err) => {
                console.error(`${err} - Failed to find announcements by subject`);
            });
    }, [id, userToken]);

    useEffect(() => {
        if (user && user.role === "teacher" && user.id) {
            axios.get(`${baseURL}/announcement/subject/${id}/teacher/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((res) => {
                    setAnnouncementsForTeacher(res.data);
                })
                .catch((err) => {
                    console.error(`${err} - Failed to find announcements by subject and teacher`);
                });
        }
    }, [id, user && user.id, user && user.role, userToken]);

    console.log("aT", announcementsForTeacher);
    console.log('AS', announcementsForStudent);
    console.log('user', user);
    console.log('subid', id);

    // Function to handle onChange event of the input field
    const handleInputChange = (event) => {
        setNewAnnouncement(event.target.value);
    };

    // Function to add a new announcement
    const addAnnouncement = () => {
        if (newAnnouncement.trim() !== "") {
            // You can implement the logic to add a new announcement here
        }
    };

    return (
        <div className="sessionsAnnouncement-box">
            <div className="sessionsAnnouncement-title font-IstokWebBold">
                Announcements
            </div>
            <div className="sessionsAnnouncement-content pt-0 position-relative">
                <Scrollbar
                    trackColor={"#DBDBDBFF"}
                    thumbColor={"#B5B5B5FF"}
                    maxHeight={"300px"}
                >
                    {announcementsForStudent.length === 0 && (
                        <div className="no-announcement e-auto-fit-content position-absolute top-50 start-50 translate-middle">
                            <img src={noAnnouncement} alt="No Sessions" />
                        </div>
                    )}
                    {role === "Student" &&
                        announcementsForStudent.map((announcement, index) => (
                            <AnnouncementMessage key={index} Announcement={announcement} />
                        ))}
                </Scrollbar>
            </div>
            {/*{(role === "teacher") &&*/}
            {/*             <AnnouncementInput*/}
            {/*    onChange={handleInputChange}*/}
            {/*    onAdd={addAnnouncement}*/}
            {/*/>}*/}
        </div>
    );
}

export default SessionsAnnouncement;
