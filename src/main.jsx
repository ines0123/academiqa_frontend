import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";
import { BrowserRouter as Router } from "react-router-dom";
import WindowContext from "./Context/WindowContext";
import MenuContext from "./Context/MenuContext";
import SessionsAnnouncement from "./components/SessionsAnnouncements/SessionsAnnouncement";

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxMYVF2R2FJeFRycF9FaEwgOX1dQl9hSXpTcEVmWn9feHVRQWY="
);

const root = ReactDOM.createRoot(
  document.getElementById("root") 
);
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);

