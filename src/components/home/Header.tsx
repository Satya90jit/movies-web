import React, { memo } from "react";

const Header = ({
  showFav,
  setShowFav,
}: {
  showFav: boolean;
  setShowFav: (value: boolean) => void;
}) => {
  return (
    <header className="lg:mt-[12rem] mb-5 overflow-hidden py-6 text-white text-center">
      <h1 className="text-3xl font-bold mb-2">Movie Browser</h1>
      <p className="text-slate-200">
        Discover and explore your favorite movies. Use the filters to refine
        your search and toggle between all movies and your favorites.
      </p>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowFav(false)}
          className={`px-6 py-2 mx-2 ${
            !showFav ? "bg-blue-900/90" : "bg-gray-500"
          } text-white md:text-base text-sm font-serif rounded-md focus:outline-none common-transition`}
        >
          All Movies
        </button>
        <button
          onClick={() => setShowFav(true)}
          className={`px-6 py-2 mx-2 ${
            showFav ? "bg-blue-900/90" : "bg-gray-500"
          } text-white md:text-base text-sm font-serif rounded-md focus:outline-none common-transition`}
        >
          Favorites
        </button>
      </div>
    </header>
  );
};
const MemorizeHeader = memo(Header);
export default MemorizeHeader;
