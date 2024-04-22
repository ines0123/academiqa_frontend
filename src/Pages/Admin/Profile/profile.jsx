import './profile.css';
import Header from "../../../Components/admin/header/header.jsx";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import image from "../../../assets/images/Sellaouti.jpg";
import AbsenceTable from "../../../Components/admin/AbsenceTable/AbsenceTable.jsx";
import TeacherCourses from "../../../Components/admin/TeacherCourses/TeacherCourses.jsx";
import {FaChalkboardUser} from "react-icons/fa6";
import {LiaIdCard} from "react-icons/lia";
import {TbSchool} from "react-icons/tb";
import * as PropTypes from "prop-types";
import {MdAutoGraph, MdGroups} from "react-icons/md";

function MdAutoGra(props) {
    return null;
}

MdAutoGra.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string
};
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
                                {role === "teacher" ?(<div style={{width: "fit-content"}}>
                                    <div className="d-flex">
                                        <FaChalkboardUser className="min-w-6 mr-2" size={25}/>
                                        <h3>
                                            <b>Speciality:</b> Mathematiques
                                        </h3>
                                    </div>
                                </div>):
                               (<div className="d-flex flex-column justify-content-start">
                                   <div className="mt-1" style={{width: "fit-content"}}>
                                       <div className="d-flex">
                                           <LiaIdCard className="min-w-6 mr-2" size={25}/>
                                           <h3>
                                               <b>Enrollment number:</b> 12345
                                           </h3>
                                       </div>
                                   </div>
                                   <div className="mt-2"  style={{width: "fit-content"}}>
                                       <div className="d-flex">
                                           <TbSchool className="min-w-6 mr-2" size={25}/>
                                           <h3>
                                               <b>Sector:</b> GL
                                           </h3>
                                       </div>
                                   </div>
                                   <div className="mt-2" style={{width: "fit-content"}}>
                                       <div className="d-flex">
                                           <MdAutoGraph className="min-w-6 mr-2" size={25}/>
                                           <h3>
                                               <b>Level:</b> 3
                                           </h3>
                                       </div>
                                   </div>
                                   <div className="mt-2" style={{width: "fit-content"}}>
                                       <div className="d-flex">
                                           <MdGroups className="min-w-6 mr-2" size={25}/>
                                           <h3>
                                               <b>Group 1:</b> 1
                                           </h3>
                                       </div>
                                   </div>


                               </div>)}
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