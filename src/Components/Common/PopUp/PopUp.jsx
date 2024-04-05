import React, {useState} from 'react';
import Modal from "react-modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import './popup.css'
import Scrollbar from "../Scrollbar/Scrollbar.jsx";
// eslint-disable-next-line react/prop-types
const PopUp = ({children, width, isOpen, setIsOpen}) => {
    function closeModal() {
        setTimeout(() => {
            setIsOpen(false);
        }, 150);
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            padding: "1.5rem",
            paddingBottom: "2rem",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFEFC",
            color: "white",
            border: "none",
            borderRadius: "3.2em",
            width: width,
            // maxHeight: "94vh",
        }, overlay: {
            backgroundColor: "rgba(15, 19, 30, 0.65)",
        },
    };
    return (
        <div className="container">

                <Modal
                    ariaHideApp={false}
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customStyles}>
                    <Scrollbar thumbColor={"#692E5F"} trackColor={"#D1C4D8"} maxHeight={"81vh"}>
                    <IconContext.Provider
                        value={{ color: "#262626", className: "close-modal" }}
                    >
                        <div onClick={closeModal}>
                            <IoCloseCircleOutline />
                        </div>

                    </IconContext.Provider>
                    {children}
                        </Scrollbar>
                </Modal>

        </div>
    );
};

export default PopUp;