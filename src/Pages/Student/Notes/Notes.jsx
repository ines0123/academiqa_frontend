import React, { useEffect, useState } from "react";
import notesData from "../Notes/noteData.json";
import Note from "../../../Components/Note/Note";
import MidNavbar from "../../../Components/MidNavbar/MidNavbar";
import Filter from "./Filter/Filter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiBookReader } from "react-icons/bi";
import { LuCalendar } from "react-icons/lu";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";

import "./Notes.css";

export default function Notes() {
  const [date, setDate] = useState();
  const [modulo, setModulo] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 860);
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const colors = [
    "192, 222, 189", // green
    "198, 206, 235", // blue
    "230, 235, 198", // light yellow
    "179, 159, 209", // purple
    "228, 235, 188", // light green
    "237, 203, 199", // light pink
    "247, 226, 224", // pink
    "246, 232, 214", // light orange
  ];
  useEffect(() => {
    const handleResize = () => {
      setModulo(
        window.innerWidth < 799
          ? 1
          : window.innerWidth < 1024
          ? 2
          : window.innerWidth < 1369
          ? 3
          : 4
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 860);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDate(today.toLocaleDateString("en-US", options));
  }, []);

  useEffect(() => {
    setNotes(notesData);
  }, []);

  const getUniqueSubjects = (notes) => {
    const subjects = new Set(notes.map((note) => note.subject));
    return Array.from(subjects);
  };

  return (
    <div className="container notes-page pt-3">
      <MidNavbar />
      <div className="date ms-3">{date}</div>
      <div
        className={`my-notes d-flex mt-4 p-3 ${
          isSmallScreen ? "more-margin" : ""
        }`}
      >
        <div className="notes-icon">
          <FaRegStickyNote size={40} />
        </div>
        <h1 className="fs-1 ms-2 fw-bold">My Notes</h1>
      </div>
      <div className="buttonContainer">
        {/* <div className="paste-buttonFilter ">
          <button
            className={`buttonFilterD ${isDropdownVisible1 ? "active" : ""}`}
            onClick={handleDropdown1Click}
          >
            <LuCalendar />
            <div>Date</div>
            <IoIosArrowDown />
          </button>
          {isDropdownVisible1 && (
            <div className="dropdown-contentFilter">
              <a id="top" href="#">
                Keep source formatting
              </a>
              <a id="middle" href="#">
                Merge formatting
              </a>
              <a id="bottom" href="#">
                Keep text only
              </a>
            </div>
          )}
        </div> */}
        <Filter
          Icon={LuCalendar}
          title="Date"
          className="buttonFilterD"
          dropdownClassName="DateFilter"
        >
          {() => (
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd MMMM yyyy, EEEE"
              isClearable
              placeholderText="Select a date"
            />
          )}
        </Filter>
        <button
          className="clearButton"
          onClick={() => {
            setSelectedDate(null);
          }}
        >
          <MdOutlineClear />
        </button>
        <Filter
          Icon={BiBookReader}
          title="Subject"
          className="buttonFilterS"
          dropdownClassName="SubjectFilter"
        >
          {() =>
            getUniqueSubjects(notes).map((subject) => (
              <a
                key={subject}
                href="#"
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </a>
            ))
          }
        </Filter>
        <button
          className="clearButton"
          onClick={() => {
            setSelectedSubject(null);
          }}
        >
          <MdOutlineClear />
        </button>
      </div>
      <div className="container all-notes mt-4">
        <div className="row d-flex justify-content-center">
          {notes
            .filter(
              (note) =>
                (!selectedDate ||
                  new Date(note.date.split(",")[0]).toLocaleDateString() ===
                    selectedDate.toLocaleDateString()) &&
                (!selectedSubject || note.subject === selectedSubject)
            )
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((note, index) => (
              <React.Fragment key={index}>
                {index % modulo === 0 && index !== 0 && (
                  <hr style={{ width: "95%" }} />
                )}
                <div className="custom-col-c mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
                  <Note note={note} baseColor={colors[index % colors.length]} />
                </div>
              </React.Fragment>
            ))}
          <div className="pagonation">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                disabled={currentPage === number}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
