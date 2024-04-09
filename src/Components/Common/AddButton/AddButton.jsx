
import React, { useRef, useState } from 'react';
import './AddButton.css';
const AddButton = ({ onFileSelect, onLinkAdd }) => {
    const inputRef = useRef(null);


    const handleFileSelect = () => {
        inputRef.current.click();
    };

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileSelect(file);
        } else {
            // Handle case where user clicks "Add File" but doesn't select a file
            console.log("No file selected");
        }
    };

    const handleLinkAdd = () => {
        const link = prompt("Enter the link:");
        if (link !== null) {
            onLinkAdd(link);
        }
    };

    return (
        <div className="dropdown-container">
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleInputChange}
            />
            <button
                title="Add New"
                className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    className="stroke-zinc-800 fill-none group-active:stroke-zinc-400  group-active:duration-0 duration-300"
                >
                    <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                </svg>
            </button>

                <div className="dropdown-content w-16 rounded-2xl ">
                    <button onClick={handleFileSelect}>Add File</button>
                    <button onClick={handleLinkAdd}>Add Link</button>
                </div>

        </div>
    );
};

export default AddButton;
