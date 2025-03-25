import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import NoteInput from "./components/NoteInput";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import NoteCategoryList from "./components/NoteCategoryList";
import { NoteCategories } from "./data/noteCategories";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

const App = () => {
  const { user } = useAuth();

  const { notes, addNote, deleteNote, editNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const filteredNotes = searchQuery
    ? notes.map((note) => ({
        ...note,
        isMatch: note.text.toLowerCase().includes(searchQuery.toLowerCase()),
      }))
    : notes;

  if (!user) return <Login />;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-green-50">
        <TopBar
          onNewNote={() => setShowNoteInput(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex flex-col min-h-screen bg-green-50 pt-16">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-green-50 h-[90vh]">
            {NoteCategories.map((category) => (
              <NoteCategoryList
                key={category.key}
                title={category.title}
                color={category.color}
                description={category.description}
                notes={filteredNotes.filter((n) => n.category === category.key)}
                searchQuery={searchQuery}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            ))}
          </div>
        </div>

        {showNoteInput && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
            <NoteInput
              onSave={addNote}
              onClose={() => setShowNoteInput(false)}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
