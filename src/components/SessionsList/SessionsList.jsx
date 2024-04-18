import "./SessionsList.css";
import SessionButton from "../SessionButton/SessionButton";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import noSessions from "../../assets/images/no_sessions.png";

function SessionsList() {
    const sessions = [
        // {name: "Session 1", date: "27 March 2024, Wednesday"},
        // {name: "Session 2", date: "27 March 2024, Wednesday"},
        // {name: "Session 3", date: "27 March 2024, Wednesday"},
        // {name: "Session 4", date: "27 March 2024, Wednesday"},
        // {name: "Session 5", date: "27 March 2024, Wednesday"},
        // {name: "Session 6", date: "27 March 2024, Wednesday"},
        // {name: "Session 7", date: "27 March 2024, Wednesday"},
        // {name: "Session 8", date: "27 March 2024, Wednesday"},
        // { name: "Session 9", date: "27 March 2024, Wednesday" },
        // { name: "Session 10", date: "27 March 2024, Wednesday" },
        // { name: "Session 11", date: "27 March 2024, Wednesday" },
        // { name: "Session 12", date: "27 March 2024, Wednesday" },
        // { name: "Session 13", date: "27 March 2024, Wednesday" },
        // { name: "Session 14", date: "27 March 2024, Wednesday" },
        // { name: "Session 15", date: "27 March 2024, Wednesday" },
        // { name: "Session 16", date: "27 March 2024, Wednesday" },
    ];

    return (
        <div className="sessions-box ">
            <div className="sessions-title font-IstokWebBold mt-2 overflow-hidden ">Sessions</div>
            <Scrollbar trackColor="#C4B3CC" thumbColor="#692E5F" maxHeight="453px">
                <div className="sessions mr-2 h-[449px] position-relative">
                    {sessions.length === 0 && (
                        <div className="no-sessions e-auto-fit-content position-absolute top-50 start-50 translate-middle">
                            <img src={noSessions} alt="No Sessions"/>
                        </div>
                    )}

                    {sessions.map((session, index) => (
                        <SessionButton key={index} session={session}/>
                    ))}
                </div>
            </Scrollbar>
        </div>
    );
}

export default SessionsList;
