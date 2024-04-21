import FirstCalendar from "../../../Components/Calendar/FirstCalendar.jsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Sessions } from "../../../data/sessionsData.jsx";
import AdminCalendar from "../../../Components/Calendar/AdminCalendar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../../../Components/Calendar/styles.css';
import MidNavbar from "../../../Components/MidNavbar/MidNavbar.jsx";

export default function Calendar() {
    const {id} = useParams();
    // const [level, setLevel] = useState(2); // 1: Génie logiciel 2ème année, 2: Génie logiciel 3ème année

    const data = Sessions.filter((session) => session.LevelId == id);
    console.log(id);
    console.log(data);

    return(
    <div className="px-5" style={{ width: '100%'}}>
        <div className="pt-lg-0 pt-3" style={{ marginTop: '20px'}}>
            <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                <div className="notes-icon">
                    <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                </div>
                <h1 className="fs-2 ms-2 fw-bold" style={{ marginBottom:"0" }}>Admin Calendar</h1>
            </div>

            <select name="level" id="level" className="form-select"
            onChange={(e) => {
                window.location.pathname = `/admin/calendar/${e.target.value}`;
            }
            }>
                <option value="">Select Level </option>
                <option value="1" selected={id === 1}>Génie logiciel 2ème année</option>
                <option value="2" selected={id === 2}>Génie logiciel 3ème année</option>
            </select>
        <AdminCalendar sessions={data}/>
        </div>
        <MidNavbar/>
    </div>
    )
}