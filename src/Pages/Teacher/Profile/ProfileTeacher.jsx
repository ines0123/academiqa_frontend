import './ProfileTeacher.css';
import React, {useEffect, useState} from "react";
import {useDate} from "../../../Context/DateContext.jsx";
import MiniNavbar from "../../../Components/MiniNavbar/MiniNavbar.jsx";
import {FaUser} from "react-icons/fa";
import Profile from "../../../Components/Profile/Profile.jsx";
import Course from "../../../Components/Course/Course.jsx";
import axios from "axios";
import NoAbsence from "../../../assets/images/NoAbsence.svg"
import {FaBookOpenReader} from "react-icons/fa6";
import CourseForTeacher from "../../../Components/Course/CourseForTeacher.jsx";
export default function ProfileTeacher() {
    const date = useDate();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 860);
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 860);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const colors = ['#F7E2E0', '#E8F5F7', '#F6E8D6', '#D8ECD6', '#E1E2F0', '#F3F6E0'];
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/GetCoursesByClass/GL3').then(
            (response) => {
                console.log(response.data);
                setCourses(response.data.slice(0, 6));
            }).catch((err) => {
                console.log(err);
            }
        )

    }, [])
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


    return (
        <div className="container profile-teacher-page pt-3">
            <MiniNavbar/>
            <div className={`date ms-3 ${screenWidth < 410 ? 'mt-5':''}`}>
                {date}
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-5 col-md-6 profile pe-0 d-flex flex-column align-items-sm-center align-items-md-start">
                        <div className="profile-teacher d-flex mt-4 p-3 ms-md-3 ms-sm-0 mb-4">
                            <div className="courses-icon pt-1">
                                <FaUser size={30}/>
                            </div>
                            <h1 className="ms-2 fw-bold">Profile</h1>
                        </div>
                        <Profile role={"teacher"}/>
                    </div>

                    <div className="courses-teacher col-xl-8 col-lg-7 col-md-6 ps-3 d-flex flex-column align-items-sm-center align-items-md-start">
                        <div className="my-courses d-flex mt-4 p-3 ms-3 mb-4">
                            <div className="courses-icon">
                                <FaBookOpenReader size = {35}/>
                            </div>
                            <h1 className="ms-2 fw-bold">My Courses</h1>
                        </div>
                        <div className="row">
                            {courses.map((course, index) => (
                                <div key={index}
                                     className="col-xl-4 col-lg-6 col-md-12 col-sm-6 d-flex mb-2 mt-2 px-1 flex-column justify-content-center align-items-center">
                                    <CourseForTeacher course={course} color={colors[index % colors.length]}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}