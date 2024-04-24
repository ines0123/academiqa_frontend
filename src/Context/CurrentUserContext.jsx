import { createContext } from "react";
import { useState } from "react";

export const CurrentUser = createContext(null);

export default function CurrentUserContext({children}) {
    const [currentUser, setCurrentUser] = useState(null);

    return <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </CurrentUser.Provider>
}