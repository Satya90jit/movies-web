import { IMovie } from "@/types";
import { Tooltip } from "@mui/material";
import { memo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MovieCard = ({
  movie,
  isFavorite,
  toggleFavorite,
  lastMovieElementRef,
}: {
  movie: IMovie;
  isFavorite: (movie: IMovie) => boolean;
  toggleFavorite: (movie: IMovie) => void;
  lastMovieElementRef?: React.Ref<HTMLDivElement>;
}) => {
  const hasFavorite = isFavorite(movie);
  return (
    <section
      ref={lastMovieElementRef}
      className="relative h-[23rem] border border-gray-800 shadow-md shadow-slate-900 rounded-lg overflow-hidden flex"
    >
      <div className="relative w-full">
        <img
          src={
            movie?.Poster &&
            movie?.Poster !== "N/A" &&
            movie?.Poster !== undefined
              ? movie.Poster
              : "./no-image.jpg"
          }
          alt="movie image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
          <Tooltip
            title={`${!hasFavorite ? "Add To Favorite" : "Remove Favorite"}`}
          >
            <button
              onClick={() => toggleFavorite(movie)}
              className="absolute bottom-5 right-5 text-2xl text-red-500"
            >
              {hasFavorite ? (
                <FaHeart className="scale-100 hover:scale-110 common-transition" />
              ) : (
                <FaRegHeart className="scale-100 hover:scale-110 common-transition" />
              )}
            </button>
          </Tooltip>
          <div className="mt-auto">
            <h3 className="md:text-xl text-lg font-bold mb-2">
              {movie?.Title}
            </h3>
            <div className="text-sm space-y-1">
              <span className="pr-3">{movie?.Year}</span>
              <span className="text-yellow-500">{movie?.Type}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MemorizeMovieCard = memo(MovieCard);

export default MemorizeMovieCard;
