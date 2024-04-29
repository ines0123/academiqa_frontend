import React, {useState} from 'react';
import './PresenceSheet.css';
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";

const PresenceSheet = () => {

    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'mohamed abdelhmid mansour ben ghorbel',
            status: 'present'
        },
        {
            id: 2,
            name: 'Ines Samet',
            status: 'absent'
        },
        {
            id: 3,
            name: 'Rim Jbeli',
            status: 'present'
        },
        {
            id: 4,
            name: 'Sara Drine',
            status: 'absent'
        },
        {
            id: 5,
            name: 'Rym Samet',
            status: 'present'
        },
        {
            id: 6,
            name: 'Jane Doe',
            status: 'absent'
        },
        {
            id: 7,
            name: 'Jane Doe Jane Doe Jane Doe',
            status: 'absent'
        },
        {
            id: 1,
            name: 'mohamed abdelhmid mansour ben ghorbel',
            status: 'present'
        },
        {
            id: 2,
            name: 'Ines Samet',
            status: 'absent'
        },
        {
            id: 3,
            name: 'Rim Jbeli',
            status: 'present'
        },
        {
            id: 4,
            name: 'Sara Drine',
            status: 'absent'
        },
        {
            id: 5,
            name: 'Rym Samet',
            status: 'present'
        },
        {
            id: 6,
            name: 'Jane Doe',
            status: 'absent'
        },
        {
            id: 7,
            name: 'Jane Doe Jane Doe Jane Doe',
            status: 'absent'
        }, {
            id: 1,
            name: 'mohamed abdelhmid mansour ben ghorbel',
            status: 'present'
        },
        {
            id: 2,
            name: 'Ines Samet',
            status: 'absent'
        },
        {
            id: 3,
            name: 'Rim Jbeli',
            status: 'present'
        },
        {
            id: 4,
            name: 'Sara Drine',
            status: 'absent'
        },
        {
            id: 5,
            name: 'Rym Samet',
            status: 'present'
        },
        {
            id: 6,
            name: 'Jane Doe',
            status: 'absent'
        },
        {
            id: 7,
            name: 'Jane Doe Jane Doe Jane Doe',
            status: 'absent'
        },
    ]);

    return (
        <div className="presence-sheet-box h-[535px] shadow position-relative">
            <div className="p-s-title h-10 font-IstokWebRegular font-bold p-3 ml-3.5  text-2xl ">
                Presence Sheet
            </div>
            <div className="p-s-content h-fit pt-3 mx-4">
                <Scrollbar
                    trackColor="#DBDBDBFF"
                    thumbColor="#B5B5B5FF"
                    maxHeight="380px"
                >
                    {students.map((student, index) => (
                        <div key={index} className="p-s-student flex pl-1.5 pr-2.5">
                            <span className="p-s-student-name font-IstokWebRegular">{student.name}</span>
                        </div>
                    ))}
                </Scrollbar>
            </div>
            <button
                className="p-s-btn rounded-2xl h-11 max-w-48 w-full my-3 position-absolute bottom-0 start-50 translate-middle-x">
                <span className="font-bold">Take attendance</span>
            </button>
        </div>
    );
};

export default PresenceSheet;