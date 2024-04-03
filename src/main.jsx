import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";
import { BrowserRouter as Router } from "react-router-dom";
import WindowContext from "./Context/WindowContext";
import MenuContext from "./Context/MenuContext";
import Profile from "./components/Profile/Profile.jsx";

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
            <Profile role="student"/>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);

