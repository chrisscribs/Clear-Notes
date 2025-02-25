import { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";
import Searchbar from "./components/Searchbar";

const App = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load notes from LocalStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("clearNotes") || "[]"
    ) as string[];
    setNotes(savedNotes);
  }, []);

  // Save notes to LocalStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("clearNotes", JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
  const handleSaveNote = (newNote: string) => {
    if (!newNote.trim()) return; // Prevent saving empty notes
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
  };

  // Function to delete a note
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Filter notes based on search query (case-insensitive)
  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 🟢 Search Bar Component */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg border border-green-200">
          <h1 className="text-3xl font-semibold text-teal-700 text-center mb-4">
            Clear Notes
          </h1>

          <NoteInput onSave={handleSaveNote} />

          <div className="mt-4 space-y-2">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
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
              ))
            ) : (
              <p className="text-gray-500 text-center">No notes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
