import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Sessions } from "../../data/sessionsData";
import AdminCalendar from "../../Components/Calendar/AdminCalendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../../Components/Calendar/styles.css';

export default function Calendar() {
    const {id} = useParams();
    // const [level, setLevel] = useState(2); // 1: Génie logiciel 2ème année, 2: Génie logiciel 3ème année

    const data = Sessions.filter((session) => session.LevelId == id);
    console.log(id);
    console.log(data);

    return(
    <div style={{ width: '100%'}}>
        <div style={{ marginLeft: '30px', marginTop: '20px'}}>
            <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                <div className="notes-icon">
                    <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                </div>
                <h1 className="fs-2 ms-2 fw-bold" style={{fontFamily: "Inika", marginBottom:"0" }}>Admin Calendar</h1>
            </div>

            <select name="level" id="level" className="form-select"
            onChange={(e) => {
                window.location.pathname = `/admin/calendar/${e.target.value}`;
            }
            }>
                <option value="">Select Level </option>
                <option value="1" selected={id == 1}>Génie logiciel 2ème année</option>
                <option value="2" selected={id == 2}>Génie logiciel 3ème année</option>
            </select>
        <AdminCalendar sessions={data}/>
        </div>
    </div>
    )
}