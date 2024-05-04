import "./CourseName.css";
import { FaBookOpenReader } from "react-icons/fa6";
import teacherPhoto from "../../assets/images/teacher-photo.svg";

function CourseName({role, course}) {
  return (
    <div className="course-name-box">
      <div>
        <FaBookOpenReader className="course-icon" />
      </div>
        <div className="course-info font-IstokWebBold">
            <div className="course-name-title font-IstokWebBold overflow-hidden"
                 title="Protocoles de communication Web"
            >
                {course?.name}
            </div>
            <div className="course-additional-info font-IstokWebBold">
                {role === "teacher" ? course?.sectorLevel : course?.teacher}
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
