import React, {useEffect, useState} from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import './Courses.css';
import Course from "../../../Components/Course/Course.jsx";
import axios from "axios";
export default function Courses() {
    const[date, setDate] = useState();
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
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(today.toLocaleDateString('en-US', options));
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
        <div className="container mt-4 courses-page">
            <div className="date">
                {date}
            </div>
            <div className="my-courses d-flex p-3 mt-4">
                <div className="courses-icon">
                    <FaBookOpenReader size={40} />
                </div>
                <h1 className="fs-1 ms-4 fw-bold">My Courses</h1>
            </div>
            <div className="container all-courses mt-4">
                <div className="row">
                    {courses.map((course, index) => (
                        <React.Fragment key={index}>
                            {index % modulo === 0 && index !== 0 &&
                                <>
                                    <hr/>
                                </>}
                            <div className="custom-col mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
                                <Course course={course} color={colors[index % colors.length]} placement="course"/>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>


        </div>
    )
}