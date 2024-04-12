import { useState, useEffect } from "react";
import PopUp from "../../Common/PopUp/PopUp";

import { BiBookReader } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import "../AddNote/AddNote.css";

const EditNote = ({ note, isOpen, setIsOpen }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleInputChange = (event) => {
    setEditedNote({ ...editedNote, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editedNote);
    // Add code here to handle the submission of the edited note
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
        {/* <div className="titlePopUp ml-12 d-flex flex-column">
          <h1 className="fw-bold">Edit Note</h1>
        </div> */}
        <div className="noteInfo">
          <div className="noteSubjectTypePopUp ml-3">
            <div className="pt-1 pl-1">
              <BiBookReader size={17} fill="#FEF7EF" />
            </div>
            <div className="noteST pt-1 pl-2 pr-1 ">
              <div className="s ">{note.session?.subject}</div>
              <div className="t ">{note.session?.type}</div>
            </div>
          </div>
          <div className="noteDateTime">
            <div className="noteDatePopUp">{note?.date}</div>
            <div className="noteSessionTimePopUp">
              <FiClock size={15} stroke="#FEF7EF" />
              <div>{note.session?.sessionTime}</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="noteContentPopUp">
          <div className="title-input">
            <HiOutlinePencilSquare size={25} />
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
              placeholder="Type your note's title ..."
            />
          </div>
          <hr className="addNoteHr" />
          <textarea
            name="content"
            value={editedNote.content}
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
export default EditNote;
