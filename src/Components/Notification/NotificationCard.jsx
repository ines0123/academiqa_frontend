import './NotificationCard.css';
import { useEffect, useRef, useState } from "react";
import Notif from "./Notif/Notif.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";
import {useNotification} from "../../Context/NotificationContext.jsx";

const NotificationCard = () => {
    const [notifications, setNotifications] = useState([]);
    const {isVisible, setIsVisible,toggleVisibility} = useNotification();
    const notificationCardRef = useRef(null);
    const socket = useSocket();
    const getNotifications = () => {
        socket?.emit('getAllNotifications','1',(notifications) => {
                    setNotifications(notifications);
                });
    }
    useEffect(() => {
        getNotifications();
        console.log(notifications)
    }, [socket]);
    const messageListener = () => {
        getNotifications();
    }
    useEffect(()=> {
        socket?.on('message', messageListener);
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener])



    const handleDocumentClick = (event) => {
        const clickedButtonClasses = ["BellbuttonMid", "BellbuttonNav"];

        // Function to check if any ancestor of the clicked element has the specified class
        const hasClass = (element, className) => {
            if (element.classList.contains(className)) {
                return true;
            }
            if (element.parentElement) {
                return hasClass(element.parentElement, className);
            }
            return false;
        };

        if (
            !notificationCardRef.current?.contains(event.target) &&
            !clickedButtonClasses.some(className => hasClass(event.target, className))
        ) {
            setIsVisible(false);
        }
    };



    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isVisible]);

    const notifyListener = (notif) => {
        setNotifications(prevMessages => [...prevMessages, notif]);
    }
    useEffect(()=> {
        socket?.on('notify', notifyListener);
        return () => {
            socket?.off('notify', notifyListener);
        }
    },[notifyListener])

    return (
        <div className="notification-card-container">
            {isVisible && (
                <div ref={notificationCardRef} className="notification-card m-5 px-3 pt-1">
                    <Scrollbar thumbColor={'#B5B5B5'} trackColor={'#DBDBDB'} maxHeight={'230px'}>
                        {notifications?.map((notification, index) => (
                            <div className="px-1" key={index}>
                                <Notif
                                    notification={notification}
                                />
                                {index !== 0  && (<hr className="mt-1 mb-1"/>)}
                            </div>
                        )).reverse()}
                    </Scrollbar>
                </div>
            )}
        </div>
    );
};

export default NotificationCard;
