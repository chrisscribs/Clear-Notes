import NoteCategoryList from "./NoteCategoryList";
import { NoteCategories } from "../data/noteCategories";

interface Props {
  notes: { text: string; category: string; isMatch?: boolean }[];
  searchQuery: string;
  onDelete: (text: string) => void;
  onEdit: (oldText: string, newText: string) => void;
}

const NotesGrid = ({ notes, searchQuery, onDelete, onEdit }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50 pt-16">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-green-50 h-[90vh]">
        {NoteCategories.map((category) => (
          <NoteCategoryList
            key={category.key}
            categoryKey={category.key}
            title={category.title}
            color={category.color}
            description={category.description}
            notes={notes.filter((n) => n.category === category.key)}
            searchQuery={searchQuery}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesGrid;
