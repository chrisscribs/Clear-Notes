import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/clearnotes-logo-white.png";
import { FaUser } from "react-icons/fa";
interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="absolute top-0 w-full bg-green-400 py-3 shadow-md">
      <div className="px-20 flex flex-wrap items-center justify-between mx-auto p-1">
        <img src={logo} alt="Clear Notes Logo" className="h-10" />
        <div
          className={`flex items-center gap-3 px-4 py-2 w-full max-w-lg border rounded-lg transition-all duration-200 mr-26 ${
            isFocused
              ? "border-transparent ring-2 ring-white bg-white"
              : "border-green-300 bg-green-50"
          }`}
        >
          <FaSearch className="text-teal-700 " />
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
        <div>
          <FaUser className="text-white h-10 p-0 w-full"/>
        </div>
      </div>
    </nav>
  );
};

export default Searchbar;
