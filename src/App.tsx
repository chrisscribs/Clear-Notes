import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import NoteInput from "./components/NoteInput";
import Searchbar from "./components/TopBar";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const notesCollectionRef = collection(db, "notes"); // Firestore collection reference

  // Load notes from Firestore when the app loads
  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(notesCollectionRef);
      const notesData = querySnapshot.docs.map((doc) => doc.data().text);
      setNotes(notesData);
    };
    fetchNotes();
  }, [notesCollectionRef]);

  // Function to add a new note to Firestore
  const handleSaveNote = async (newNote: string) => {
    if (!newNote.trim()) return;
    await addDoc(notesCollectionRef, { text: newNote }); // ✅ No unused variable
    setNotes([...notes, newNote]); // Update UI
  };

  // Function to delete a note from Firestore
  const handleDeleteNote = async (index: number) => {
    const noteToDelete = notes[index];

    // Fetch the corresponding Firestore document and delete it
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteToDelete
    );

    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  // Filter notes based on search query (case-insensitive)
  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                    className="text-teal-500 hover:text-teal-700 cursor-pointer"
                  >
                    ✖
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                There are no notes here. <br /> What else is on your mind?
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
