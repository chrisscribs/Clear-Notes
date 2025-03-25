import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface NoteItemProps {
  note: { text: string; category: string };
  isMatch: boolean;
  onDelete: (text: string) => void;
  onEdit: (oldText: string, newText: string) => void;
}

const NoteItem = ({ note, isMatch, onDelete, onEdit }: NoteItemProps) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(note.text, editText);
      setEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 py-2">
      {editing ? (
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
        >
          <p>{note.text}</p>
        </div>
      )}

      {editing ? (
        <button
          onClick={handleSave}
          className="text-teal-700 hover:text-green-700 px-2"
        >
          <FaSave />
        </button>
      ) : (
        <>
          <button
            onClick={() => setEditing(true)}
            className="text-gray-600 hover:text-blue-700 px-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(note.text)}
            className="text-red-600 hover:text-red-700 px-2"
          >
            <FaTrash />
          </button>
        </>
      )}
    </div>
  );
};

export default NoteItem;
