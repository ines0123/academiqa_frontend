import './NotificationCard.css';
import { useEffect, useRef, useState } from "react";
import Notif from "./Notif/Notif.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import io from "socket.io-client";

const NotificationCard = ({socket}) => {
    const notificationTypes = {
        "absence-limit": 1,
        "content": 2,
        "message": 3,
        "absent": 4
    };

    const [notifications, setNotifications] = useState([
        {
            message: "You have reached the absence limit in Co Design, please contact the administration",
            type: "absence-limit",
        },
        {
            message: "New content has been added to the course",
            type: "content",
        },
        {
            message: "You have a new message",
            type: "message",
        },
        {
            message: "You have been marked absent",
            type: "absent",
        },
    ]);

    const [isVisible, setIsVisible] = useState(false);
    const notificationCardRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleDocumentClick = (event) => {
        if (!notificationCardRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
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
            <button ref={buttonRef} className="btn btn-primary" onClick={toggleVisibility}>
                {isVisible ? 'Hide Notifications' : 'Show Notifications'}
            </button>
            {isVisible && (
                <div ref={notificationCardRef} className="notification-card m-5 px-3 pt-1">
                    <Scrollbar thumbColor={'#B5B5B5'} trackColor={'#DBDBDB'} maxHeight={'230px'}>
                        {notifications.map((notification, index) => (
                            <div className="px-1" key={index}>
                                <Notif
                                    message={notification.message}
                                    color={notificationTypes[notification.type]}
                                />
                                {index < notifications.length - 1 && (<hr className="mt-1 mb-1"/>)}
                            </div>
                        ))}
                    </Scrollbar>
                </div>
            )}
        </div>
    );
};

export default NotificationCard;
