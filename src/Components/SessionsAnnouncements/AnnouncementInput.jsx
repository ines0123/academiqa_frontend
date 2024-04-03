import React, {useRef} from 'react';
import "./AnnouncementInput.css";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

function AnnouncementInput({ onChange, onAdd }) {
    const inputRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    // onAdd(); // Call the onAdd function passed from the parent component
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
                  // onChange={onChange}
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
