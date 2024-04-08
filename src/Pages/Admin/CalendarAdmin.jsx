import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Sessions } from "../../data/sessionsData";
import AdminCalendar from "../../Components/Calendar/AdminCalendar";


export default function Calendar() {
    const {id} = useParams();
    // const [level, setLevel] = useState(2); // 1: Génie logiciel 2ème année, 2: Génie logiciel 3ème année

    const data = Sessions.filter((session) => session.LevelId == id);
    console.log(id);
    console.log(data);

    return(
    <div style={{ width: '100%'}}>
        <div style={{ marginLeft: '30px', marginTop: '20px'}}>
            <h1 style={{fontFamily: "Inika"}}>
                Admin Calendar
            </h1>

            <select name="level" id="level" className="form-select"
            onChange={(e) => {
                window.location.pathname = `/admin/calendar/${e.target.value}`;
            }
            }>
                <option value="0">Select Level </option>
                <option value="1" selected={id == 1}>Génie logiciel 2ème année</option>
                <option value="2" selected={id == 2}>Génie logiciel 3ème année</option>
            </select>
        <AdminCalendar sessions={data}/>
        </div>
    </div>
    )
}