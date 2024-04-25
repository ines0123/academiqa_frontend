import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import "./header.css";
import { FaPercentage } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import axios from "axios";
import MidNavbar from "../../MidNavbar/MidNavbar.jsx";

const Header = () => {
    const [nbStudents, setNbStudents] = useState(0);
    const [nbTeachers, setNbTeachers] = useState(0);
    const [nbClasses, setNbClasses] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:5000/teacher/count').then(
            (response) => {
                setNbTeachers(response.data);
            }).catch((err) => {
                console.log(err);
            }
        )
        axios.get('http://localhost:5000/student/count').then(
            (response) => {
                setNbStudents(response.data);
            }).catch((err) => {
                console.log(err);
            }
        )
        axios.get('http://localhost:5000/group/count').then(
            (response) => {
                setNbClasses(response.data);
            }).catch((err) => {
                console.log(err);
            }
        )

    }, []);

    return (
        <div className="admin-header p-5">
            <MidNavbar role={"admin"}/>
            <Row className="mt-5">
                <Col sm="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col-8 px-2">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Students
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                          {nbStudents}
                        </span>
                                </div>
                                <Col className="col-4 p-0 position-relative">
                                    <div className="icon icon-shape text-white mr-2 rounded-circle shadow d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y">
                                        <PiStudentBold  size={22} fill ={"white"} />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col-8 px-2">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Teachers
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">{nbTeachers}</span>
                                </div>
                                <Col className="col-4 p-0 position-relative">
                                    <div className="icon icon-shape text-white mr-2 rounded-circle shadow d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y">
                                        <FaChalkboardTeacher  size={22} fill ={"white"} />
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col-8 px-2">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Classes
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">{nbClasses}</span>
                                </div>
                                <Col className="col-4 p-0">
                                    <div className="icon icon-shape  text-white mr-2 rounded-circle shadow d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y">
                                        <SiGoogleclassroom size={22} fill ={"white"} />

                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6" xl="3" className="pe-0">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col-8 px-2">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Average absence
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">49%</span>
                                </div>
                                <Col className="col-4 p-0">
                                    <div className="icon icon-shape  text-white mr-2 rounded-circle shadow d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y">
                                        <FaPercentage size={22} fill ={"white"}/>
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Header;