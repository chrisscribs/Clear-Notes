import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import NoteInput from "./components/NoteInput";
import NotesGrid from "./components/NotesGrid";
import DragLayer from "./components/DragLayer";
import DragHandlers from "./components/DragHandlers";

const App = () => {
  const { user } = useAuth();
  const { notes, setNotes, addNote, deleteNote, editNote } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [activeNote, setActiveNote] = useState<{
    text: string;
    category: string;
  } | null>(null);

  const filteredNotes = searchQuery
    ? notes.map((note) => ({
        ...note,
        isMatch: note.text.toLowerCase().includes(searchQuery.toLowerCase()),
      }))
    : notes;

  if (!user) return <Login />;

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <TopBar
        onNewNote={() => setShowNoteInput(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <DragHandlers
        notes={notes}
        setNotes={setNotes}
        setActiveNote={setActiveNote}
      >
        <NotesGrid
          notes={filteredNotes}
          onDelete={deleteNote}
          onEdit={editNote}
          searchQuery={searchQuery}
        />
        <DragLayer activeNote={activeNote} />
      </DragHandlers>

      {showNoteInput && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
          <NoteInput onSave={addNote} onClose={() => setShowNoteInput(false)} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
