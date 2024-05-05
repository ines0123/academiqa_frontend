import React, {useRef, useState} from 'react';
import "./AnnouncementInput.css";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

function AnnouncementInput() {
    const inputRef = useRef(null);
    const [newAnnouncement, setNewAnnouncement] = useState("");

    const handleInputChange = (event) => {
        setNewAnnouncement(event.target.value);
    };

    // Function to add a new announcement
    const addAnnouncement = () => {
        if (newAnnouncement.trim() !== "") {
            // You can implement the logic to add a new announcement here
        }
    };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    addAnnouncement(); // Call the onAdd function passed from the parent component
    inputRef.current.value = "";
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
      }
  };


  return (
      <>
        <form className="announcement-form container mb-1.5" onSubmit={handleSubmit}>

              <div className="col-10 send-input-announcement mb-1 ">
              <textarea
                    className=" pt-3"
                    ref={inputRef}
                  rows="1"
                  placeholder={"Type an announcement ..."}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
              />
              </div>
                <button type="submit" className="send-icon-button w-7 ">
                  <PiPaperPlaneTiltBold size={23} />
                </button>

        </form>
      </>
  );
}

export default AnnouncementInput;
