import { useState } from "react";
import { IoSearch } from "react-icons/io5"; // Import the search icon

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center border border-gray-300 rounded-[5px] px-2 py-2 w-full max-w-xs h-10"
    >
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search Property..."
        className="w-full p-2 border-0 outline-none"
      />
      <button type="submit" className="text-blue-600 hover:text-blue-500 ml-2">
        <IoSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
