import NoteItem from "./NoteItem";
import EmptyCategoryMessage from "./EmptyCategoryMessage";

interface NoteCategoryListProps {
  title: string;
  color: string;
  description: string;
  notes: { text: string; category: string }[];
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
  title,
  color,
  description,
  notes,
  searchQuery,
  onDelete,
  onEdit,
}: NoteCategoryListProps) => {
  const noteCount = notes.length;

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
          notes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              isMatch={
                !!(
                  searchQuery &&
                  note.text.toLowerCase().includes(searchQuery.toLowerCase())
                )
              }
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <EmptyCategoryMessage description={description} />
        )}
      </div>
    </div>
  );
};

export default NoteCategoryList;
