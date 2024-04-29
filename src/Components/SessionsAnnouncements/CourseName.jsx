import "./CourseName.css";
import { FaBookOpenReader } from "react-icons/fa6";
import teacherPhoto from "../../assets/images/teacher-photo.svg";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { useParams } from 'react-router-dom';
import { CurrentUser } from "../../Context/CurrentUserContext.jsx";

function CourseName({ role }) {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { user } = useContext(CurrentUser);
    const [sessionType, setSessionType] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const userToken = Cookie().get('academiqa');

    useEffect(() => {
        axios.get(`http://localhost:5000/subject/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => {
                console.error(`${err} - Failed to find course`);
            });
    }, [id, userToken]);

    useEffect(() => {
        if (user && user.group && course) {
            axios.get(`http://localhost:5000/session-type/${id}/${user.group.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((res) => {
                    setSessionType(res.data);
                })
                .catch((err) => {
                    console.error(`${err} - Failed to find session type`);
                });
        }
    }, [id, user, course, userToken]);

    useEffect(() => {
        if (sessionType) {
            const teachers = sessionType.map((session) => session.teacher.username);
            setTeachers(teachers);
        }
    }, [sessionType]);

    return (
        <div className="course-name-box">
            <div>
                <FaBookOpenReader className="course-icon"/>
            </div>
            <div className="course-info font-IstokWebBold">
                <div className="course-name-title font-IstokWebBold overflow-hidden" title="Protocoles de communication Web">
                    {course?.name}
                </div>
                <div className="course-additional-info font-IstokWebBold">
                    {role === "Teacher" ?
                        course ? course.sectorLevel : "Loading..."
                        :
                        teachers ? teachers.join(', ') : "Loading..."
                    }
                </div>
            </div>
            {role === "student" &&
                <div className="course-teacher-photo">
                    <img src={teacherPhoto} alt="teacher"/>
                </div>
            }
        </div>
    );
}

export default CourseName;
