import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchbarBlog = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div
      className={`relative lg:w-[650px] w-full bg-white rounded-lg border-2 max-md:w-full mx-auto ${
        isFocused ? "border-blue-600" : "border-gray-300"
      }`}
    >
      <input
        className="p-6 h-[30px] w-[95%] rounded-md text-sm focus:outline-none outline-blue-600"
        type="text"
        placeholder="Search Related Blogs Here..."
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <CiSearch
        className={`absolute top-1/2 -translate-y-1/2 right-7 text-xl ${
          isFocused ? "text-black" : "text-slate-400"
        } cursor-pointer`}
      />
    </div>
  );
};

export default SearchbarBlog;
