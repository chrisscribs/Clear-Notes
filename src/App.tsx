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
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import NoteCategoryList from "./components/NoteCategoryList";

interface Note {
  text: string;
  category: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const notesCollectionRef = collection(db, "notes");

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(notesCollectionRef);
      const notesData = querySnapshot.docs.map((doc) => doc.data() as Note);
      setNotes(notesData); // ✅ Store full note objects, including category
    };
    fetchNotes();
  }, []);

  const handleSaveNote = async (newNote: string, category: string) => {
    if (!newNote.trim()) return;

    const note = { text: newNote, category: category || "focus" }; // ✅ Ensure category is assigned

    await addDoc(notesCollectionRef, note); // ✅ Save the full object to Firestore

    // ✅ Fetch the updated list of notes from Firestore after saving
    const querySnapshot = await getDocs(notesCollectionRef);
    const updatedNotes = querySnapshot.docs.map((doc) => doc.data() as Note);
    setNotes(updatedNotes);
  };

  const handleDeleteNote = async (noteText: string) => {
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteText
    );

    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      const updatedNotes = querySnapshot.docs
        .filter((doc) => doc.id !== docToDelete.id)
        .map((doc) => doc.data() as Note);
      setNotes(updatedNotes);
    }
  };

  const filteredNotes = notes.filter(
    (note) => note.text.toLowerCase().includes(searchQuery.toLowerCase()) // ✅ Use note.text
  );

  return (
    <>
      <div className="flex flex-col min-h-screen bg-green-50">
        <TopBar
          onNewNote={() => setShowNoteInput(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex flex-col min-h-screen bg-green-50 pt-16">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-green-50 h-[90vh]">
            <NoteCategoryList
              title="🌱 Deep Focus"
              color="red"
              notes={notes.filter((n) => n.category === "focus")} // ✅ Correctly filters by category
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="💡 Growth & Reflection"
              color="blue"
              notes={notes.filter((n) => n.category === "growth")} // ✅ Correctly filters by category
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="🌊 Let it Flow"
              color="green"
              notes={notes.filter((n) => n.category === "flow")} // ✅ Correctly filters by category
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="🌬️ Let it Go"
              color="gray"
              notes={notes.filter((n) => n.category === "letgo")} // ✅ Correctly filters by category
              onDelete={handleDeleteNote}
            />
          </div>
        </div>
        {showNoteInput && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
            <NoteInput
              onSave={handleSaveNote}
              onClose={() => setShowNoteInput(false)}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
