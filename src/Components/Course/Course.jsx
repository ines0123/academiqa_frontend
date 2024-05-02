import {Fragment, useState} from 'react';
import './Course.css';
import Sellaouti from "../../assets/images/Sellaouti.jpg";
import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Course = ({maxWidth,course,color,placement}) => {
    const [type,setType] = useState(placement);
    console.log('course',course)
    return (
        <div className="course card d-flex justify-content-center ps-4 pe-3 pb-3" style={{background: `${color}`,maxWidth: maxWidth ? '301px':''}}>
            <NavLink to={`/course/${course?.id}`} className="text-decoration-none">
                <div className="card-content d-flex flex-column justify-content-evenly">
                    <div className="card-top">
                        <h3 className="card-title m-0  fw-bold">{course?.name}</h3>
                        {type === 'course' ? (<h6 className="m-0 font-bold">{course?.sectorLevel}</h6>) : null}
                    </div>
                    <div className="card-bottom d-flex justify-content-between align-items-center">
                        <h5 className=" font-semibold mt-2">
                            {course?.teachersUsernames?.map((teacher, index) => (
                                <div className="prof" key={index}>
                                    {teacher}
                                    <br/>
                                </div>
                            ))}
                        </h5>
                        <img
                            className={`rounded-circle img ${type === 'course' ? 'img-for-course' : 'img-for-absence'} `}
                            src={Sellaouti}
                            alt="Chatbot"
                            width={75}
                            height={75}
                            style={{width: '50px', height: '50px'}}
                        />
                    </div>
                    {type === 'absence' ? (
                        <h5 className="m-0  font-semibold text-center fs-5">Absence: {course?.nbAbsence} </h5>) : null}
                </div>
            </NavLink>
        </div>
);
};

export default Course;