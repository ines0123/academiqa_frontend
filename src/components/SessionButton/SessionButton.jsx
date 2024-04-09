import React from "react";
import "./SessionButton.css";
import {NavLink} from "react-router-dom";

function SessionButton({session}) {
    return (
        <NavLink to={'/'}>
            <button className="sessionButton-button container"
                    title={session.name + ", " + session.date}
            >
                <div>
                    <div
                        className="sessionButton-name font-IstokWebBold overflow-hidden text-nowrap">{session.name}</div>
                    <div
                        className="sessionButton-date font-IstokWebRegular overflow-hidden text-nowrap">{session.date}</div>
                </div>
            </button>
        </NavLink>
    );
}

export default SessionButton;