"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", value);

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md border px-2 py-1.5 bg-primary-foreground ">
      <Search className="w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="text-sm outline-0"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(value);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
