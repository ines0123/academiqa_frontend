import { Outlet } from "react-router-dom";

export default function RequireAuth({ allowedRole }) {
    // get the user from the context (to be done later)
    //const { user } = useContext(UserContext);

    return  (
        // allowedRole.includes (user.role) ? (
        <Outlet/>
        // ) : (
        //     <h1>Unauthorized</h1>
        // )
    );
}