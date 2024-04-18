import React, {useState} from "react";
import "./SessionsAnnouncement.css";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import AnnouncementMessage from "./AnnouncementMessage";
import AnnouncementInput from "./AnnouncementInput";
import noAnnouncement from "../../assets/images/noAnnouncement.svg";

function SessionsAnnouncement({role}) {
    // Define initial state for announcements
    const [announcements, setAnnouncements] = useState([
        {
            teacher: "Ayşe Özdemir",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "31 March 2024, Wednesday",
        },
        {
            teacher: "Ayşe Özdemir",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua",
            date: "30 March 2024, Wednesday",
        },
        {
            teacher: "Ayşe Özdemir",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem I",
            date: "27 March 2024, Wednesday",
        },
    ]);


    // State for tracking the input value
    const [newAnnouncement, setNewAnnouncement] = useState("");

    // Function to handle onChange event of the input field
    const handleInputChange = (event) => {
      setNewAnnouncement(event.target.value);
    };

    // Function to add a new announcement
    const addAnnouncement = () => {
      if (newAnnouncement.trim() !== "") {
        const updatedAnnouncements = [
          {
            teacher: "New Teacher",
            description: newAnnouncement,
            date: new Date().toLocaleDateString(),
          },
          ...announcements
        ];
        setAnnouncements(updatedAnnouncements);
      }
    };


    return (

        <div className="sessionsAnnouncement-box ">

            <div className="sessionsAnnouncement-title font-IstokWebBold">
                Announcements
            </div>
            <div className="sessionsAnnouncement-content pt-0 position-relative">
                <Scrollbar
                    trackColor={"#DBDBDBFF"}
                    thumbColor={"#B5B5B5FF"}
                    maxHeight={"300px"}
                >
                    {announcements.length === 0 && (
                        <div className="no-announcement e-auto-fit-content position-absolute top-50 start-50 translate-middle">
                            <img src={noAnnouncement} alt="No Sessions"/>
                        </div>
                    )}

                    {announcements.map((announcement, index) => (
                        <AnnouncementMessage key={index} Announcement={announcement}/>
                    ))}
                </Scrollbar>
            </div>

            {(role === "teacher") &&
                <AnnouncementInput
                    onChange={handleInputChange}
                    onAdd={addAnnouncement}
                />}
        </div>
)
    ;
}

export default SessionsAnnouncement;
