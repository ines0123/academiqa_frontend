import "./Profile.css";
import React, {useContext, useEffect, useState} from "react";
import studentImage from "../../assets/images/student-photo.svg";
import {LiaIdCard} from "react-icons/lia";
import {TbSchool} from "react-icons/tb";
import {MdAutoGraph} from "react-icons/md";
import {MdGroups} from "react-icons/md";
import {GoPencil} from "react-icons/go";
import {FaChalkboardUser} from "react-icons/fa6";
import {TbPhotoEdit} from "react-icons/tb";
import {FaUser} from "react-icons/fa";
import {CurrentUser} from "../../Context/CurrentUserContext.jsx";
import axios from "axios";
import Cookie from "cookie-universal";

const Profile = () => {
    // use useState
    const {currentUser,user} = useContext(CurrentUser);

    return (<div className="profile-box flex flex-col justify-center p-4 pt-2 rounded-2xl sm:px-12 md:w-72 lg:w-96">
            <div className={`profile-teacher d-flex mt-4  p-2 px-3 ms-md-3 ms-sm-0 ${ currentUser.role==="Teacher" ? 'mb-5':'mb-2'}`}>
                <div className="courses-icon pt-1">
                    <FaUser size={30}/>
                </div>
                <h1 className="ms-2 fw-bold">Profile</h1>
            </div>
            <div className="flex mx-auto mt-3">
                <img
                    src={studentImage}
                    alt="photo"
                    className="w-32 h-32 rounded-full"
                />
                <button className="edit-photo-button relative">
                    <TbPhotoEdit className="min-h-6 min-w-6 absolute bottom-0.5"/>
                </button>
            </div>
            <div className=" text-center container pt-2">

                <div className="profile-name text-xl font-bold sm:text-2xl">{currentUser?.username}</div>

                {currentUser.role === "Student" && (<div className="text-left ">
                    <div
                        className="profile-enrolment flex items-center w-full pb-2 rounded-3xl pl-4 pt-2 mt-4 text-sm">
                        <LiaIdCard className="min-w-6 mr-2" size={25}/>
                        <div>
                            <span className="font-bold">Enrolment Number :</span>{" "}
                            {user?.enrollmentNumber}
                        </div>
                    </div>
                    <div className="profile-info w-full pb-2.5 rounded-3xl pl-4 pr-0.5 pt-2.5 mt-4 text-sm">
                        <div className="flex items-center m-1">
                            <TbSchool className="min-w-6 mr-2" size={25}/>
                            <div>
                                <span className="font-bold">Sector :</span> {user?.group?.sector}
                            </div>
                        </div>
                        <div className="flex items-center m-1">
                            <MdAutoGraph className="min-w-6 mr-2" size={25}/>
                            <div>
                                <span className="font-bold">Level :</span> {user?.group?.level}
                            </div>
                        </div>
                        <div className="flex items-center m-1">
                            <MdGroups className="min-w-6 mr-2" size={25}/>
                            <div>
                                <span className="font-bold">Group :</span> {user?.group?.group}
                            </div>
                        </div>
                    </div>
                </div>)}

                {currentUser.role === "Teacher" && (<div className="text-left">
                    <div className="profile-info w-full pb-2.5 rounded-3xl pl-4 pt-2.5 pr-2 mt-4 text-sm">
                        <div className="flex items-center">
                            <FaChalkboardUser className="min-w-6 mr-2" size={25}/>
                            <div>
                                <span className="font-bold">Speciality :</span>{" "}
                                {currentUser?.speciality}
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <button
                    className="profile-cp flex items-center justify-between w-full h-10 rounded-3xl p-2 my-4 text-sm">
                    <div className="pl-3 font-bold">Change Password</div>
                    <GoPencil className="min-w-6 mr-1" size={25}/>
                </button>
            </div>

        </div>

    );
};

export default Profile;
