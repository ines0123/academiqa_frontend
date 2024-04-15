import React, { useState, useEffect, useRef } from "react";
import AddButtonTask from "../Common/AddButton/AddButtonTask.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import { FaTasks } from "react-icons/fa";
import tasksData from "./tasksData.json";
import "./Task.css";

import axios from "axios";
import {FaDeleteLeft} from "react-icons/fa6";

const Task = ({ role }) => {
    const [tasks, setTasks] = useState(tasksData);
    const [newTask, setNewTask] = useState("");
    const [showNewTask, setShowNewTask] = useState(false);
    const newTaskRef = useRef(null);

    //check the task (checkbox)
    const handleCheckChange = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    //add new task (addButton)
    const handleAddTask = () => {
        if (newTask !== "") {
            setTasks([...tasks, { content: newTask, isChecked: false }]);
            setNewTask("");
        }

        // if (newTask !== "") {
        //   axios
        //     .post("http://localhost:5173", {
        //       content: newTask,
        //       isChecked: false,
        //     })
        //     .then((response) => {
        //       setTasks((prevTasks) => [...prevTasks, response.data]);
        //       setNewTask("");
        //     })
        //     .catch((error) => {
        //       console.error("There was an error!", error);
        //     });
        // }

        setShowNewTask(false);
        console.log(newTask);
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    //show the new task input
    const handlePageClick = () => {
        setShowNewTask(true);
        setNewTask("");
    };

    //scroll down to the new task input
    useEffect(() => {
        if (showNewTask) {
            newTaskRef.current.focus();
        }
    }, [showNewTask]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    // useEffect(() => {
    //   axios
    //     .get("http://localhost:5173")
    //     .then((response) => {
    //       setTasks(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("There was an error!", error);
    //     });
    // }, []);

    return (
        <div className="task">
            <div className="tasks-title pl-8 pr-5 flex">
                Tasks
                {role === "teacher" && <AddButtonTask onClick={handlePageClick} />}
            </div>
            <div className="tasks-content" style={{marginTop:'-22px', minWidth:'100%'}}>
                <Scrollbar
                    thumbColor={"rgba(233, 177, 176, 0.62)"}
                    trackColor={"#F5D8D6"}
                    maxHeight={"170px"}
                >
                    <div className="contentTask">
                        <div className="row p-0 d-flex justify-content">
                            {tasks.map((task, index) => (
                                <div className="custom mb-2" key={index}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            maxWidth: "85%",
                                        }}
                                    >
                                        <label
                                            className="containerCheck"
                                            style={{
                                                cursor: role === "student" ? "default" : "cursor",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={task.isChecked}
                                                onChange={() =>
                                                    role === "teacher" && handleCheckChange(index)
                                                }
                                                disabled={role === "student"}
                                            />
                                            <svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
                                                <path
                                                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                                    pathLength="575.0541381835938"
                                                    className="pathCheck"
                                                ></path>
                                            </svg>
                                        </label>
                                        <div className={`Content ${task.isChecked ? "crossed" : ""}`}>
                                            {task.content}
                                        </div>
                                    </div>
                                    {role === "teacher" && (
                                        <div
                                            className="deleteTask d-flex justify-content-center"
                                            onClick={() => handleDeleteTask(index)}
                                        >
                                            {/*<button className="Deletebutton">*/}
                                            {/*    <svg*/}
                                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*        fill="none"*/}
                                            {/*        viewBox="0 0 69 14"*/}
                                            {/*        className="svgIconBin bin-top"*/}
                                            {/*    >*/}
                                            {/*        <g clipPath="url(#clip0_35_24)">*/}
                                            {/*            <path*/}
                                            {/*                fill="black"*/}
                                            {/*                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"*/}
                                            {/*            ></path>*/}
                                            {/*        </g>*/}
                                            {/*        <defs>*/}
                                            {/*            <clipPath id="clip0_35_24">*/}
                                            {/*                <rect fill="white" height="14" width="69"></rect>*/}
                                            {/*            </clipPath>*/}
                                            {/*        </defs>*/}
                                            {/*    </svg>*/}
                                            {/*    <svg*/}
                                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*        fill="none"*/}
                                            {/*        viewBox="0 0 69 57"*/}
                                            {/*        className="svgIconBin bin-bottom"*/}
                                            {/*    >*/}
                                            {/*        <g clipPath="url(#clip0_35_22)">*/}
                                            {/*            <path*/}
                                            {/*                fill="black"*/}
                                            {/*                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"*/}
                                            {/*            ></path>*/}
                                            {/*        </g>*/}
                                            {/*        <defs>*/}
                                            {/*            <clipPath id="clip0_35_22">*/}
                                            {/*                <rect fill="white" height="57" width="69"></rect>*/}
                                            {/*            </clipPath>*/}
                                            {/*        </defs>*/}
                                            {/*    </svg>*/}
                                            {/*</button>*/}
                                            <button className="file-delete-button container grow-0 max-w-4 ">
                                                <FaDeleteLeft
                                                    className="ressources-icon  min-w-4 min-h-4 hover:scale-110"/>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {showNewTask && (
                                <div className="custom mb-2 d-flex justify-content-start">
                                    <label className="containerCheck" style={{cursor: "default" }}>
                                        <input type="checkbox" />
                                        <svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
                                            <path
                                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                                pathLength="575.0541381835938"
                                                className="pathCheckNew"
                                            ></path>
                                        </svg>
                                    </label>
                                    <div className="Content">
                                        <input
                                            className="inputNewTask"
                                            type="text"
                                            value={newTask}
                                            onChange={(e) => setNewTask(e.target.value)}
                                            onBlur={handleAddTask}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddTask();
                                                }
                                            }}
                                            placeholder="Add new task ..."
                                            ref={newTaskRef}
                                        />
                                    </div>
                                </div>
                             )}
                        </div>
                        {tasks.length === 0 && !showNewTask && (
                            <div className="emptyTasks">
                                <FaTasks size={"40px"} />
                                <div>No tasks added</div>
                            </div>
                        )}
                    </div>
                </Scrollbar>
            </div>
        </div>
    );
};

export default Task;