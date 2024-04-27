import { createContext, useEffect } from "react";
import { useState } from "react";
import Cookie from 'cookie-universal';

export const CurrentUser = createContext(null);

export default function CurrentUserContext({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const cookie = Cookie();

    // useEffect(() => {
    //     const userToken = cookie.get('academiqa');


    return <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </CurrentUser.Provider>
}