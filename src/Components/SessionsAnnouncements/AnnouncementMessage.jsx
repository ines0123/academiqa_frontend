import "./AnnouncementMessage.css";
import { FaScroll } from "react-icons/fa";

function AnnouncementMessage({ Announcement }) {
  return (
    <div className="announcement-item container">
      <div className="announcement-icon">
          <FaScroll size={33}/>
      </div>
      <div className="announcement-element">
            <div className="announcement-teacher  font-IstokWebBold">
                {Announcement.teacher.username}
            </div>
          <div className="announcement-date font-IstokWebRegular">
              {Announcement.createdAt}
          </div>
          <div className="announcement-description font-IstokWebRegular">
              {Announcement.content}
          </div>
      </div>
    </div>
  );
}

export default AnnouncementMessage;
