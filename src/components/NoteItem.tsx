import { useState } from "react";
import { FaTrash, FaSave, FaGripVertical } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NoteItemProps {
  note: { text: string; category: string };
  isMatch: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onDelete: (text: string) => void;
  onEdit: (oldText: string, newText: string) => void;
}

const NoteItem = ({
  note,
  isMatch,
  isEditing,
  onStartEdit,
  onStopEdit,
  onDelete,
  onEdit,
}: NoteItemProps) => {
  const [editText, setEditText] = useState(note.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.text });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(note.text, editText);
      onStopEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 py-2"
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-grow p-2 rounded-lg bg-white focus:ring-2 focus:ring-green-400"
        />
      ) : (
        <div
          className={`flex-grow p-2 transition shadow-sm ${
            isMatch ? "bg-yellow-300/75" : "bg-white"
          }`}
          onClick={onStartEdit}
        >
          <div className="flex">
            <div
              {...attributes}
              {...listeners}
              className="mr-2 content-center cursor-grab text-gray-400 hover:text-gray-600 px-1"
            >
              <FaGripVertical />
            </div>
            <p>{note.text}</p>
          </div>
        </div>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-teal-700 hover:text-green-700 px-2"
        >
          <FaSave />
        </button>
      ) : (
        <button
          onClick={() => onDelete(note.text)}
          className="text-red-600 hover:text-red-700 px-2"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default NoteItem;
