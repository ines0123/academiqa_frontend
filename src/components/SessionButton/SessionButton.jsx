import React from "react";
import "./SessionButton.css";
import {NavLink} from "react-router-dom";

function SessionButton({session}) {
    return (

        <button className="sessionButton-button container "
                title={session.name + ", " + session.date}
        ><NavLink to={'/'}>
            <div>
                <div
                    className="sessionButton-name font-IstokWebBold overflow-hidden text-nowrap">{session.name}</div>
                <div
                    className="sessionButton-date font-IstokWebRegular overflow-hidden text-nowrap">{session.date}</div>
            </div>
        </NavLink>
        </button>

    );
}

export default SessionButton;