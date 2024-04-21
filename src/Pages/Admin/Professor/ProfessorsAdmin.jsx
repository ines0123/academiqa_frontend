import React from 'react';
import Header from "../../../Components/admin/header/header.jsx";
import TableTeachers from "../../../Components/admin/teachersTable/TableTeachers.jsx";

const ProfessorsAdmin = () => {
    return (
        <>
            <Header/>
            <div>
                <TableTeachers/>
            </div>
        </>
    );
};

export default ProfessorsAdmin;