import "./AnnouncementInput.css";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
function AnnouncementInput() {
  return (
    <>
      <form className="prompt-form">
        <div className="box-container d-flex flex-column">
          <div className="row mt-2.5">
            <div className="col-lg-10 col-md-10 col-sm-10 send-input-chatbot mb-1 p-0 d-flex justify-content-center">
              <textarea
                rows="1"
                placeholder={"Type an announcement ..."}
              />
            </div>

            <div className="col-lg-1 col-md-1 col-sm-1 p-0 justify-content-center">
              <button type="submit" className="sendIconButton">
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
