import {useState} from 'react';
import './Course.css';
import teacher from "../../assets/images/training.png";
import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CourseForTeacher = ({course,color}) => {

    return (
        <div className="card d-flex justify-content-start ps-3 pe-2 pt-4" style={{background: `${color}`}}>
            <NavLink to={`/course/${course?.id}`} className="text-decoration-none">
                <div className="card-content d-flex align-items-start justify-content-start">
                    <div className="card-image" style={{marginTop:'3px'}}>
                        <img src={teacher} alt="teacher" className="img-fluid"
                             style={{width: 'auto', height: 'auto', maxHeight: '35px', maxWidth: '35px', opacity:'0.8'}}/>
                    </div>
                    <div className="card-top ms-3" >
                        <h3 className="card-title-teacher m-0 fw-bold">{course?.name}</h3>
                        <h6 className="m-0 mt-3 font-bold">{course?.class}</h6>
                    </div>
                </div>

            </NavLink>
        </div>
    );
};

export default CourseForTeacher;