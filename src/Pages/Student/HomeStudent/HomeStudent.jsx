import Navbar from "../../../Components/Navbar/Navbar.jsx";
import React, {useContext, useEffect, useState} from "react";
import './HomeStudent.css';
import SeeMoreButton from "../../../Components/Common/SeeMoreButton/SeeMoreButton.jsx";
import axios from "axios";
import Course from "../../../Components/Course/Course.jsx";
import {Menu} from "../../../Context/MenuContext.jsx";

export default function HomeStudent() {
    const [date, setDate] = useState();
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
    useEffect(() => {
        const today = new Date();
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        setDate(today.toLocaleDateString('en-US', options));
    }, []);
    return (
        <div className="d-flex container student-home-page m-0">
            <div className={`body mt-4 px-2 ${menu.isOpen? '':'smaller'}`}>
                <div className="row px-3 d-flex justify-content-between">
                    <div className={`custom-col-1 p-0`} id="firstColumn">
                        <div className="Welcoming d-flex flex-column p-3">
                            <h5 className="fs-5 ms-2 fw-bold">Welcome back, Rym!</h5>
                            <p className="fs-6 ms-2">Hope you're ready for another awesome day with us!</p>
                        </div>
                    </div>
                    <div className="date custom-col-2 text-end" id="secondColumn">
                        {date}
                    </div>
                </div>
                <div className="content ">
                    <div className="some-courses">
                        <div className="header d-flex justify-content-between">
                            <h5 className="fs-5 fw-bold">My Courses</h5>
                            <SeeMoreButton/>
                        </div>
                        <div className="container all-courses-home">
                            <div className="row d-flex justify-content-center">
                                {courses.map((course, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`custom-col course-${index} mt-4 mb-4 p-0 d-flex flex-column justify-content-center align-items-center`}>
                                            <Course course={course} color={colors[index % colors.length]} placement="course"/>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                    </div>
                    <hr className="mt-2 mb-4"/>
                    <div className="some-notes">
                        <div className="header d-flex justify-content-between">
                            <h5 className="fs-5 fw-bold">My notes</h5>
                            <SeeMoreButton/>

                        </div>

                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}