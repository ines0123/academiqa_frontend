import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(false);

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((prevVisible) => !prevVisible);
        console.log(isVisible)
    };
    return (
        <NotificationContext.Provider value={{isVisible, setIsVisible, toggleVisibility}}>
            {children}
        </NotificationContext.Provider>
    );
};
