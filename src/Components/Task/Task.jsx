import React, { useState, useEffect, useRef } from "react";
import AddButtonTask from "../Common/AddButton/AddButtonTask.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import { FaTasks } from "react-icons/fa";
import tasksData from "./tasksData.json";
import "./Task.css";

import axios from "axios";
import {FaDeleteLeft} from "react-icons/fa6";
import DeleteButton from "../Common/DeleteButtonForResTask/DeleteButton.jsx";

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
                    maxHeight={"150px"}
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
                                            className="deleteTask"
                                            onClick={() => handleDeleteTask(index)}
                                        >
                                            <DeleteButton/>
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