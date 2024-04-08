import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { Sessions } from "../../data/sessionsData";


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
            <h1 style={{fontFamily: "Inika"}}>
                Student Calendar
            </h1>
        <FirstCalendar role='student' sessions={data}/>
        </div>
    </div>
    )
}