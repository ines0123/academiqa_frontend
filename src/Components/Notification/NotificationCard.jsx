import './NotificationCard.css';
import { useEffect, useRef, useState } from "react";
import Notif from "./Notif/Notif.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";
import {useNotification} from "../../Context/NotificationContext.jsx";
import axios from "axios";
import {baseURL, NOTIF} from "../../Api/Api.jsx";

const NotificationCard = () => {
    const [notifications, setNotifications] = useState([]);
    const {isVisible, setIsVisible,toggleVisibility,setNotifCount} = useNotification();
    const notificationCardRef = useRef(null);
    const socket = useSocket();

    useEffect(() => {
        axios.get(`${baseURL}/${NOTIF}`).then((res)=>{
            setNotifications(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    const handleDocumentClick = (event) => {
        const clickedButtonClasses = ["BellbuttonMid", "BellbuttonNav","Bellbutton"];

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
        setNotifCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem("notifCount", newCount);
            return newCount;
        });
    }
    useEffect(()=> {
        socket?.on('notify', notifyListener);
        return () => {
            socket?.off('notify', notifyListener);
        }
    },[notifyListener])



    useEffect(() => {
        const sseUrl = `http://localhost:5000/new-notification/events-for-user`; // Adjust the URL to match your backend endpoint

        const eventSource = new EventSource(sseUrl, {
            withCredentials: true, // Optional, depending on your authentication setup
        });

        // Listen for the 'message' event
        eventSource.addEventListener('message', (event) => {
            const notification = JSON.parse(event.data);
            // Update state with new notification
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

        // Handle potential errors
        eventSource.addEventListener('error', (event) => {
            console.error('SSE error:', event);
            if (event.readyState === EventSource.CLOSED) {
                console.log('EventSource connection closed');
            }
        });

        // Clean up the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

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
