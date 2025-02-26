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
  const [notes, setNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const notesCollectionRef = collection(db, "notes");

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(notesCollectionRef);
      const notesData = querySnapshot.docs.map((doc) => doc.data().text);
      setNotes(notesData);
    };
    fetchNotes();
  }, [notesCollectionRef]);

  const handleSaveNote = async (newNote: string) => {
    if (!newNote.trim()) return;
    await addDoc(notesCollectionRef, { text: newNote });
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = async (index: number) => {
    const noteToDelete = notes[index];

    const querySnapshot = await getDocs(notesCollectionRef);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteToDelete
    );

    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="flex-grow grid grid-cols-2 gap-4 p-6 bg-green-50 min-h-0">
            <NoteCategoryList
              title="🌱 Deep Focus"
              color="red"
              notes={notes.filter((n) => n.category === "focus")}
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="💡 Growth & Reflection"
              color="blue"
              notes={notes.filter((n) => n.category === "growth")}
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="🌊 Let it Flow"
              color="green"
              notes={notes.filter((n) => n.category === "flow")}
              onDelete={handleDeleteNote}
            />
            <NoteCategoryList
              title="🌬️ Let it Go"
              color="gray"
              notes={notes.filter((n) => n.category === "letgo")}
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
