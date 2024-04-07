import React, {useEffect, useState} from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import './Courses.css';
import Course from "../../../Components/Course/Course.jsx";
import axios from "axios";
import MidNavbar from "../../../Components/MidNavbar/MidNavbar.jsx";
import NotificationCard from "../../../Components/Notification/NotificationCard.jsx";
import MiniNavbar from "../../../Components/MiniNavbar/MiniNavbar.jsx";
import {useDate} from "../../../Context/DateContext.jsx";
export default function Courses() {
    const date = useDate();
    const[modulo, setModulo] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 799){
                setModulo(1);
            }else if(window.innerWidth < 1024){
                setModulo(2);
            }else if(window.innerWidth < 1369){
                setModulo(3);
            }else{
                setModulo(4);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 860);
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 860);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const colors = ['#F7E2E0', '#E8F5F7', '#F6E8D6', '#D8ECD6', '#E1E2F0', '#F3F6E0'];
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
            axios.get('http://localhost:5000/GetCoursesByClass/GL3').then(
                (response) => {
                    console.log(response.data);
                    setCourses(response.data);
                }).catch((err) => {
                    console.log(err);
                }
            )

    },[])
    return (
        <div className="container courses-page pt-3">
            <MidNavbar/>
            <div className="date ms-3">
                {date}
            </div>
            <div className={`my-courses d-flex mt-4 p-3 ms-4 ${isSmallScreen ? 'more-margin':''}`}>
                <div className="courses-icon">
                    <FaBookOpenReader size={35} />
                </div>
                <h1 className="ms-2 fw-bold">My Courses</h1>
            </div>
            <div className="container all-courses mt-4">
                <div className="row d-flex justify-content-center">
                    {courses.map((course, index) => (
                        <React.Fragment key={index}>
                            {index % modulo === 0 && index !== 0 &&
                                <>
                                    <hr style={{width: '95%'}}/>
                                </>}
                            <div className="custom-col-c mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
                                <Course course={course} color={colors[index % colors.length]} placement="course"/>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>


        </div>
    )
}