import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../../Context/CurrentUserContext";
import Unauthorized from "./Unauthorized";

export default function RequireRole({ allowedRole }) {

    const navigate = useNavigate();
    const userContext = useContext(CurrentUser);
    // if(!userContext.currentUser)
    // {
    //     navigate('/login')
    // }
    const role = userContext.currentUser ? userContext.currentUser.role: "none";


    console.log("userContext: ", userContext);
    return  (
        allowedRole.includes (role.toLowerCase()) ? (
            <Outlet/>
        ) : (
            <Unauthorized/>
        )
    );
}

