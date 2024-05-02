import React, {useContext} from "react";
import "./SessionButton.css";
import {NavLink} from "react-router-dom";
import {CurrentUser} from "../../Context/CurrentUserContext.jsx";

function SessionButton({session}) {
    const {currentUser,user} = useContext(CurrentUser);
    console.log("Sessionnnnnnnnnnnn: ", session)
    return (

        <button className="sessionButton-button container "
                title={session?.name + ", " + session?.date}
        ><NavLink to={`/${currentUser?.role}/session/${session?.id}`}>
            <div>
                <div
                    className="sessionButton-name font-IstokWebBold overflow-hidden text-nowrap">{session?.sessionType?.type} n°{session?.rank} {session?.sessionType?.type !== 'lecture' && `group ${session?.group}`}</div>
                <div
                    className="sessionButton-date font-IstokWebRegular overflow-hidden text-nowrap">{session?.date}</div>
            </div>
        </NavLink>
        </button>

    );
}

export default SessionButton;