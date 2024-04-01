import "./CourseName.css";
import { FaBookOpen } from "react-icons/fa";
import teacherPhoto from "../../assets/images/teacher-photo.svg";

function CourseName({role}) {
  return (
    <div className="course-name-box">
      <div>
        <FaBookOpen className="course-icon" />
      </div>
        <div className="course-info font-IstokWebBold">
            <div className="course-name-title font-IstokWebBold">
                Protocoles de communication Web
            </div>
            <div className="course-additional-info font-IstokWebBold">
                {role === "teacher" ? "GL3" : "Aymen Sellaouti"}
            </div>
        </div>
        { role === "student" &&
        <div className="course-teacher-photo">
            <img src={teacherPhoto} alt="teacher" />
        </div>
        }
    </div>
  );
}

export default CourseName;
