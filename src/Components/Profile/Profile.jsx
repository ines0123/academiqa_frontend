import "./Profile.css";
import { useState } from "react";
import studentImage from "../../assets/images/student-photo.svg";
import { LiaIdCard } from "react-icons/lia";
import { TbSchool } from "react-icons/tb";
import { MdAutoGraph } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { FaChalkboardUser } from "react-icons/fa6";

const Profile = ({role}) => {
  // use useState
  const [student] = useState({
    name: "Rym Samet",
    Enrollement: "123456",
    sector: "Informatique Industrielle et Automatique",
    level: "3ème Année",
    group: "1",
  });

  const [teacher] = useState({
    name: "Jane Doe",
    speciality: "Mathematics Teacher, Data Science ",
  });

  return (
      <div className="profile-box flex flex-col justify-center p-4 rounded-2xl sm:px-12 md:w-72 lg:w-96">
        <img
            src={studentImage}
            alt=""
            className="w-32 h-32 mx-auto rounded-full"
        />
        <div className=" text-center container pt-2">

            <div className="profile-name text-xl font-bold sm:text-2xl">{teacher.name}</div>

            {role === "student" && (
                <div className="text-left ">
                  <div className="profile-enrolment flex items-center w-full pb-2 rounded-3xl pl-4 pt-2 mt-4 text-sm">
                    <LiaIdCard className="min-w-6 mr-2" size={25} />
                    <div>
                      <span className="font-bold">Enrolment Number :</span>{" "}
                      {student.Enrollement}
                    </div>
                  </div>
                  <div className="profile-info w-full pb-2.5 rounded-3xl pl-4 pr-0.5 pt-2.5 mt-4 text-sm">
                    <div className="flex items-center m-1">
                      <TbSchool className="min-w-6 mr-2" size={25} />
                      <div>
                        <span className="font-bold">Sector :</span> {student.sector}
                      </div>
                    </div>
                    <div className="flex items-center m-1">
                      <MdAutoGraph className="min-w-6 mr-2" size={25} />
                      <div>
                        <span className="font-bold">Level :</span> {student.level}
                      </div>
                    </div>
                    <div className="flex items-center m-1">
                      <MdGroups className="min-w-6 mr-2" size={25} />
                      <div>
                        <span className="font-bold">Group :</span> {student.group}
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {role === "teacher" && (
                <div className="text-left">
                  <div className="profile-info w-full pb-2.5 rounded-3xl pl-4 pt-2.5 pr-2 mt-4 text-sm">
                    <div className="flex items-center">
                      <FaChalkboardUser className="min-w-6 mr-2" size={25} />
                      <div>
                        <span className="font-bold">Speciality :</span>{" "}
                        {teacher.speciality}
                      </div>
                    </div>
                  </div>
                </div>
            )}
            <button className="profile-cp flex items-center justify-between w-full h-10 rounded-3xl p-2 my-4 text-sm">
              <div className="pl-3 font-bold">Change Password</div>
              <GoPencil className="min-w-6 mr-1" size={25} />
            </button>
          </div>

      </div>

  );
};

export default Profile;
