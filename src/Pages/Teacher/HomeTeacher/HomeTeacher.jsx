import Navbar from "../../../Components/Navbar/Navbar.jsx";
import React, {useContext, useEffect, useState} from "react";
import './HomeTeacher.css';
import SeeMoreButton from "../../../Components/Common/SeeMoreButton/SeeMoreButton.jsx";
import axios from "axios";
import Course from "../../../Components/Course/Course.jsx";
import {Menu} from "../../../Context/MenuContext.jsx";
import {useDate} from "../../../Context/DateContext.jsx";
import {NavLink} from "react-router-dom";

export default function HomeTeacher() {
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
    const date = useDate();
    const [courses, setCourses] = useState([]);
    const colors = ['#F7E2E0', '#E8F5F7', '#F6E8D6', '#D8ECD6', '#E1E2F0', '#F3F6E0'];

    const menu = useContext(Menu);

    useEffect(()=>{
        axios.get('http://localhost:5000/GetCoursesByClass/GL3').then(
            (response) => {
                console.log(response.data);
                setCourses(response.data.slice(0, 3));
            }).catch((err) => {
                console.log(err);
            }
        )

    },[])

    return (
        <div className="d-flex justify-content-between  teacher-home-page m-0 pe-0">
            <div className="body mt-3 px-4 flex-grow-1">
                {screenWidth >=1060 ?(<div className="px-3 d-flex justify-content-between">
                        <div className={`p-0`}>
                            <div className="Welcoming d-flex flex-column p-3">
                                <h5 className="fs-5 ms-2 fw-bold">Welcome back, Rym!</h5>
                                <p className="fs-6 ms-2">Hope you're ready for another awesome day with us!</p>
                            </div>
                        </div>
                        <div className="date text-end">
                            {date}
                        </div>
                    </div>):
                    (
                        <div className={`px-3`} style={{marginTop: screenWidth <=520 ? '60px':''}}>
                            <div className="date text-start mb-1 ps-2">
                                {date}
                            </div>
                            <div className={`p-0 ${screenWidth<= 760 && screenWidth >520 ? 'mt-5':''}`}>
                                <div className="Welcoming d-flex flex-column p-3">
                                    <h5 className="fs-5 ms-2 fw-bold">Welcome back, Rym!</h5>
                                    <p className="fs-6 ms-2">Hope you're ready for another awesome day with us!</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="content">
                    <div className="some-courses mt-4">
                        <div className="header d-flex justify-content-between">
                            <h5 className="fs-5 fw-bold">My Courses</h5>
                            <SeeMoreButton path={"courses"}/>
                        </div>
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                {courses.map((course, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`col-lg-4 col-md-6 col-sm-12 course-${index} mt-2 mb-4 p-0 d-flex flex-column justify-content-center align-items-center`}>
                                            <Course maxWidth={true} course={course} color={colors[index % colors.length]} placement="course"/>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                    </div>
                    <hr className="mt-2 mb-4"/>
                    <div className="some-tasks mb-3">
                        <div className="header d-flex justify-content-between">
                            <h5 className="fs-5 fw-bold">My Latest Tasks</h5>
                        </div>
                        <div className="container">
                            <div className="row d-flex justify-content-center">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}