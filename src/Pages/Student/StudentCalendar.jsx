import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { Sessions } from "../../data/sessionsData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';



export default function StudentCalendar() {
    const student = {
        id: 1,
        name: "John Doe",
        level: 2
    }
    const data = Sessions.filter((session) => session.LevelId == student.level);
    console.log(data);

    return(
        <div style={{ width: '100%'}}>
                <div style={{ marginLeft: '30px', marginTop: '20px'}}>
                    <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                        <div className="notes-icon">
                            <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                        </div>
                        <h1 className="fs-2 ms-2 fw-bold" style={{fontFamily: "Inika", marginBottom:"0" }}>Student Calendar</h1>
                    </div>        <FirstCalendar role='student' sessions={data}/>
            </div>
        </div>
    )
}