import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import logo from "../assets/clearnotes-logo-white.png";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import UserMenuDropdown from "./UserMenuDropdown";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewNote: () => void;
}

const TopBar = ({ searchQuery, setSearchQuery, onNewNote }: TopBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const { logout } = useAuth();
  return (
    <nav className="fixed top-0 w-full h-16 bg-green-400 py-3 shadow-md z-50">
      <div className="px-10 flex flex-wrap items-center justify-between h-full">
        <button className="flex content-center">
          <img src={logo} alt="Clear Notes Logo" className="h-10" />
          <span className="hidden lg:inline text-white">Clear Notes.</span>
        </button>

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
          <Button
            onClick={onNewNote}
            icon={<IoIosAddCircle className="size-6" />}
            color={"teal"}
          >
            New
          </Button>
        </div>

        <div className="flex gap-4">
          <UserMenuDropdown onLogout={logout} />
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
