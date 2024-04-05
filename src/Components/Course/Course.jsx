import {useState} from 'react';
import './Course.css';
import Sellaouti from "../../assets/images/Sellaouti.jpg";
import {NavLink} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Course = ({course,color,placement}) => {
    const [type,setType] = useState(placement);

    return (
        <div className="card ps-4 pe-3 pb-3 pt-4" style={{background: `${color}`}}>
            <NavLink to={`/course/${course.id}`} className="text-decoration-none">
                <div className="card-content d-flex flex-column justify-content-evenly">
                    <div className="card-top">
                        <h3 className="card-title m-0  fw-bold fs-4">{course?.name}</h3>
                        {type === 'course' ? (<h6 className="m-0 font-bold">{course?.class}</h6>) : null}
                    </div>
                    <div className="card-bottom d-flex justify-content-between align-items-center">
                        <h6 className="prof ps-1 font-semibold mt-2">{course?.teacher}</h6>
                        <img
                            className={`rounded-circle img ${type === 'course' ? 'img-for-course' : 'img-for-absence'} `}
                            src={Sellaouti}
                            alt="Chatbot"
                            width={75}
                            height={75}
                            style={{width: '60px', height: '60px'}}
                        />
                    </div>
                    {type === 'absence' ? (
                        <h5 className="m-0 absence font-semibold text-center fs-5">Absence: {course?.nbAbsence}</h5>) : null}
                </div>
            </NavLink>
        </div>
);
};

export default Course;