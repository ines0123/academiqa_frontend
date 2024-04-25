import {createContext, useEffect} from "react";
import { useState } from "react";
import Cookie from "cookie-universal";
import {jwtDecode} from "jwt-decode";

export const CurrentUser = createContext({
    currentUser: null,
    setCurrentUser: () => {}
});

export default function CurrentUserContext({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
            const cookie = Cookie();
            const userToken = cookie.get('academiqa');
            setCurrentUser({
                id: jwtDecode(userToken).id,
                role: jwtDecode(userToken).role,
                username: jwtDecode(userToken).username,
                email: jwtDecode(userToken).email,
            });
        }
        ,[])
    return <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </CurrentUser.Provider>
}