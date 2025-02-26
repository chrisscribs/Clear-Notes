import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface NoteCategoryListProps {
  title: string;
  color: string;
  description: string;
  notes: { text: string; category: string }[];
  searchQuery: string;
  onDelete: (text: string) => void;
  onEdit: (oldText: string, newText: string) => void; // ✅ Edit function
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
          notes.map((note, index) => {
            const isMatch =
              searchQuery &&
              note.text.toLowerCase().includes(searchQuery.toLowerCase());
            const isEditing = editingNote === note.text;

            return (
              <div key={index} className="flex items-center gap-2 py-2">
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
                  /* Normal Note Display */
                  <div
                    className={`flex-grow bg-white p-2 transition shadow-sm ${
                      isMatch
                        ? "bg-yellow-300/75"
                        : colorClasses[color]?.bg || "bg-gray-200"
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
          })
        ) : (
          <p className="text-gray-500 italic text-center p-4">{description}</p>
        )}
      </div>
    </div>
  );
};

export default NoteCategoryList;
