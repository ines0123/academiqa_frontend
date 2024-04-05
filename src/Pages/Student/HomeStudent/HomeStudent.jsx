import Navbar from "../../../Components/Navbar/Navbar.jsx";
import React, {useEffect, useState} from "react";
import './HomeStudent.css';
export default function HomeStudent() {
    const[date, setDate] = useState();
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(today.toLocaleDateString('en-US', options));
    }, []);
    return (
        <div className="d-flex justify-content-between container student-home-page m-0">
            <div className="body mt-3">
                <div className="row px-3 d-flex justify-content-between">
                    <div className={`custom-col-1 p-0`} id="firstColumn">
                        <div className="Welcoming d-flex flex-column p-3">
                            <h5 className="fs-5 ms-2 fw-bold">Welcome back, Rym!</h5>
                            <p className="fs-6 ms-2">Hope you're ready for another awesome day with us!</p>
                        </div>
                    </div>
                    <div className="date custom-col-2 text-end" id="secondColumn">
                        {date}
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}