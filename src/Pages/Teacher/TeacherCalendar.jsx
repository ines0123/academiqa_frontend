import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Sessions } from "../../data/sessionsData";
import { Subjects } from "../../data/SubjectsData";


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
    <div style={{ width: '100%'}}>
        <div style={{ marginLeft: '30px', marginTop: '10px'}}>
            <h1 style={{fontFamily: "Inika"}}>
                Teacher Calendar
            </h1>

            <select name="level" id="level" className="form-select"
             onChange={(e) => {
                window.location.pathname = `teacher/calendar/${e.target.value}`;

            }
            }>
                <option value="">My Calendar </option>
                <option value="1" selected={id == 1}>Génie logiciel 2ème année</option>
                <option value="2" selected={id == 2}>Génie logiciel 3ème année</option>
            </select>
        <FirstCalendar role="teacher" sessions={data}/>
        </div>
    </div>
    )
}