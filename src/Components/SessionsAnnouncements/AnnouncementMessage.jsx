import "./AnnouncementMessage.css";
import { FaScroll } from "react-icons/fa";

function AnnouncementMessage({ Announcement }) {
  return (
    <div className="announcement-item">
      <div className="announcement-icon">
          <FaScroll size={33}/>
      </div>
      <div className="announcement-element">
          <div className="announcement-date font-IstokWebRegular">
              {Announcement.date}
          </div>
          <div className="announcement-description font-IstokWebRegular">
              {Announcement.description}
          </div>
      </div>
    </div>
  );
}

export default AnnouncementMessage;
