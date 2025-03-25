import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import logo from "../assets/clearnotes-logo-white.png";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewNote: () => void; 
}

const TopBar = ({ searchQuery, setSearchQuery, onNewNote }: TopBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-16 bg-green-400 py-3 shadow-md z-50">
      <div className="px-10 flex flex-wrap items-center justify-between h-full">
        <img src={logo} alt="Clear Notes Logo" className="h-10" />

        <div className="flex h-10 gap-5">
          <div
            className={`flex items-center gap-3 px-4 py-2 w-full border rounded-lg transition-all duration-200 ${
              isFocused
                ? "border-transparent ring-2 ring-white bg-white"
                : "border-green-300 bg-green-50"
            }`}
          >
            <FaSearch className="text-teal-700 size-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <button
            onClick={onNewNote}
            className="flex gap-2 px-5 py-2 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:ring-2 hover:ring-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 transition cursor-pointer"
          >
            <IoIosAddCircle className="size-6" />
            New
          </button>
        </div>

        <button className="text-white p-0">
          <FaUser className="size-6" />
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
