"use client";
import { CiMenuFries } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi"; // Import search icon
import { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN Input component

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="w-full h-[60px] items-center py-4 px-3 bg-slate-800 flex justify-between text-white font-bold">
      <form
        onSubmit={handleSearch}
        className="flex flex-grow mx-4 items-center"
      >
        <div className="relative w-full lg:w-[30%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BiSearch className="text-white" />
          </span>
          <Input
            type="text"
            placeholder="Поиск местоположения..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 placeholder:text-white"
          />
        </div>
      </form>
      <p>
        <FaRegUserCircle size={25} />
      </p>
    </nav>
  );
};
