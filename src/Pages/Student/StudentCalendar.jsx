import FirstCalendar from "../../Components/Calendar/FirstCalendar";
import { Sessions } from "../../data/sessionsData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import MidNavbar from "../../Components/MidNavbar/MidNavbar.jsx";
import { useContext, useEffect, useState } from "react"
import { CurrentUser } from "../../Context/CurrentUserContext";
import axios from "axios";
import { baseURL, SESSION, SESSIONS_BY_GROUP } from "../../Api/Api";

export default function StudentCalendar() {


    const userContext = useContext(CurrentUser);
    const user = userContext.currentUser;
    const [sessionsData, setSessionsData] = useState("");


    // convert date format from iso to js
    const convertDate = (date) => {
      const result =  new Date(date);
        return result;
    }

  
    //get the sessions by user groupID
    useEffect(() => {
      if (user) {
        axios.get(
            `${baseURL}/${SESSION}/${SESSIONS_BY_GROUP}/${user?.group?.sector}/${user?.group?.level}/${user?.group?.group}`
            // `${baseURL}/${SESSION}`
            , {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }).then(
          (response) => {
            console.log(response.data);
            response.data.forEach((session) => {
              session.Subject = session.name;
              if(!session.StartTime){
                session.StartTime = session.date}
                if(!session.EndTime){
                  session.EndTime = session.endTime}
            })
            setSessionsData(response.data);
          }).catch((err) => {
            console.log(err);
          });
      }
    }, [user]);
    


    return(
        <div className="px-5 pt-4 " style={{ width: '100%' }}>
                <div className="pt-lg-0 pt-3" style={{ marginTop: '20px'}}>
                    <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                        <div className="notes-icon">
                            <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                        </div>
                        <h1 className="fs-2 ms-2 fw-bold" style={{marginBottom:"0" }}>Student Calendar</h1>
                    </div>        <FirstCalendar role='student' sessions={sessionsData}/>
                </div>
            <MidNavbar/>
        </div>
    )
}