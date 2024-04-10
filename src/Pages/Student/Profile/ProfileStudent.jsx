import './ProfileStudent.css';
import React, {useEffect, useState} from "react";
import {useDate} from "../../../Context/DateContext.jsx";
import MiniNavbar from "../../../Components/MiniNavbar/MiniNavbar.jsx";
import {FaUser} from "react-icons/fa";
import Profile from "../../../Components/Profile/Profile.jsx";
import Course from "../../../Components/Course/Course.jsx";
import axios from "axios";
import NoAbsence from "../../../assets/images/NoAbsence.svg"
export default function ProfileStudent() {
    const date = useDate();
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
                setCourses(response.data.filter((course) => course?.nbAbsence > 0));
            }).catch((err) => {
                console.log(err);
            }
        )

    },[])
    return (
        <div className="container profile-student-page pt-3">
            <MiniNavbar/>
            <div className="date ms-3">
                {date}
            </div>
            <div className={`profile-student d-flex mt-4 p-3 ms-3 ${isSmallScreen ? 'more-margin' : ''}`}>
                <div className="courses-icon pt-1">
                    <FaUser size={30}/>
                </div>
                <h1 className="ms-2 fw-bold">Profile</h1>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-4 profile">
                        <Profile role={"student"}/>
                    </div>
                    {courses.length > 0 ?(<div className="absence d-flex col-lg-8 row p-1 pt-3">
                        {courses.map((course, index) => (
                            <div key={index}
                                 className="col-lg-4 d-flex mb-2 mt-2 flex-column justify-content-center align-items-center">
                                <Course course={course} color={colors[index % colors.length]} placement="absence"/>
                            </div>
                        ))}
                    </div>):
                        (
                            <div className="col-lg-8 d-flex align-items-center justify-content-center">
                                <img src={NoAbsence} alt={"NoAbsence"} className="no-absence"
                                     style={{width: '17%', height: 'auto', opacity: '0.7'}}/>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>)
}