import { useState } from "react";
import { BiBookReader } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import PopUp from "../../Common/PopUp/PopUp";
import "./AddNote.css";

const AddNote = ({ isOpen, setIsOpen, session }) => {
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleInputChange = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newNote);
    // Add code here to handle the submission of the new note
  };

  const backgroundColor = "#FEF7EF";
  return (
    <PopUp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="500px"
      backgroundColor={backgroundColor}
    >
      <div className="mt-4">
        <div className="titlePopUp ml-12 d-flex flex-column">
          <h1 className="fw-bold">Add Note</h1>
        </div>
        <div className="noteInfo">
          <div className="noteSubjectTypePopUp ml-3">
            <div className="pt-1 pl-1">
              <BiBookReader size={17} fill="#FEF7EF" />
            </div>
            <div className="noteST pt-1 pl-2 pr-1">
              <div className="s ">{session?.subject}</div>
              <div className="t ">{session?.type}</div>
            </div>
          </div>
          <div className="noteDateTime">
            <div className="noteDatePopUp">{session?.date}</div>
            <div className="noteSessionTimePopUp">
              <FiClock size={15} stroke="#FEF7EF" />
              <div>{session?.sessionTime}</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="noteContentPopUp">
          <div className="title-input">
            <HiOutlinePencilSquare size={25} />
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
              placeholder="Type your note's title ..."
            />
          </div>
          <hr className="addNoteHr"/>
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleInputChange}
            placeholder="Type your note here ..."
            className="content-input"
          />
          <button type="submit" className="addNote">
            Save
          </button>
        </form>
      </div>
    </PopUp>
  );
};

export default AddNote;
