import React from 'react';
import Header from "../../../Components/admin/header/header.jsx";
import TableStudents from "../../../Components/admin/StudentsTable/TableStudents.jsx";

const StudentsAdmin = () => {
    return (
        <>
            <Header/>
            <div>
                <TableStudents/>
            </div>
        </>
    );
};

export default StudentsAdmin;