import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Sessions } from "../../data/sessionsData";
import AdminCalendar from "../../Components/Calendar/AdminCalendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../../Components/Calendar/styles.css';
import MidNavbar from "../../Components/MidNavbar/MidNavbar.jsx";
import { groups } from "../../data/LevelsData.jsx";
import { useNavigate } from "react-router-dom";
import { WindowSize } from "../../Context/WindowContext.jsx";
import { CurrentUser } from "../../Context/CurrentUserContext.jsx";

export default function Calendar() { 
    const {id} = useParams();
    const context = useContext(WindowSize);
    const windowSize = context.windowSize;
    const userContext = useContext(CurrentUser);
    const role = userContext.currentUser? userContext.currentUser.role: "student";

    const data = Sessions
    .filter((session) => session.LevelId.includes(+id));
    const selectedGroup = groups.find((group) => group.id == id);
    console.log("sessions:", data);

    const [year, setYear] = useState(selectedGroup? selectedGroup.year:"");
    const [sector, setSector] = useState(selectedGroup? selectedGroup.sector:"");
    const [amphi, setAmphi]= useState(selectedGroup? selectedGroup.amphi:"");
    const [group, setGroup]=useState(selectedGroup? selectedGroup.group:"");
    
    // extract the unique sectors from the groups:
    const sectors = [...new Set(groups.map(group => group.sector))];
    const navigate = useNavigate();



    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            sector: sector,
            year:year,
            amphi: amphi,
            group: group
        }
        // post request 
        let result = 
        groups.filter(g => g.sector== sector  
            && (g.year== year) 
            && g.group==group
        );
        if (result.length>1) result= result.filter(g=> g.amphi== amphi);
        console.log("group:", result);

        navigate("/admin/calendar/"+result[0].id);


    }

    return(
    <div className="px-5" style={{ width: '100%'}}>
        <div className="pt-lg-0 pt-3" style={{ marginTop: '20px'}}>
            <div className={`my-notes d-flex mt-4 p-3 mb-3`}>
                <div className="notes-icon">
                    <FontAwesomeIcon icon={faCalendarDays} size="2x"/>                
                </div>
                <h1 className="fs-2 ms-2 fw-bold" style={{ marginBottom:"0" }}>Admin Calendar</h1>
            </div>



            <form onSubmit={handleSubmit} >
                <div className="d-flex" style={{flexWrap:"wrap", marginLeft:"10%"}}
                >
                <select name="level" id="level" className="form-select "
                onChange={(e) => {
                    setSector(e.target.value);

                }
                }>
                    <option value="" hidden>Select sector </option>

                    {
                        sectors.map((sector) => {
                            return <option value={sector} selected={sector==selectedGroup?.sector}
                            >{sector}</option>;
                          })
                    }
                </select>

                { sector!="MPI" &&( 
                <select name="level" id="level" className="form-select"
                onChange={(e) => {
                    setAmphi("");
                    setYear(e.target.value);

                    // window.location.pathname = `/admin/calendar/${e.target.value}`;
                }
                }>
                    <option value="" hidden>Select Level </option>
                    {
                        groups
                        .filter((l) => l.sector == sector && l.group==1)
                        .map((level) => {
                            return <option value={level.year} selected={level.year==selectedGroup?.year}
                            >{level.year}</option>
                        }
                        )
                    }

                </select>)}

                {
                    sector == "MPI" &&(
                        <select name="amphi" id="amphi" className="form-select"
                onChange={(e) => {
                    setYear("1");
                    setAmphi(e.target.value);

                    // window.location.pathname = `/admin/calendar/${e.target.value}`;
                }
                }>
                    <option value="" hidden>Select Amphi </option>
                    {
                        groups
                        .filter((l) => l.sector == sector && l.group==1)
                        .map((level) => {
                            return <option value={level.amphi} selected={level.amphi==selectedGroup?.amphi}
                            >{level.amphi}</option>
                        }
                        )
                    }

                </select>)
                }

                <select name="group" id="group" className="form-select"
                onChange={(e) => {
                    setGroup(e.target.value);
                    console.log(
                        "year:", year,
                        ",sector:", sector,
                        ",year: ", year,
                        ",amphi:", amphi);
                }
                }>
                    <option value="" hidden>Select Group </option>
                    {
                        groups
                        .filter((l) => l.sector == sector && (l.year== 2 || l.amphi==1))
                        .map((level) => {
                            return <option value={level.group} selected={level.group==selectedGroup?.group}
                            >{level.group}</option>
                        }
                        )
                    }

                </select>

                <button className="form-button" type="submit">
                    submit
                </button>
                </div>
                </form>

        <AdminCalendar role={role} sessions={data}/>
        </div>
        <MidNavbar/>
    </div>
    )
}