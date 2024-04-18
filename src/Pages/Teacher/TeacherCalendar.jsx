import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Sessions } from "../../data/sessionsData";
import { Subjects } from "../../data/SubjectsData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import MidNavbar from "../../Components/MidNavbar/MidNavbar.jsx";


export default function TeacherCalendar() {
    const {id} = useParams();
    const teacher ={
        Id: 2,
        Name: "Sellaouti"
    }
    let data = [];

    if (id){
        data = Sessions.filter((session) => session.LevelId == id);
        console.log(id);
        console.log('sessions:', data);
        }
    else {
        const subjects = Subjects.filter((subject) => subject.TeacherId == teacher.Id);
        console.log('subjects:', subjects);
        data  = Sessions.filter((session) => subjects.map((subject) => subject.Id).includes(session.SubjectId));
        console.log('sessions:', data);

    }

    return(
<div className="px-5" style={{ width: '100%'}}>
        <div className="pt-lg-0 pt-3" style={{marginTop: '20px'}}>
            <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                <div className="notes-icon">
                <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                </div>
                <h1 className="fs-2 ms-2 fw-bold" style={{marginBottom:"0" }}>Teacher Calendar</h1>
            </div>            <select name="level" id="level" className="form-select"
             onChange={(e) => {
                window.location.pathname = `teacher/calendar/${e.target.value}`;

            }
            }>
                <option value="">My Calendar </option>
                <option value="1" selected={id === 1}>Génie logiciel 2ème année</option>
                <option value="2" selected={id === 2}>Génie logiciel 3ème année</option>
            </select>
        <FirstCalendar role="teacher" sessions={data}/>
        </div>
    <MidNavbar/>
    </div>
    )
}