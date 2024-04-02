import {useState} from 'react';
import './Course.css';
import Sellaouti from "../../assets/images/Sellaouti.jpg";

// eslint-disable-next-line react/prop-types
const Course = ({color,placement}) => {
    const [type,setType] = useState(placement);
    return (
            <div className="card p-4 pb-3 pt-2" style={{background: `${color}`}}>
                <div className="card-content d-flex flex-column justify-content-between">
                    <div className="card-top">
                        <h3 className="card-title m-0 fw-bold fs-3">Co Design des</h3>
                        {type === 'course' ? (<h6 className="m-0 font-bold" >GL3</h6>): null}
                    </div>
                    <div className="card-bottom d-flex justify-content-between align-items-center">
                        <h6 className="prof ps-1 font-semibold mt-2">Emir Damergi</h6>
                        <img
                            className="rounded-circle img"
                            src={Sellaouti}
                            alt="Chatbot"
                            width={75}
                            height={75}
                            style={{width: '70px', height: '70px'}}
                        />
                    </div>
                    {type === 'absence' ? (<h5 className="m-0 font-semibold text-center fs-5" >Absence: 2</h5>): null}
                </div>
            </div>
    );
};

export default Course;