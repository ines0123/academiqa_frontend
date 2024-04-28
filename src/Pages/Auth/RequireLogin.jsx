import { Outlet } from "react-router-dom";
import Login from "./Login";
import Cookie from 'cookie-universal';

export default function RequireLogin() {
    const cookie = Cookie();

    return cookie.get('academiqa')   ? <Outlet/>: <Login/>;
}