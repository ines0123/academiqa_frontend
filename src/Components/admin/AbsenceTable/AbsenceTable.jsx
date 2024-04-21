import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    Table,
    Container,
} from "reactstrap";
import {faCheck, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TableAbsence = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Analyse', module: 'Mathématique', numberOfAbsence: '3' },
        { id: 2, name: 'Programmation', module: 'Informatique', numberOfAbsence: '3' },
        { id: 3, name: 'Réseau', module: 'Réseau', numberOfAbsence: '3' },
        { id: 4, name: 'Base de données', module: 'Informatique', numberOfAbsence: '3' },
    ]);
    const [editingId, setEditingId] = useState(null);
    const [tempAbsence, setTempAbsence] = useState('');

    const handleEditClick = (id, numberOfAbsence) => {
        setEditingId(id);
        setTempAbsence(numberOfAbsence);
    };

    const handleCheckClick = (id) => {
        setCourses(courses.map(course => course.id === id ? {...course, numberOfAbsence: tempAbsence} : course));
        setEditingId(null);
        setTempAbsence('');
    };
    return (
        <Container className="all-teachers" fluid style={{padding:"0 48px",height:'100%', marginBottom:'30px'}}>
            <Card className="shadow table-teacher">
                <CardHeader className="border-0 bg-white">
                    <div className='row pt-3 pb-2'>
                        <h1 className="col-12 d-flex fs-2 fw-bold justify-content-center listEnseignant">List of courses</h1>
                    </div>
                </CardHeader>
                {/* Table Content */}
                <Table className="align-items-center table-flush" responsive>
                    <thead className="head-table">
                    <tr>
                        <th scope="col">Course</th>
                        <th scope="col">Module</th>
                        <th scope="col">Number of absence</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.module}</td>
                                <td>
                                    <div className="d-flex justify-content-between" style={{width: '50%'}}>
                                        {editingId === course.id ? (
                                            <>
                                                <input style={{width:"90%", marginRight:"10px"}} type="number" value={tempAbsence}
                                                       onChange={(e) => setTempAbsence(e.target.value)}/>
                                                <FontAwesomeIcon icon={faCheck}
                                                                 onClick={() => handleCheckClick(course.id)}/>
                                            </>
                                        ) : (
                                            <>
                                                <span>{course.numberOfAbsence}</span>
                                                <FontAwesomeIcon icon={faPen}
                                                                 onClick={() => handleEditClick(course.id, course.numberOfAbsence)}/>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default TableAbsence;
