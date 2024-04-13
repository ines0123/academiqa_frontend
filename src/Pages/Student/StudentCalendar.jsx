import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { Sessions } from "../../data/sessionsData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import MidNavbar from "../../Components/MidNavbar/MidNavbar.jsx";
import {useEffect, useState} from "react";



export default function StudentCalendar() {

    const student = {
        id: 1,
        name: "John Doe",
        level: 2
    }
    const data = Sessions.filter((session) => session.LevelId === student.level);
    console.log(data);

    return(
        <div className="px-5 pt-4 " style={{ width: '100%' }}>
                <div className="pt-lg-0 pt-3" style={{ marginTop: '20px'}}>
                    <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                        <div className="notes-icon">
                            <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                        </div>
                        <h1 className="fs-2 ms-2 fw-bold" style={{marginBottom:"0" }}>Student Calendar</h1>
                    </div>        <FirstCalendar role='student' sessions={data}/>
                </div>
            <MidNavbar/>
        </div>
    )
}