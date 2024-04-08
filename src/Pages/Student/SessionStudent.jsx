import { useParams } from "react-router-dom";
import { Sessions } from "../../data/sessionsData";
import { Tasks } from "../../data/TasksData";


export default function SessionStudent() {
    const { id } = useParams();

    return (
        <div>
            <h1>
                SessionStudent 
            </h1>
            {
                Sessions.map((session) => {
                    if (session.Id == id) {
                        return (
                            <div>
                                <h3>{session.Subject}</h3>
                                <p>{session.StartTime.getDate()}/{session.StartTime.getMonth()}/{session.StartTime.getFullYear()} {session.StartTime.getHours()}:{session.StartTime.getMinutes()} - {session.EndTime.getHours()}:{session.EndTime.getMinutes()}</p>
                                <h3>Tasks:</h3>
                                <p>
                                    {Tasks.map((task) => {
                                        if (task.Session_ID == id) {
                                            return (
                                                <div>
                                                    <h5>{task.Title}</h5>
                                                    <h5>session Id : {task.Session_ID}</h5>
                                                    <p>Is Done : {task.isDone ? "Yes" : "No"}</p>
                                                </div>
                                            )
                                        }
                                    })}
                                </p>
                            </div>
                        )
                    }
                })
            }
        </div>
        )
}