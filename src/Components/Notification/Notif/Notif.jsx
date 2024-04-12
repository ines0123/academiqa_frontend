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
    const colors = ['#fdcdc9', '#f2f9f0', '#f5faf9', '#fbf2ef','#fbf4ea'];
    return (
        <div className="notif d-flex align-items-center" style={{backgroundColor: colors[notificationTypes[notification?.type]]}}>
            <div className="img" style={{ flex: 'none' }}>
                <img
                    style={{ width: '100%', height: 'auto' }}
                    // src={`http://localhost:5000/${notification?.senderImage}`}
                    className={`img ${notification?.senderImage === "administration.svg" ? "" : "rounded-circle"}`}
                    alt={notification?.senderImage}
                    src="https://drive.google.com/thumbnail?id=1JFyGAYpVXYS_5R9QyBpkeXjQj098rWOo"
                />
            </div>
            <div className="notification-content ms-3">
                <Markdown>
                    {notification.content}
                </Markdown>
            </div>

        </div>
    );
};

export default Notif;