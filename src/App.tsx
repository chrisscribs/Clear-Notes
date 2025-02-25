import "./App.css";
import NoteInput from "./components/NoteInput";
import SaveButton from "./components/SaveButton";

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-lg p-6 bg-teal-700 shadow-lg rounded-lg border-green-200">
          <h1 className="text-3xl font-semibold text-white text-center mb-4">
            Clear Notes
          </h1>
          <NoteInput />
          <div className="flex justify-center mt-4">
            <SaveButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
