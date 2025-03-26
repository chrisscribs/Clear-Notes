import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { NoteCategories } from "../data/noteCategories";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ReactNode } from "react";

interface Note {
  text: string;
  category: string;
}

interface Props {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setActiveNote: (note: Note | null) => void;
  children: ReactNode;
}

const DragHandlers = ({ notes, setNotes, setActiveNote, children }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

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

    setActiveNote(null);
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
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        const dragged = notes.find((n) => n.text === event.active.id);
        if (dragged) setActiveNote(dragged);
      }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
};

export default DragHandlers;
