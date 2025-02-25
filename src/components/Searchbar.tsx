import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="absolute top-0 w-full flex justify-center bg-green-400 py-3 shadow-md">
      <div
        className={`flex items-center gap-3 px-4 py-2 w-full max-w-lg border rounded-lg transition-all duration-200 ${
          isFocused
            ? "border-transparent ring-2 ring-white bg-white"
            : "border-green-300 bg-green-50"
        }`}
      >
        <FaSearch className="text-teal-700" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} // 🔥 Reset when input loses focus
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Searchbar;
