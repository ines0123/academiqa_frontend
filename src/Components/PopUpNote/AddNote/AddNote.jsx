import { useState, useContext } from "react";
import Cookie from "cookie-universal";
import { BiBookReader } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import axios from "axios";
import PopUp from "../../Common/PopUp/PopUp";
import "./AddNote.css";
import { NoteContext } from "../../../Context/NoteContext.jsx";
import { useDate } from "../../../Context/DateContext.jsx";

const AddNote = ({ isOpen, setIsOpen, session }) => {
  const date = useDate();
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const { addNote } = useContext(NoteContext);

  const handleInputChange = (event) => {
    setNewNote({ ...newNote, [event.target.name]: event.target.value });
  };

  const userToken = Cookie().get("academiqa");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/note`, newNote, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        addNote(res.data);
        setIsOpen(false);
        setNewNote({ title: "", content: "" });
      })
      .catch((err) => {
        console.error(`${err} - Failed to post note`);
      });
  };

  const backgroundColor = "#FFFEFB";
  return (
    <PopUp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="500px"
      backgroundColor={backgroundColor}
    >
      <div className="mt-4">
        <div className="titlePopUp ml-5 d-flex flex-column">
          <h1 className="fw-bold">Add Note</h1>
        </div>
        <div className="noteInfo">
          <div className="noteSubjectTypePopUp ml-3">
            <div className="pt-1 pl-1">
              <BiBookReader size={17} fill="black" />
            </div>
            <div className="noteST pt-1 pl-2 pr-1">
              <div className="s ">{session?.subject}</div>
              <div className="t ">{session?.type}</div>
            </div>
          </div>
          <div className="noteDateTime">
            <div className="noteDatePopUp">{date}</div>
            <div className="noteSessionTimePopUp">
              <FiClock size={15} stroke="black" />
              <div>{session?.sessionTime}</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="noteContentPopUp mb-0">
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
          <hr className="addNoteHr" />
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
