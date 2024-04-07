import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import WindowContext from "./Context/WindowContext";
import MenuContext from "./Context/MenuContext";
import {SocketProvider} from "./Context/SocketContext.jsx";
import {NotificationProvider} from "./Context/NotificationContext.jsx";
import {DateProvider} from "./Context/DateContext.jsx";



const root = ReactDOM.createRoot(
  document.getElementById("root") 
);
root.render(
  <React.StrictMode>
    <DateProvider>
        <SocketProvider>
            <NotificationProvider>
                <WindowContext>
                    <MenuContext>
                        <Router>
                            <App />
                        </Router>
                    </MenuContext>
                </WindowContext>
            </NotificationProvider>
        </SocketProvider>
    </DateProvider>
  </React.StrictMode>
);
