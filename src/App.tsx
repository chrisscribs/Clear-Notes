import { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";

function App() {
  const [notes, setNotes] = useState([]);

  // Load notes from LocalStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("clearNotes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("clearNotes", JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
  const handleSaveNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg border border-green-200">
        <h1 className="text-3xl font-semibold text-teal-700 text-center mb-4">
          Clear Notes
        </h1>

        <NoteInput onSave={handleSaveNote} />

        <div className="mt-4 space-y-2">
          {notes.map((note, index) => (
            <div
              key={index}
              className="p-3 bg-green-100 border border-green-200 rounded-lg flex justify-between"
            >
              <p className="text-teal-700">{note}</p>
              <button
                onClick={() => handleDeleteNote(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
