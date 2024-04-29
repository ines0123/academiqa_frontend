import React, { useState, useEffect, useContext } from "react";
import { CurrentUser } from "./CurrentUserContext";
import Cookie from "cookie-universal";
import axios from "axios";

const NoteContext = React.createContext();

const NoteProvider = ({ children }) => {
  const { currentUser } = useContext(CurrentUser);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (currentUser?.role === "Student") {
      const userToken = Cookie().get("academiqa");
      axios
        .get("http://localhost:5000/note/", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log("Response: ", res); // Log the response
          setNotes(res.data);
          console.log("Notes: ", res.data);
        })
        .catch((err) => {
          console.error("Error: ", err); // Log the error
          console.error(`${err} - Failed to find notes`);
        });
    }
  }, [currentUser]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
