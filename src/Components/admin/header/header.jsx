import React from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import "./header.css";
import { FaPercentage } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const Header = () => {
    return (
        <div className="admin-header p-5 ">
            <Row className="mt-5">
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Students
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">
                          1000
                        </span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape text-white rounded-circle shadow d-flex justify-content-center align-items-center">
                                        <PiStudentBold  size={22} fill ={"white"} />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Teachers
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">256</span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape text-white rounded-circle shadow d-flex justify-content-center align-items-center">
                                        <FaChalkboardTeacher  size={22} fill ={"white"} />
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Classes
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">54</span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape  text-white rounded-circle shadow d-flex justify-content-center align-items-center">
                                        <SiGoogleclassroom size={22} fill ={"white"} />

                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle
                                        tag="h5"
                                        className="text-uppercase fs-6 text-muted mb-0"
                                    >
                                        Average absence
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">49,65%</span>
                                </div>
                                <Col className="col-auto">
                                    <div className="icon icon-shape  text-white rounded-circle shadow d-flex justify-content-center align-items-center">
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