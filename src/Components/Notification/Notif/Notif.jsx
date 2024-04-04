import Administration from '../../../assets/images/administration.svg'
import './Notif.css';
import Markdown from "react-markdown";
import {useState} from "react";
// eslint-disable-next-line react/prop-types
const Notif = ({notification}) => {
    const [senderImage, setSenderImage] = useState('');
    const notificationTypes = {
        "absence-limit": 0,
        "content": 1,
        "message": 2,
        "absent": 3,
        "new-announcement": 4,
    };
    //yellow => new announcement red => admin Absences Limits, green => content added,blue => new msg, pink => marked absent
    const colors = ['#FA8F88', '#EBF5E9', '#F2F9F9', '#F9E9E6','#F9EFE2'];
    return (
        <div className="notif d-flex align-items-center" style={{backgroundColor: colors[notificationTypes[notification?.type]]}}>
            <img
                className={`img ${notification?.senderImage === "administration.svg" ? "" : "rounded-circle"}`}
                src={`http://localhost:5000/${notification?.senderImage}`}
                alt={notification?.senderImage}
            />
            <div className="notification-content ms-3">
                <Markdown>
                    {notification.content}
                </Markdown>
            </div>

        </div>
    );
};

export default Notif;