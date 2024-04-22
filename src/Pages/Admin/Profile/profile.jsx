import './profile.css';
import Header from "../../../Components/admin/header/header.jsx";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import image from "../../../assets/images/Sellaouti.jpg";
import AbsenceTable from "../../../Components/admin/AbsenceTable/AbsenceTable.jsx";
import TeacherCourses from "../../../Components/admin/TeacherCourses/TeacherCourses.jsx";
import {FaChalkboardUser} from "react-icons/fa6";
const Profile = ({role}) => {
    return (
        <div>
            <Header/>
            <Container className="mt--5" fluid style={{fontSize:"18px", marginTop:'-40px'}}>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow mx-xl-0 mx-5" style={{borderRadius: '20px'}}>
                                    <div className="card-profile-image d-flex justify-content-center">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={image}
                                                style={{width: "150px", height: "150px", marginTop:"-30px"}}
                                            />
                                        </a>
                                    </div>
                            <CardBody className="pt-0 pt-md-4 d-flex flex-column align-items-center">
                                <h1 className="mb-3 fw-bold"> Rim Jbeli</h1>
                                <div style={{width:"fit-content"}}>
                                    <div className="d-flex">
                                        <FaChalkboardUser className="min-w-6 mr-2" size={25}/>
                                        <h3>
                                            <b>Speciality:</b> Mathematiques
                                        </h3>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        {role === 'student' ? <AbsenceTable/> : <TeacherCourses/>}
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default Profile;