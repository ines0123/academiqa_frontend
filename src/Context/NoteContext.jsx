import React, { useState, useEffect } from "react";
import axios from "axios";

const NoteContext = React.createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/note/")
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(`${err} - Failed to find note`);
      });
  }, []);

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
