import { useEffect, useState, useMemo } from "react";

interface NoteInputProps {
  onSave: (note: string, category: string) => void;
  onClose: () => void;
}

const NoteInput = ({ onSave, onClose }: NoteInputProps) => {
  const placeholders = useMemo(
    () => [
      "Clear your mind...",
      "Get it off your chest...",
      "Let it all out...",
      "The notepad can't hurt you...",
      "You can do hard things",
      "Breathe in, write out...",
      "Let your thoughts flow...",
      "Put it into words...",
      "Write it down, then let it go...",
      "A quiet mind is a happy mind...",
      "Breathe. Think. Write.",
    ],
    []
  );

  const categories = [
    { value: "focus", label: "🌱 Deep Focus" },
    { value: "growth", label: "💡 Growth & Reflection" },
    { value: "flow", label: "🌊 Let it Flow" },
    { value: "letgo", label: "🌬️ Let it Go" },
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("focus");

  useEffect(() => {
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)]
    );
  }, [placeholders]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    if (note.trim() === "") return;
    onSave(note, selectedCategory); // ✅ Pass both note text and selected category
    setNote("");
    setSelectedCategory("focus"); // ✅ Reset category after saving
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)]
    );
    onClose();
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg border border-green-200 relative">
      {/* Close Button (Top Right) */}
      <button
        onClick={onClose}
        className="absolute p-2 top-2 right-4 text-teal-700 hover:text-red-500 text-lg p-2 transition cursor-pointer"
      >
        ✖
      </button>

      <h1 className="text-3xl font-semibold text-teal-700 text-center mb-4">
        Clear Notes.
      </h1>

      <textarea
        className="w-full p-3 border bg-white border-green-300 rounded-lg text-teal-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none h-32"
        placeholder={placeholder}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-4">
        <label className="block text-teal-700 font-semibold mb-2">
          Select Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-lg text-teal-700 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
        >
          {categories.map((cat) => (
            <option
              key={cat.value}
              value={cat.value}
              className="focus:bg-teal-700"
            >
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          id="saveTask"
          className="px-5 py-2 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:ring-2 hover:ring-1 hover:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 transition cursor-pointer"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteInput;
