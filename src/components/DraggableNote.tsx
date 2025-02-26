import { useDraggable } from "@dnd-kit/core";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface DraggableNoteProps {
  note: { id?: string; text: string; category: string };
  searchQuery: string;
  isEditing: boolean;
  editText: string;
  setEditText: (text: string) => void;
  startEditing: (text: string) => void;
  handleEditSave: () => void;
  onDelete: (text: string) => void;
}

const DraggableNote = ({
  note,
  searchQuery,
  isEditing,
  editText,
  setEditText,
  startEditing,
  handleEditSave,
  onDelete,
}: DraggableNoteProps) => {
  // ✅ Make Note Draggable
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: note.id || note.text,
  });

  const isMatch =
    searchQuery && note.text.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div
      ref={setNodeRef} // ✅ Make it draggable
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 py-2 cursor-grab"
    >
      {/* Edit Mode */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
          className="flex-grow p-2 rounded-lg bg-white focus:ring-2 focus:ring-green-400"
        />
      ) : (
        <div
          className={`flex-grow p-2 transition shadow-sm rounded-lg ${
            isMatch ? "bg-yellow-300/75" : "bg-white"
          }`}
        >
          <p>{note.text}</p>
        </div>
      )}

      {/* Action Buttons */}
      {isEditing ? (
        <button
          onClick={handleEditSave}
          className="text-teal-700 hover:text-green-700 px-2 cursor-pointer"
        >
          <FaSave />
        </button>
      ) : (
        <>
          <button
            onClick={() => startEditing(note.text)}
            className="text-gray-600 hover:text-blue-700 px-2 cursor-pointer"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(note.text)}
            className="text-red-600 hover:text-red-700 px-2 cursor-pointer"
          >
            <FaTrash />
          </button>
        </>
      )}
    </div>
  );
};

export default DraggableNote;
