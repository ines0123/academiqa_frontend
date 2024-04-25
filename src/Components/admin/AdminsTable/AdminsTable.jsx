import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    Container, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import axios from "axios";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {FaEllipsisVertical} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../Common/PopUp/PopUp.jsx";
import {PiStudentBold} from "react-icons/pi";
import {LuImagePlus} from "react-icons/lu";
import Scrollbar from "../../Common/Scrollbar/Scrollbar.jsx";

const AdminsTable = () => {

    const [admins, setAdmins] = useState([
        {
            id: 1,
            username: "Admin1",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 2,
            username: "Admin2",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 3,
            username: "Admin3",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 4,
            username: "Admin4",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 5,
            username: "Admin5",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 6,
            username: "Admin6",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 7,
            username: "Admin7",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 8,
            username: "Admin8",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 9,
            username: "Admin9",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 10,
            username: "Admin10",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 11,
            username: "Admin11",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 12,
            username: "Admin12",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 13,
            username: "Admin13",
            email: " admin.t@t.t",
            cin: 123456,
        },
        {
            id: 14,
            username: "Admin14",
            email: " admin.t@t.t",
            cin: 123456,
        }
    ]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: null,
        cin: 0,
    });
    const [updateFormData, setUpdateFormData] = useState({
        username: "",
        email: "",
        cin: 0,
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };
    const handleUpdateInputChange = (event) => {
        const {name, value} = event.target;
        console.log(event)
        setUpdateFormData({...updateFormData, [name]: value});
    }
    const [done, setDone] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState({});

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
    const handleImageClick = () => {
        document.getElementById('teacher-image').click();
    }
    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    }

    const handleUpdateSubmit = (e, admin) => {
        e.preventDefault();
        console.log(updateFormData)

        // axios.post('http://localhost:5000/admins', formData, config).then(r => {
        //     console.log(r)
        //     getAdmins();
        // }).catch(e => {
        //     console.log(e)
        // })
        toggleAdminModal(admin.id);
    }
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.cin.toString().includes(searchTerm.toLowerCase())
    );
    const handleCancel = () => {
        setFormData({
            username: "",
            email: "",
            password: "",
            image: null,
            cin: 0,
        })
    };
    const handleCancelUpdate = (admin) => {
        setUpdateFormData({
            username: admin.username,
            email: admin.email,
            password: admin.password,
            cin: admin.cin,
        })
    };
    const handleUpdateClick = (admin) => {
        setUpdateFormData({
            username: admin.username,
            email: admin.email,
            cin: admin.cin,
        });
        toggleAdminModal(admin.id);
    };
    const toggleModal = () => setIsOpen(!isOpen);

    // const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen);
    const toggleAdminModal = (adminId) => {
        setAdminModalOpen((prevState) => ({
            ...prevState,
            [adminId]: !prevState[adminId],
        }));
    };
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        image: "",
        cin: "",
    });
    const handleSubmitAdmin = (e) => {
        e.preventDefault();
        console.log(formData);
        let newErrors = {
            username: "",
            email: "",
            password: "",
            image: "",
            cin: "",
        };
        if (!formData.username) {
            newErrors.username = "Username is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        if (!formData.image) {
            newErrors.image = "Image is required";
        }
        if (!formData.cin) {
            newErrors.cin = "CIN is required";
        }
        if (!formData.image) {
            newErrors.image = "Image is required";
        }
        setErrors(newErrors);
        if (!Object.values(newErrors).some(error => error !== "")) {
            // Call the API to update the admin
            // axios.put('http://localhost:5000/admins/' + adminId, updateFormData, config).then(r => {
            //     console.log(r)
            //     getAdmins();
            // }).catch(e => {
            //     console.log(e)
            // })
            // Reset the form data
            setFormData({
                username: "",
                email: "",
                password: "",
                image: null,
                cin: 0,
            });
            toggleModal();
        }
    };
    const getAdmins = () => {
        // axios.get('http://localhost:5000/admins').then(r => {
        //     setTeachers(r.data)
        // }).catch(e => {
        //     console.log(e)
        // })
    }
    const handleDeleteAdmin = (e) => {
        e.preventDefault();
        // Call the API to delete the admin
        // axios.delete('http://localhost:5000/admins/' + adminId).then(r => {
        //     console.log(r)
        // getTeachers();
        // }).catch(e => {
        //     console.log(e)
        // })

    }

    return (
        <Container fluid style={{marginBottom: '30px',marginLeft: '10px'}}>
            {/* Table */}
            <Card className="shadow table-teacher h-[490px] p-2">
                <CardHeader className="border-0 bg-white">
                    {/* Filter Dropdowns on Left */}
                    <div className='row pt-3 pb-2'>
                        <h1 className="col-12 d-flex fs-2 fw-bold justify-content-center listEnseignant">Admins</h1>

                    </div>
                    <div className='mb-1 d-flex justify-content-between'>
                        <div className='col-lg-3 col-md-4 col-sm-2 d-flex filter'>
                            <div className="container-input">
                                <input type="text" placeholder="Search" name="text" className="input" value={searchTerm}
                                       onChange={handleSearchChange}/>
                                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                                        fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Add admin Button in Center */}
                        <div className="d-flex">
                            <div className="d-flex AddEtudiant justify-content-end   ">
                                <Button onClick={toggleModal} className="addbtn ">
                                    Add admin
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                {/* Table Content */}
                <Scrollbar trackColor={"#f2f2f2"} thumbColor={"#ccc"} maxHeight={"340px"}>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="head-table">
                    <tr>
                        <th scope="col">cin</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* Display filtered admins or message if none found */}
                    {filteredAdmins.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{textAlign: 'center'}}>No admin found.</td>
                        </tr>
                    ) : (
                        filteredAdmins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.cin}</td>
                                <td>{admin.username}</td>
                                <td>{admin.email}</td>
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
                                        <DropdownMenu className="dropdown-menu-arrow" style={{
                                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                            border: 'none'
                                        }} end>

                                            <DropdownItem
                                                href="/admin/profile"
                                                className="d-flex align-items-center"
                                            >
                                                <FaEye size={20} className="me-1"/>
                                                View profile
                                            </DropdownItem>

                                            <DropdownItem
                                                href=""
                                                onClick={() => handleUpdateClick(admin)}
                                                className="d-flex align-items-center"
                                            >
                                                <FontAwesomeIcon icon={faPen} className="me-2"/>
                                                Update
                                            </DropdownItem>

                                            {/* Update admin Modal */}

                                            <DropdownItem
                                                href=""
                                                onClick={handleDeleteAdmin}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="me-2"/>
                                                Delete
                                            </DropdownItem>
                                            <PopUp width={`${screenWidth > 740 ? '35vw' : '60vw'} `}
                                                   isOpen={adminModalOpen[admin.id] || false}
                                                   setIsOpen={() => toggleAdminModal(admin.id)}
                                                   fromCourse={true}>
                                                <div className="d-flex align-items-center ms-4">
                                                    <PiStudentBold size={25} className="mb-1 me-2"/>
                                                    <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Update
                                                        admin:</p>
                                                </div>
                                                <form onSubmit={(e) => handleUpdateSubmit(e, admin)}
                                                      onReset={() => handleCancelUpdate(admin)}
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
                                                        placeholder="Enter email: example@example.com"
                                                    />
                                                    <input
                                                        type={"number"}
                                                        name="cin"
                                                        value={updateFormData.cin}
                                                        onChange={handleUpdateInputChange}
                                                        placeholder="Enter cin"
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
                </Scrollbar>
            </Card>
            {/* Add admin Modal */}
            <div className="add-one-teacher-modal">
                <PopUp width={`${screenWidth > 740 ? '35vw' : '60vw'} `} isOpen={isOpen} setIsOpen={setIsOpen}
                       fromCourse={true}>
                    <div className="d-flex align-items-center ms-4">
                        <PiStudentBold size={25} className="mb-1 me-2"/>
                        <p className="fs-5 fw-bold ms-1 mb-1 add-teacher"> Add admin:</p>
                    </div>
                    <form onSubmit={handleSubmitAdmin} onReset={handleCancel}
                          className="link-form add-new d-flex flex-column align-items-center">
                        <input
                            type={"text"}
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            className={`${errors.username ? 'mb-0 mt-0' : ''}`}

                        />
                        {errors.username && <p style={{color: "#b41b1b", fontSize: '14px'}}>{errors.username}</p>}
                        <input
                            type={"email"}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            className={`${errors.email ? 'mb-0 mt-0' : ''}`}

                        />
                        {errors.email && <p style={{color: "#b41b1b", fontSize: '14px'}}>{errors.email}</p>}
                        <input
                            type={"password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className={`${errors.password ? 'mb-0 mt-0' : ''}`}

                        />
                        {errors.password && <p style={{color: "#b41b1b", fontSize: '14px'}}>{errors.password}</p>}
                        <input
                            type={"number"}
                            name="cin"
                            value={formData.cin ? formData.cin : ""}
                            onChange={handleInputChange}
                            placeholder="Enter cin"
                            className={`${errors.cin ? 'mb-0 mt-0' : ''}`}

                        />
                        {errors.cin && <p style={{color: "#b41b1b", fontSize: '14px'}}>{errors.cin}</p>}
                        <input type={"file"} name="photo" id="teacher-image" accept="image/*"
                               onChange={handleImageChange}
                               style={{display: "none"}}/>
                        {errors.image && <p style={{color: "#b41b1b", fontSize: '14px'}}>{errors.image}</p>}
                        <div className={`d-flex justify-content-start ${errors.username ? 'mb-0 mt-0' : ''}`}
                             style={{width: "100%"}}>
                            <Button className="d-flex align-items-center add-photo ms-3" onClick={handleImageClick}>
                                <LuImagePlus size={30}/>
                                <p className="ms-2"> {!formData.image ? ("Add photo") : formData.image.name} </p>
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

export default AdminsTable;