import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchbarProps) => {
  return (
    <>
      <div className="width-full flex justify-center bg-green-400">
        <div className="flex gap-4 p-2 mb-4 mt-4 w-lg border border-green-300 rounded-lg text-teal-700 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent">
          <FaSearch className=""/>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="size-full hover:border-none focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
