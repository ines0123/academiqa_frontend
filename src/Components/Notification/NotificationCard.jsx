import './NotificationCard.css';
import {useContext, useEffect, useRef, useState} from "react";
import Notif from "./Notif/Notif.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";
import {useNotification} from "../../Context/NotificationContext.jsx";
import axios from "axios";
import {baseURL, NOTIF, SESSION, STUDENTSFROMSESSION} from "../../Api/Api.jsx";
import {CurrentUser} from "../../Context/CurrentUserContext.jsx";
import Cookie from "cookie-universal";

const NotificationCard = () => {
    const [notifications, setNotifications] = useState([]);
    const {isVisible, setIsVisible,toggleVisibility,setNotifCount} = useNotification();
    const notificationCardRef = useRef(null);
    const socket = useSocket();
    const cookie = Cookie();
    const userToken = cookie.get('academiqa')
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const {currentUser} = useContext(CurrentUser);
    useEffect(() => {
        axios.get(`${baseURL}/${NOTIF}`).then((res)=>{
            const allNotifications = res.data;
            let filteredNotifications = [];

            allNotifications.forEach((notif) => {
                // If the sender of the notification is the current user, skip this iteration
                if (notif?.sender === currentUser?.id) {
                    console.log("sender is currentUser",currentUser?.id)
                    return;
                }

                if (notif?.notificationType === 'message') {
                    console.log("message",notif?.link)
                    if (currentUser?.role === 'Teacher') {
                        axios.get(`${baseURL}/${SESSION}/${notif?.link}`, config)
                            .then((res) => {
                                console.log("session teacher",res.data)
                                if (res.data?.teacher?.id === currentUser?.id) {
                                    filteredNotifications.push(notif);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else if (currentUser?.role === 'Student') {
                        axios.get(`${baseURL}/${STUDENTSFROMSESSION}/${notif.link}`, config)
                            .then((res) => {
                                console.log("session students",res.data)
                                console.log("current user",currentUser?.id)
                                if (res.data.map((student) => student?.id).includes(currentUser?.id)) {
                                    filteredNotifications.push(notif);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                } else if (notif.notificationType === 'content') {
                    axios.get(`${baseURL}/${STUDENTSFROMSESSION}/${notif.link}`, config)
                        .then((res) => {
                            if (res.data.map((student) => student?.id).includes(currentUser?.id)) {
                                filteredNotifications.push(notif);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });

            setNotifications(filteredNotifications);
        }).catch((err)=>{
            console.log(err);
        })
    }, [currentUser]);

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

    const notifyListener = async (notif) => {
        console.log("notifyListener",notif)
        if(notif?.notificationType === 'message') {
            if(currentUser?.role === 'Teacher'){
                axios.get(`${baseURL}/${SESSION}/${notif?.link}`,config).then((res)=>{
                    console.log("session teacher",res.data)
                    if(res.data?.teacher.id === currentUser?.id){
                        setNewNotificationsandCount(notif);
                }
                }).catch((err)=>{
                    console.log(err);
                })

            } else if (currentUser?.role === 'Student'){
                axios.get(`${baseURL}/${STUDENTSFROMSESSION}/${notif?.link}`,config).then((res)=>{
                    console.log("session students",res.data)
                    if(res.data?.map((student)=>student.id).includes(currentUser?.id)){
                        setNewNotificationsandCount(notif);
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }

    const setNewNotificationsandCount = (notif) => {
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
        const receiver = currentUser?.id;
        const sseUrl = `http://localhost:5000/new-notification/events-for-user?receiver=${receiver}`;
        const eventSource = new EventSource(sseUrl, {
            withCredentials: true,
        });

        eventSource.addEventListener('message', (event) => {
            const notification = JSON.parse(event.data);
            setNewNotificationsandCount(notification);
        });

        eventSource.addEventListener('error', (event) => {
            console.error('SSE error:', event);
            if (event.readyState === EventSource.CLOSED) {
                console.log('EventSource connection closed');
            }
        });

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
                                    setIsVisible={setIsVisible}
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
