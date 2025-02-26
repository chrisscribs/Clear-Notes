interface NoteCategoryListProps {
  title: string;
  color: string;
  notes: { text: string; category: string }[];
  onDelete: (text: string) => void;
}

const colorClasses: Record<string, string> = {
  red: "border-red-300 bg-red-100 text-red-700",
  blue: "border-blue-300 bg-blue-100 text-blue-700",
  green: "border-green-300 bg-green-100 text-green-700",
  gray: "border-gray-300 bg-gray-100 text-gray-700",
};

const NoteCategoryList = ({
  title,
  color,
  notes,
  onDelete,
}: NoteCategoryListProps) => {
  return (
    <div
      className={`flex flex-col p-4 rounded-lg shadow-md ${colorClasses[color]} min-h-48`}
    >
      <h2 className="text-xl font-bold text-${color}-600 mb-2">{title}</h2>
      <div className="flex-grow overflow-y-auto space-y-2">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex justify-between bg-opacity-75 ${colorClasses[color]}`}
            >
              <p>{note.text}</p>
              <button
                onClick={() => onDelete(note.text)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default NoteCategoryList;
