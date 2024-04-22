import Header from "../../../Components/admin/header/header.jsx";
import TableStudents from "../../../Components/admin/StudentsTable/TableStudents.jsx";

const CoursesAdmin = () => {
    return (
        <>
            <Header/>
            <div>
                <TableStudents/>
            </div>
        </>
    );
};

export default CoursesAdmin;