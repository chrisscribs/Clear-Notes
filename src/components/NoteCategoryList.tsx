import { useState } from "react";
import { useDroppable } from "@dnd-kit/core"; // ✅ Droppable for quadrant
import DraggableNote from "./DraggableNote"; // ✅ New Component

interface NoteCategoryListProps {
  id: string;
  title: string;
  color: string;
  description: string;
  notes: { id?: string; text: string; category: string }[];
  searchQuery: string;
  onDelete: (text: string) => void;
  onEdit: (oldText: string, newText: string) => void;
}

const colorClasses: {
  [key: string]: { bg: string; text: string; border: string };
} = {
  red: { bg: "bg-red-100", text: "text-red-600", border: "border-red-300" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-300" },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-300",
  },
  gray: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
};

const NoteCategoryList = ({
  id,
  title,
  color,
  description,
  notes,
  searchQuery,
  onDelete,
  onEdit,
}: NoteCategoryListProps) => {
  const noteCount = notes.length;
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // ✅ Quadrant as Droppable Area
  const { setNodeRef } = useDroppable({ id });

  const startEditing = (noteText: string) => {
    setEditingNote(noteText);
    setEditText(noteText);
  };

  const handleEditSave = () => {
    if (editingNote && editText.trim() !== "") {
      onEdit(editingNote, editText);
    }
    setEditingNote(null);
    setEditText("");
  };

  return (
    <div
      ref={setNodeRef} // ✅ Quadrant is droppable
      className={`p-4 rounded-lg shadow-md flex flex-col ${
        colorClasses[color]?.bg || "bg-gray-100"
      } ${colorClasses[color]?.border || "border-gray-300"}`}
    >
      <h2
        className={`text-xl font-bold ${
          colorClasses[color]?.text || "text-gray-600"
        } mb-2`}
      >
        {title} ({noteCount})
      </h2>

      <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-200">
        {notes.length > 0 ? (
          notes.map((note) => (
            <DraggableNote
              key={note.id || note.text}
              note={note}
              searchQuery={searchQuery}
              isEditing={editingNote === note.text}
              editText={editText}
              setEditText={setEditText}
              startEditing={startEditing}
              handleEditSave={handleEditSave}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 italic text-center p-4">{description}</p>
        )}
      </div>
    </div>
  );
};

export default NoteCategoryList;
