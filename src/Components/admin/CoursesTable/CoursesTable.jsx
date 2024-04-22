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
import axios from "axios";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";
import {FaChalkboardTeacher, FaEye} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../Common/PopUp/PopUp.jsx";
import {number} from "prop-types";
import Select from "react-select";

const TableCourses = () => {
    const [courses, setCourses] = useState([
        {
            "module": "Informatique",
            "subjects": [
                {
                    "createdAt": "2024-04-19T01:09:54.037Z",
                    "updatedAt": "2024-04-19T01:09:54.037Z",
                    "deletedAt": null,
                    "id": 1,
                    "name": "Algorithmique",
                    "sectorLevel": "GL2",
                    "coefficient": 1.5,
                    "hourlyLoad": 4,
                    "absenceLimit": 4
                },
                {
                    "createdAt": "2024-04-19T01:09:54.057Z",
                    "updatedAt": "2024-04-19T12:48:45.957Z",
                    "deletedAt": null,
                    "id": 12,
                    "name": "Analyse de Données",
                    "sectorLevel": "GL3",
                    "coefficient": 1.3,
                    "hourlyLoad": 4,
                    "absenceLimit": 4
                },
                {
                    "createdAt": "2024-04-19T01:09:54.059Z",
                    "updatedAt": "2024-04-19T01:09:54.059Z",
                    "deletedAt": null,
                    "id": 17,
                    "name": "Cryptographie",
                    "sectorLevel": "GL5",
                    "coefficient": 1.3,
                    "hourlyLoad": 5,
                    "absenceLimit": 4
                }
            ]
        }])

    const [isHovered, setIsHovered] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        sectorLevel: "",
        module: "",
        coefficient: 0.0,
        hourlyLoad: 0,
        absenceLimit: 0,
    });
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        sectorLevel: "",
        module: "",
        coefficient: 0.0,
        hourlyLoad: 0,
        absenceLimit: 0,
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if(name === "coefficient"){
            setFormData({ ...formData, [name]: parseFloat(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }

    };
    const handleUpdateInputChange = (event) => {
        let { name, value } = event.target;
        if(name === "coefficient"){
            if(value){
                value = parseFloat(value);
            }
        }
            setUpdateFormData({ ...updateFormData, [name]: value });

    }
    const [done, setDone] = useState(false);
    const [isOpen, setIsOpen] =useState(false);
    // const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [courseModalOpen, setCourseModalOpen] = useState({});

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setDone(true);
    }
    const handleUpdateSubmit = (e, course) => {
        e.preventDefault();
        console.log(updateFormData)
        setUpdateFormData({
            name: "",
            sectorLevel: "",
            module: "",
            coefficient: 0.0,
            hourlyLoad: 0,
            absenceLimit: 0,
        });
        // axios.post('http://localhost:5000/teachers', formData, config).then(r => {
        //     console.log(r)
        //     getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })
        toggleCourseModal(course.id);
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourses = courses.filter(
        (course) =>
            course.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.subjects.some(subject =>
                subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subject.sectorLevel.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );
    const handleCancel = () => {
        setFormData({
            name: "",
            sectorLevel: "",
            module: "",
            coefficient: 0.0,
            hourlyLoad: 0,
            absenceLimit: 0,
        })
    };
    const handleCancelUpdate = (course) => {
        setUpdateFormData({
            name: course.name,
            sectorLevel: course.sectorLevel,
            module: course.module,
            coefficient: parseFloat(course.coefficient),
            hourlyLoad: course.hourlyLoad,
            absenceLimit: course.absenceLimit,
        })
    };
    const handleUpdateClick = (course) => {
        setUpdateFormData({
            name: course.name,
            sectorLevel: course.sectorLevel,
            module: course.module,
            coefficient: parseFloat(course.coefficient),
            hourlyLoad: course.hourlyLoad,
            absenceLimit: course.absenceLimit,
        })
        toggleCourseModal(course.id);
    };
    const toggleModal = () => setIsOpen(!isOpen);

    // const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen);
    const toggleCourseModal = (courseId) => {
        setCourseModalOpen((prevState) => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }));
    };
    const [errors, setErrors] = useState({
        name: "",
        sectorLevel: "",
        module: "",
        coefficient: "",
        hourlyLoad: "",
        absenceLimit: "",
    });
    const handleSubmitCourse = (e) => {
        e.preventDefault();
        console.log(formData);
        let newErrors = {
            name: "",
            sectorLevel: "",
            module: "",
            coefficient: "",
            hourlyLoad: "",
            absenceLimit: "",
        };

       if(!formData.name){
           newErrors.name = "Name is required";
       }
        if(!formData.sectorLevel){
            newErrors.sectorLevel = "Sector and level are required";
        }
        if(!formData.module){
            newErrors.module = "Module is required";
        }
        if(!formData.coefficient){
            newErrors.coefficient = "Coefficient is required";
        }
        if(!formData.hourlyLoad){
            newErrors.hourlyLoad = "Hourly load is required";
        }
        if(!formData.absenceLimit){
            newErrors.absenceLimit = "Absence limit is required";
        }

        setErrors(newErrors);

        if(!Object.values(newErrors).some(error => error !== "")){
            // Call the API to update the teacher
            // axios.put('http://localhost:5000/teachers/' + teacherId, updateFormData, config).then(r => {
            //     console.log(r)
            //     getTeachers();
            // }).catch(e => {
            //     console.log(e)
            // })
            // Reset the form data
            setFormData({
                name: "",
                sectorLevel: "",
                module: "",
                coefficient: 0,
                hourlyLoad: 0,
                absenceLimit: 0,
            });
            toggleModal();
        }
    };
    const getCourses = () => {
        // axios.get('http://localhost:5000/teachers').then(r => {
        //     setTeachers(r.data)
        // }).catch(e => {
        //     console.log(e)
        // })
    }
    const handleDeleteCourse = (e) => {
        e.preventDefault();
        // Call the API to delete the teacher
        // axios.delete('http://localhost:5000/teachers/' + teacherId).then(r => {
        //     console.log(r)
        // getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })

    }
    const [Options, setOptions] = useState([
        { value: 'GL2', label: 'GL2' },
        { value: 'GL3', label: 'GL3' },
        { value: 'GL4', label: 'GL4' },
        { value: 'GL5', label: 'GL5' },
        { value: 'RT2', label: 'RT2' },
        { value: 'RT3', label: 'RT3' },
        { value: 'RT4', label: 'RT4' },
        { value: 'RT5', label: 'RT5' }
    ]);

    const handleSelectOptionChange = (selectedOption) => {
        const { value } = selectedOption;
        setUpdateFormData({ ...updateFormData, sectorLevel: value });
    }
    const handleSelectOptionAddChange = (selectedOption) => {
        const { value } = selectedOption;
        setFormData({ ...formData, sectorLevel: value });
        console.log(value)
    }
    return (
        <Container className="all-teachers" fluid style={{marginTop:'-50px',padding:"0 48px",height:'100%', marginBottom:'30px'}}>
            {/* Table */}
            <Card className="shadow table-teacher">
                <CardHeader className="border-0 bg-white">
                    {/* Filter Dropdowns on Left */}
                    <div className='row pt-3 pb-2'>
                        <h1 className="col-12 d-flex fs-2 fw-bold justify-content-center listEnseignant">Courses</h1>

                    </div>
                    <div className='d-flex justify-content-between mb-1'>
                        <div className='col-lg-3 col-md-4 col-sm-2 d-flex filter'>
                            <div className="container-input">
                                <input type="text" placeholder="Search" name="text" className="input" value={searchTerm}
                                       onChange={handleSearchChange}/>
                                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Add Course Button in Center */}
                        <div className="d-flex">
                            <div className="d-flex AddEtudiant justify-content-end   ">
                                <Button onClick={toggleModal} className="addbtn ">
                                    Add course
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
                                    {!isHovered && !done &&(<span> Import courses data </span>)}
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
                        <th scope="col">Module</th>
                        <th scope="col">Name</th>
                        <th scope="col">Sector and level</th>
                        <th scope="col">Coefficient</th>
                        <th scope="col">Hourly load</th>
                        <th scope="col">Absence limit</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Display filtered teachers or message if none found */}
                    {filteredCourses.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center' }}>No course found.</td>
                        </tr>
                    ) : (
                        filteredCourses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.module}</td>
                                <td>{course.name}</td>
                                <td>{course.sectorLevel}</td>
                                <td>{course.coefficient}</td>
                                <td>{course.hourlyLoad}</td>
                                <td>{course.absenceLimit}</td>
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
                                                href=""
                                                onClick={() => handleUpdateClick(course)}
                                                className="d-flex align-items-center"
                                            >
                                                <FontAwesomeIcon icon={faPen} className="me-2" />
                                                Update
                                            </DropdownItem>

                                            {/* Update Student Modal */}

                                            <DropdownItem
                                                href=""
                                                onClick={handleDeleteCourse}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="me-2" />
                                                Delete
                                            </DropdownItem>
                                            <PopUp width={`${screenWidth > 740 ? '35vw' : '60vw'} `}
                                                   isOpen={courseModalOpen[course.id] || false}
                                                   setIsOpen={() => toggleCourseModal(course.id)}
                                                   fromCourse={true}>
                                                <div className="d-flex align-items-center ms-4">
                                                    <FaChalkboardTeacher size={25} className="mb-1 me-2"/>
                                                    <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Update teacher:</p>
                                                </div>
                                                <form onSubmit={(e) => handleUpdateSubmit(e, course)}
                                                      onReset={() => handleCancelUpdate(course)}
                                                      className="link-form add-new d-flex flex-column align-items-center">
                                                    <input
                                                        type={"text"}
                                                        name="name"
                                                        value={updateFormData.name}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter the course's name"
                                                    />
                                                    <input
                                                        type={"text"}
                                                        name="module"
                                                        value={updateFormData.module}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter module"
                                                    />
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        value={Options.find(option => option.value === course.sectorLevel)}
                                                        onChange={handleSelectOptionChange}
                                                        name="group"
                                                        options={Options}
                                                    />
                                                    <input
                                                        type={"number"}
                                                        name="hourlyLoad"
                                                        value={updateFormData.hourlyLoad}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter hourly load"
                                                    />
                                                    <input
                                                        type={"number"}
                                                        name="absenceLimit"
                                                        value={updateFormData.absenceLimit}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter absence limit"
                                                    />
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        name="coefficient"
                                                        value={updateFormData.coefficient}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter coefficient"
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
                <PopUp width={`${screenWidth > 740 ? '35vw' : '60vw'} `} isOpen={isOpen} setIsOpen={setIsOpen}
                       fromCourse={true}>
                    <div className="d-flex align-items-center ms-4">
                        <FaChalkboardTeacher size={25} className="mb-1 me-2"/>
                        <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Add student:</p>
                    </div>
                    <form onSubmit={handleSubmitCourse} onReset={handleCancel}
                          className="link-form add-new d-flex flex-column align-items-center">
                        <input
                            type={"text"}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter the course's name"
                        />
                        <input
                            type={"text"}
                            name="module"
                            value={formData.module}
                            onChange={handleInputChange}
                            placeholder="Enter module"
                        />
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // value={Options.find(option => option.value === course.sectorLevel)}
                            onChange={handleSelectOptionAddChange}
                            name="group"
                            options={Options}
                            placeholder="Select sector and level"
                        />
                        <input
                            type={"number"}
                            name="hourlyLoad"
                            value={formData.hourlyLoad?formData.hourlyLoad:''}
                            onChange={handleInputChange}
                            placeholder="Enter hourly load"
                        />
                        <input
                            type={"number"}
                            name="absenceLimit"
                            value={formData.absenceLimit?formData.absenceLimit:''}
                            onChange={handleInputChange}
                            placeholder="Enter absence limit"
                        />
                        <input
                            type="number"
                            step="any"
                            name="coefficient"
                            value={formData.coefficient?formData.coefficient:''}
                            onChange={handleInputChange}
                            placeholder="Enter coefficient"
                        />

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

export default TableCourses;
