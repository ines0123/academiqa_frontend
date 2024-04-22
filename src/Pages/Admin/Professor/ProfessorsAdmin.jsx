import Header from "../../../Components/admin/header/header.jsx";
import TableTeachers from "../../../Components/admin/teachersTable/TableTeachers.jsx";

const ProfessorsAdmin = () => {
    return (
        <>
            <Header/>
            <div>
                <TableTeachers role={"teacher"}/>
            </div>
        </>
    );
};

export default ProfessorsAdmin;