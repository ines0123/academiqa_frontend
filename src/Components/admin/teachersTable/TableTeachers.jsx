// TableTeachers.js
import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    UncontrolledDropdown
} from 'reactstrap';
import './TableTeachers.css';
import axios from "axios";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";
import {FaChalkboardTeacher, FaEye} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../Common/PopUp/PopUp.jsx";
import { LuImagePlus } from "react-icons/lu";

const TableTeachers = () => {
    const [teachers, setTeachers] = useState([
        { id: 1, name: 'John Doe', department: 'Computer Science', subject: 'Web Development' },
        { id: 2, name: 'Jane Smith', department: 'Mathematics', subject: 'Algebra' },
        { id: 3, name: 'David Johnson', department: 'Physics', subject: 'Quantum Mechanics' },
        { id: 4, name: 'Sarah Brown', department: 'Chemistry', subject: 'Organic Chemistry' },
        { id: 5, name: 'Michael Davis', department: 'Biology', subject: 'Genetics' },
        { id: 6, name: 'John Doe', department: 'Computer Science', subject: 'Web Development' },
        { id: 7, name: 'Jane Smith', department: 'Mathematics', subject: 'Algebra' },
        { id: 8, name: 'David Johnson', department: 'Physics', subject: 'Quantum Mechanics' },
        { id: 9, name: 'Sarah Brown', department: 'Chemistry', subject: 'Organic Chemistry' },
        { id: 10, name: 'Michael Davis', department: 'Biology', subject: 'Genetics' },
        { id: 11, name: 'John Doe', department: 'Computer Science', subject: 'Web Development' },
        { id: 12, name: 'Jane Smith', department: 'Mathematics', subject: 'Algebra' },
        { id: 13, name: 'David Johnson', department: 'Physics', subject: 'Quantum Mechanics' },
        { id: 14, name: 'Sarah Brown', department: 'Chemistry', subject: 'Organic Chemistry' },
        { id: 15, name: 'Michael Davis', department: 'Biology', subject: 'Genetics' },
        { id: 16, name: 'John Doe', department: 'Computer Science', subject: 'Web Development' },
        { id: 17, name: 'Jane Smith', department: 'Mathematics', subject: 'Algebra' },
        { id: 18, name: 'David Johnson', department: 'Physics', subject: 'Quantum Mechanics' },
        { id: 19, name: 'Sarah Brown', department: 'Chemistry', subject: 'Organic Chemistry' },
        { id: 20, name: 'Michael Davis', department: 'Biology', subject: 'Genetics' },
        { id: 21, name: 'John Doe', department: 'Computer Science', subject: 'Web Development' },
        { id: 22, name: 'Jane Smith', department: 'Mathematics', subject: 'Algebra' },
    ]);
    const [isHovered, setIsHovered] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: null,
        speciality: "",
    });
    const [updateFormData, setUpdateFormData] = useState({
        username: "",
        email: "",
        speciality: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleUpdateInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateFormData({ ...updateFormData, [name]: value });
    }
    const [done, setDone] = useState(false);
    const [isOpen, setIsOpen] =useState(false);
    // const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [teacherModalOpen, setTeacherModalOpen] = useState({});

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(file)
        //read csv file
        formData.append('file', file);
        axios.post('http://localhost:5000/file-upload/upload', formData, config).then(r => {
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    }
    const handleFileCLick = () => {
        document.getElementById('csv-upload').click();
    }
    const handleImageClick = () => {
            document.getElementById('teacher-image').click();
    }
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDone(true);
    }
    const handleSubmitTeacher = (e) => {
        e.preventDefault();
        console.log(updateFormData)
        setUpdateFormData({
            username: "",
            email: "",
            speciality: "",
        });
        // axios.post('http://localhost:5000/teachers', formData, config).then(r => {
        //     console.log(r)
        //     getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCancel = () => {
        setFormData({
            username: "",
            email: "",
            password: "",
            image: null,
            speciality: "",
        })
    };
    const handleUpdateClick = (teacher) => {
        setUpdateFormData({
            username: teacher.name,
            email: teacher.email,
            speciality: teacher.department,
        });
        toggleTeacherModal(teacher.id);
    };
    const toggleModal = () => setIsOpen(!isOpen);

    // const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen);
    const toggleTeacherModal = (teacherId) => {
        setTeacherModalOpen((prevState) => ({
            ...prevState,
            [teacherId]: !prevState[teacherId],
        }));
    };
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Call the API to update the teacher
        // axios.put('http://localhost:5000/teachers/' + teacherId, updateFormData, config).then(r => {
        //     console.log(r)
        //     getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })
        // Reset the form data
        setFormData({
            username: "",
            email: "",
            password: "",
            image: null,
            speciality: "",
        });
    };
const getTeachers = () => {
    // axios.get('http://localhost:5000/teachers').then(r => {
    //     setTeachers(r.data)
    // }).catch(e => {
    //     console.log(e)
    // })
}
    const handleDeleteTeacher = (e) => {
        e.preventDefault();
        // Call the API to delete the teacher
        // axios.delete('http://localhost:5000/teachers/' + teacherId).then(r => {
        //     console.log(r)
        // getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })

    }

    return (
        <Container className="all-teachers" fluid style={{marginTop:'-50px',padding:"0 48px",height:'100%', marginBottom:'30px'}}>
            {/* Table */}
            <Card className="shadow table-teacher">
                <CardHeader className="border-0 bg-white">
                    {/* Filter Dropdowns on Left */}
                    <div className='row pt-3 pb-2'>
                        <h1 className="col-12 d-flex fs-2 fw-bold justify-content-center listEnseignant">List of teachers</h1>

                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-lg-3 col-md-4 col-sm-2 d-flex filter'>
                            <div className="container-input">
                                <input type="text" placeholder="Search" name="text" className="input" value={searchTerm}
                                       onChange={handleSearchChange}/>
                                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
                                    </svg>
                            </div>
                        </div>

                        {/* Add Teacher Button in Center */}
                        <div className="d-flex">
                            <div className="d-flex AddEtudiant justify-content-end   ">
                                <Button onClick={toggleModal} className="addbtn ">
                                    Add teacher
                                </Button>
                            </div>
                            <div className="ms-3 d-flex AddEtudiant justify-content-end multiple-teachers">
                                <Button
                                    onClick={handleFileCLick}
                                    className="addbtn"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {isHovered && !done && (<span style={{fontSize: '14.25px'}}>
                                        Please upload a CSV file
                                    </span>) }
                                    {!isHovered && !done &&(<span> Import teachers data </span>)}
                                    {done && <span> {file.name} </span>}
                                </Button>
                                {done && (
                                    <div className="transform transition-transform duration-300 hover:scale-110  d-flex align-items-center ms-1" onClick={handleSubmit}>
                                        <IoMdCheckmarkCircleOutline fill={"#692E5F"} size={30} className="cursor-pointer"/>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="file"
                                    className="image-prompt"
                                    style={{ display: "none" }}
                                    accept=".csv"
                                    id="csv-upload"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                {/* Table Content */}
                <Table className="align-items-center table-flush" responsive>
                    <thead className="head-table">
                    <tr>
                        <th scope="col">Email address</th>
                        <th scope="col">Name</th>
                        <th scope="col">Speciality</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Display filtered teachers or message if none found */}
                    {filteredTeachers.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>No teacher found.</td>
                        </tr>
                    ) : (
                        filteredTeachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td></td>
                                <td>{teacher.name}</td>
                                <td>{teacher.department}</td>

                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-icon-only text-light"
                                            href="#pablo"
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <FaEllipsisVertical fill={"#606060"}/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" style={{boxShadow:'0px 8px 16px 0px rgba(0,0,0,0.2)',border:'none'}} end>

                                            <DropdownItem
                                                href="/admin/profile"
                                                className="d-flex align-items-center"
                                            >
                                                <FaEye size={20} className="me-1"/>
                                                View profile
                                            </DropdownItem>

                                            <DropdownItem
                                                href=""
                                                onClick={() => handleUpdateClick(teacher)}
                                                className="d-flex align-items-center"
                                            >
                                                <FontAwesomeIcon icon={faPen} className="me-2" />
                                                Update
                                            </DropdownItem>

                                            {/* Update Student Modal */}

                                            <DropdownItem
                                                href=""
                                                onClick={handleDeleteTeacher}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="me-2" />
                                                Delete
                                            </DropdownItem>
                                            <PopUp width={`${screenWidth > 740 ? '35vw' : '60vw'} `}
                                                   isOpen={teacherModalOpen[teacher.id] || false}
                                                   setIsOpen={() => toggleTeacherModal(teacher.id)}
                                                   fromCourse={true}>
                                                <div className="d-flex align-items-center ms-4">
                                                    <FaChalkboardTeacher size={25} className="mb-1 me-2"/>
                                                    <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Update teacher:</p>
                                                </div>
                                                <form onSubmit={handleUpdateSubmit} onReset={handleCancel}
                                                      className="link-form add-new d-flex flex-column align-items-center">
                                                    <input
                                                        type={"text"}
                                                        name="username"
                                                        value={updateFormData.username}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter username"
                                                    />
                                                    <input
                                                        type={"email"}
                                                        name="email"
                                                        value={updateFormData.email}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter email"
                                                    />
                                                    <input
                                                        type={"text"}
                                                        name="speciality"
                                                        value={updateFormData.speciality}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter speciality"
                                                    />
                                                    <div className="end d-flex justify-content-between mt-4"
                                                         style={{width: '70%'}}>
                                                        <button type="submit" className="me-1">
                                                            Update
                                                        </button>
                                                        <button type="reset" className="ms-1">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </PopUp>


                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>

                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </Card>
            {/* Add Teacher Modal */}
            <div className="add-one-teacher-modal">
                <PopUp width={`${screenWidth > 740 ? '35vw':'60vw'} `} isOpen={isOpen} setIsOpen={setIsOpen} fromCourse={true}>
                    <div className="d-flex align-items-center ms-4">
                        <FaChalkboardTeacher  size={25} className="mb-1 me-2"/>
                        <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Add teacher:</p>
                    </div>
                    <form onSubmit={handleSubmitTeacher} onReset={handleCancel} className="link-form add-new d-flex flex-column align-items-center">
                        <input
                            type={"text"}
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                        <input
                            type={"email"}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                        />
                        <input
                            type={"password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                        <input
                            type={"text"}
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleInputChange}
                            placeholder="Enter speciality"
                        />
                        <input type={"file"} name="photo" id="teacher-image" accept="image/*"  onChange={handleImageChange} style={{display:"none"}}/>
                        <div className="d-flex justify-content-start" style={{width:"100%"}} >
                            <Button className="d-flex align-items-center add-photo ms-3" onClick={handleImageClick}>
                                <LuImagePlus size={30}/>
                                <p className="ms-2" > {!formData.image?("Add photo"):formData.image.name} </p>
                            </Button>
                        </div>


                        <div className="end d-flex justify-content-between mt-4" style={{width: '70%'}}>
                                <button type="submit" className="me-1">
                                    Add
                                </button>
                                <button type="reset" className="ms-1">
                                    Cancel
                                </button>
                            </div>
                    </form>
                </PopUp>
            </div>
        </Container>
    );
};

export default TableTeachers;
