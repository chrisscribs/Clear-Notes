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
import { DragOverlay } from "@dnd-kit/core";

const App = () => {
  const { user } = useAuth();
  const { notes, setNotes, addNote, deleteNote, editNote } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [activeNote, setActiveNote] = useState<{
    text: string;
    category: string;
  } | null>(null);

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

    const activeId = String(active.id); // 👈 cast to string
    const overId = String(over.id); // 👈 cast to string

    const activeNote = notes.find((n) => n.text === activeId);
    if (!activeNote) return;

    const overNote = notes.find((n) => n.text === overId);
    const categoryKeys = NoteCategories.map((cat) => cat.key);

    if (overNote && activeNote.category === overNote.category) {
      const categoryNotes = notes.filter(
        (n) => n.category === activeNote.category
      );

      const oldIndex = categoryNotes.findIndex((n) => n.text === activeId);
      const newIndex = categoryNotes.findIndex((n) => n.text === overId);

      const reordered = arrayMove(categoryNotes, oldIndex, newIndex);

      const updatedNotes = [
        ...notes.filter((n) => n.category !== activeNote.category),
        ...reordered,
      ];

      setNotes(updatedNotes);
    } else if (overNote && activeNote.category !== overNote.category) {
      const updatedNotes = notes.map((note) =>
        note.text === activeId ? { ...note, category: overNote.category } : note
      );
      setNotes(updatedNotes);
      updateCategoryInFirestore(activeId, overNote.category);
    } else if (categoryKeys.includes(overId)) {
      const updatedNotes = notes.map((note) =>
        note.text === activeId ? { ...note, category: overId } : note
      );
      setNotes(updatedNotes);
      updateCategoryInFirestore(activeId, overId);
    }
  };
  const updateCategoryInFirestore = async (
    noteText: string,
    newCategory: string
  ) => {
    const snapshot = await getDocs(collection(db, "notes"));
    const docToUpdate = snapshot.docs.find(
      (doc) => doc.data().text === noteText
    );
    if (docToUpdate) {
      await updateDoc(doc(db, "notes", docToUpdate.id), {
        category: newCategory,
      });
    }
    setActiveNote(null);
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
          onDragStart={(event) => {
            const dragged = notes.find((n) => n.text === event.active.id);
            if (dragged) setActiveNote(dragged);
          }}
          onDragEnd={(event) => {
            handleDragEnd(event);
            setActiveNote(null); // 👈 Clear overlay when done
          }}
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

          <DragOverlay>
            {activeNote ? (
              <div className="p-2 bg-white shadow-lg rounded w-full max-w-sm text-gray-800">
                <p>{activeNote.text}</p>
              </div>
            ) : null}
          </DragOverlay>
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
