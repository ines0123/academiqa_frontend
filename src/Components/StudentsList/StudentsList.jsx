import './StudentsList.css'
import {PiStudent} from "react-icons/pi";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import avatar from "../../assets/images/avatar2.png";
import React from "react";
const StudentsList = ({group}) => {
    return (
        <div className="students-list p-2 pt-2">
            <div className="d-flex align-items-center mb-1 ms-1">
                <PiStudent size={25}/>
                <p className="fs-6 fw-bold ms-2 mt-1">{group?.sectorLevel} group {group?.group}</p>
            </div>
            <div className="student-list d-flex justify-content-center">
                <div className="scroll-students pt-2 d-flex flex-column align-items-center">
                    {group && group.students?.map((student, index) => (
                        <div key={index}
                             className="student-item-home d-flex align-items-center justify-content-start ">
                            <img
                                className="rounded-circle"
                                src={student?.photo || avatar}
                                alt={"student"}
                                style={{width: '25px', height: '25px'}}
                            />
                            <p className="fs-6 ms-2 px-0.5 student-username">{student?.username}</p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default StudentsList;