import { FaTrash } from "react-icons/fa";
interface NoteCategoryListProps {
  title: string;
  color: string;
  notes: { text: string; category: string }[];
  searchQuery: string; // ✅ New prop
  onDelete: (text: string) => void;
}

const NoteCategoryList = ({
  title,
  color,
  notes,
  searchQuery,
  onDelete,
}: NoteCategoryListProps) => {
  const noteCount = notes.length;

  return (
    <div className={`p-4 rounded-lg shadow-md bg-${color}-100`}>
      <h2 className={`text-xl font-bold text-${color}-600 mb-2`}>
        {title} ({noteCount})
      </h2>
      <div className="space-y-2">
        {notes.length > 0 ? (
          notes.map((note, index) => {
            const isMatch =
              searchQuery &&
              note.text.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div key={index} className="flex items-center gap-2">
                {/* Note Box */}
                <div
                  className={`flex-grow text-teal-900 p-2 bg-white shadow-md border border-teal-300 transition  ${
                    isMatch ? "bg-yellow-300/75" : `bg-${color}-200`
                  }`}
                >
                  <p>{note.text}</p>
                </div>

                {/* Delete Button (Outside the Box) */}
                <button
                  onClick={() => onDelete(note.text)}
                  className="text-teal-700 hover:text-red-700 px-1 transition cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default NoteCategoryList;
