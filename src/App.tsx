import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import NoteInput from "./components/NoteInput";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import NoteCategoryList from "./components/NoteCategoryList";
import { NoteCategories } from "./data/noteCategories";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const App = () => {
  const { user } = useAuth();
  const { notes, setNotes, addNote, deleteNote, editNote } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const filteredNotes = searchQuery
    ? notes.map((note) => ({
        ...note,
        isMatch: note.text.toLowerCase().includes(searchQuery.toLowerCase()),
      }))
    : notes;

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeNote = notes.find((n) => n.text === active.id);
    const overNote = notes.find((n) => n.text === over.id);

    if (!activeNote || !overNote) return;

    if (activeNote.category === overNote.category) {
      const categoryNotes = notes.filter(
        (n) => n.category === activeNote.category
      );

      const oldIndex = categoryNotes.findIndex((n) => n.text === active.id);
      const newIndex = categoryNotes.findIndex((n) => n.text === over.id);

      const reordered = arrayMove(categoryNotes, oldIndex, newIndex);

      const updatedNotes = [
        ...notes.filter((n) => n.category !== activeNote.category),
        ...reordered,
      ];

      setNotes(updatedNotes);
    } else {
      const updatedNotes = notes.map((note) =>
        note.text === active.id
          ? { ...note, category: overNote.category }
          : note
      );

      setNotes(updatedNotes);

      const updateCategory = async () => {
        const snapshot = await getDocs(collection(db, "notes"));
        const docToUpdate = snapshot.docs.find(
          (doc) => doc.data().text === active.id
        );
        if (docToUpdate) {
          await updateDoc(doc(db, "notes", docToUpdate.id), {
            category: overNote.category,
          });
        }
      };
      updateCategory();
    }
  };

  if (!user) return <Login />;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-green-50">
        <TopBar
          onNewNote={() => setShowNoteInput(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col min-h-screen bg-green-50 pt-16">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-green-50 h-[90vh]">
              {NoteCategories.map((category) => (
                <NoteCategoryList
                  key={category.key}
                  categoryKey={category.key}
                  title={category.title}
                  color={category.color}
                  description={category.description}
                  notes={filteredNotes.filter(
                    (n) => n.category === category.key
                  )}
                  searchQuery={searchQuery}
                  onDelete={deleteNote}
                  onEdit={editNote}
                />
              ))}
            </div>
          </div>
        </DndContext>

        {showNoteInput && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
            <NoteInput
              onSave={addNote}
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
