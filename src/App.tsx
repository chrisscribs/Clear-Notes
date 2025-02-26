import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { DndContext, DragEndEvent } from "@dnd-kit/core"; // ✅ Import Drag & Drop
import NoteInput from "./components/NoteInput";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import NoteCategoryList from "./components/NoteCategoryList";

interface Note {
  id?: string;
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
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesData);
    };
    fetchNotes();
  }, [notesCollectionRef]);

  const handleSaveNote = async (newNote: string, category: string) => {
    if (!newNote.trim()) return;
    const note = { text: newNote, category: category || "focus" };
    await addDoc(notesCollectionRef, note);
    setNotes((prev) => [...prev, note]);
  };

  const handleDeleteNote = async (noteText: string) => {
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteText
    );
    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.text !== noteText)
      );
    }
  };

  const handleEditNote = async (oldText: string, newText: string) => {
    if (!newText.trim()) return;
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToUpdate = querySnapshot.docs.find(
      (doc) => doc.data().text === oldText
    );
    if (docToUpdate) {
      await updateDoc(doc(db, "notes", docToUpdate.id), { text: newText });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.text === oldText ? { ...note, text: newText } : note
        )
      );
    }
  };

  // ✅ Handle Drag & Drop
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // If no valid drop target, do nothing.

    const noteId = active.id as string;
    const newCategory = over.id as string; // The quadrant's category

    // ✅ Update Firestore & UI
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToUpdate = querySnapshot.docs.find((doc) => doc.id === noteId);
    if (docToUpdate) {
      await updateDoc(doc(db, "notes", docToUpdate.id), {
        category: newCategory,
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, category: newCategory } : note
        )
      );
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col min-h-screen bg-green-50">
          <TopBar
            onNewNote={() => setShowNoteInput(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 mt-15 bg-green-50 h-[90vh]">
            {["focus", "growth", "flow", "letgo"].map((category) => (
              <NoteCategoryList
                key={category}
                id={category} // ✅ Unique ID for Drag & Drop
                title={
                  category === "focus"
                    ? "🌱 Deep Focus"
                    : category === "growth"
                    ? "💡 Growth & Reflection"
                    : category === "flow"
                    ? "🌊 Let it Flow"
                    : "🌬️ Let it Go"
                }
                color={
                  category === "focus"
                    ? "red"
                    : category === "growth"
                    ? "blue"
                    : category === "flow"
                    ? "green"
                    : "gray"
                }
                description={
                  category === "focus"
                    ? "No notes. Make note of what truly needs your focus."
                    : category === "growth"
                    ? "No notes. A space for learnings, ideas and personal reflections."
                    : category === "flow"
                    ? "No notes. Unload your mental clutter."
                    : "No notes. Release the thoughts that no longer serve you."
                }
                notes={notes.filter((n) => n.category === category)}
                searchQuery={searchQuery}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
            ))}
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
      </DndContext>
      <Footer />
    </>
  );
};

export default App;
