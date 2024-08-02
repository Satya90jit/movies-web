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
    <section className="py-6 bg-gray-200 flex lg:flex-row flex-col lg:gap-0 gap-6 justify-between items-center px-10 lg:mt-20 mt-16 lg:fixed z-[999] lg:w-[99vw] w-full lg:top-0">
      <div className="flex items-center gap-12 lg:w-[60%] w-full">
        <div className="hidden lg:block">
          <p>Search movies and TV shows</p>
          <span className="text-sm text-slate-600">
            Total {totalData} movies
          </span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Search className="h-8 w-8" />
          <input
            type="text"
            value={query}
            onChange={onSearchChange}
            placeholder="Find movies, TV shows, documentaries, and more..."
            className="p-2 md:w-[24rem] focus:outline-none bg-none bg-gray-200"
          />
        </div>
      </div>
      <div className="flex flex-row place-items-end gap-4 lg:w-[40%] w-full">
        <Button
          variant="contained"
          className="bg-blue-950 text-white w-8"
          onClick={onClearFilters}
          disabled={!filters.Type && !filters.Year}
        >
          {filters.Type || filters.Year ? <FilterListOff /> : <FilterList />}
        </Button>
        <TextField
          select
          label="Type"
          value={filters.Type}
          onChange={(e) => onFilterChange("type", e.target.value)}
          size="small"
          className="w-full"
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
        >
          {years.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </section>
  );
};

export default FilterBox;
