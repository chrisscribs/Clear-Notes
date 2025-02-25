const placeholders = [
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
];

const randomPlaceholder =
  placeholders[Math.floor(Math.random() * placeholders.length)];

const NoteInput = () => {
  return (
    <input
      className="w-full p-3 border bg-white border-green-300 rounded-lg text-teal-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none h-32"
      placeholder={randomPlaceholder}
    ></input>
  );
};

export default NoteInput;
