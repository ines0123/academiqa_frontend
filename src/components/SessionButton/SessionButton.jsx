import React from "react";
import "./SessionButton.css";

function SessionButton({ session }) {
  return (
    <div >
      <button className="sessionButton-button">
        <div >
          <div className="sessionButton-name font-IstokWebBold">{session.name}</div>
            <div className="sessionButton-date font-IstokWebRegular">{session.date}</div>
        </div>
      </button>
    </div>
  );
}

export default SessionButton;