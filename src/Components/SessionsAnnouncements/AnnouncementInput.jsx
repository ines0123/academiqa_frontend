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
        <form className="announcement-form" onSubmit={handleSubmit}>
          <div className="box-announcement-container d-flex flex-column">
            <div className="row mt-2.5">
              <div className="col-lg-10 col-md-10 col-sm-10 send-input-announcement mb-1 p-0 d-flex justify-content-center">
              <textarea
                    ref={inputRef}
                  rows="1"
                  placeholder={"Type an announcement ..."}
                  // onChange={onChange}
                  onKeyDown={handleKeyPress}
              />
              </div>

              <div className="col-lg-1 col-md-1 col-sm-1 p-0 justify-content-center">
                <button type="submit" className="send-icon-button">
                  <PiPaperPlaneTiltBold size={23} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
  );
}

export default AnnouncementInput;
