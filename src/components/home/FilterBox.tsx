import { FilterList, FilterListOff, Search } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";

const types = ["movie", "series"];
const years = Array.from({ length: 2024 - 1990 + 1 }, (_, i) =>
  (1990 + i).toString()
);
interface SearchBarProps {
  query: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
  filters: {
    Type: string;
    Year: string;
  };
  onFilterChange: (name: string, value: string) => void;
  totalData: number;
}

const FilterBox = ({
  query,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  totalData,
}: SearchBarProps) => {
  return (
    <section className="py-8 bg-[#0c1324] lg:mt-20 mt-16 lg:fixed z-[999] lg:w-[99.2vw] w-full lg:top-0">
      <div className="main-container flex lg:flex-row flex-col lg:gap-0 gap-6 justify-between items-center">
        <div className="flex items-center gap-12 lg:w-[60%] w-full">
          <div className="hidden lg:block">
            <p className="text-gray-100">Search movies and TV shows</p>
            <span className="text-sm text-slate-300">
              Total {totalData} movies
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-white">
            <Search className="h-8 w-8" />
            <input
              type="text"
              value={query}
              onChange={onSearchChange}
              placeholder="Find movies, TV shows, documentaries, and more..."
              className="p-2 md:w-[24rem] border-b border-gray-600 focus:outline-none bg-none bg-[#0c1324]"
            />
          </div>
        </div>
        <div className="flex flex-row place-items-end gap-4 lg:w-[30%] w-full">
          <button
            onClick={onClearFilters}
            disabled={!filters.Type && !filters.Year}
            className={`w-36 p-1.5 bg-blue-900 text-white rounded ${
              !filters.Type && !filters.Year
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-900"
            }`}
          >
            {filters.Type || filters.Year ? <FilterListOff /> : <FilterList />}
          </button>
          <TextField
            select
            label="Type"
            value={filters.Type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            size="small"
            className="w-full"
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                backgroundColor: "black",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "darkblue",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "cyan",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "darkblue",
                },
              "& .MuiMenuItem-root": {
                backgroundColor: "black",
                color: "yellow",
              },
              "& .MuiSelect-icon": {
                color: "darkcyan",
              },
            }}
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Year"
            value={filters.Year}
            onChange={(e) => onFilterChange("year", e.target.value)}
            size="small"
            className="w-full"
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                backgroundColor: "black",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "darkblue",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "cyan",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "darkblue",
                },
              "& .MuiMenuItem-root": {
                backgroundColor: "black",
                color: "white",
              },
              "& .MuiSelect-icon": {
                color: "darkcyan",
              },
            }}
          >
            {years.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </section>
  );
};

export default FilterBox;
