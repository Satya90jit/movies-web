import { IMovie } from "@/types";
import React, { memo } from "react";
import { MemorizeMovieCard } from "../cards";
import { MovieCardSkeleton } from "../skeletons";

type ToggleFavorite = (movie: IMovie) => void;
type IsFavorite = (movie: IMovie) => boolean;

interface Props {
  movies: IMovie[];
  isFavorite: IsFavorite;
  toggleFavorite: ToggleFavorite;
  lastMovieElementRef?: React.Ref<HTMLDivElement>;
  loading?: boolean;
}

const MoviesGrid = memo(
  ({
    movies,
    isFavorite,
    toggleFavorite,
    lastMovieElementRef,
    loading,
  }: Props) => {
    return (
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 lg:gap-7 md:gap-5 gap-3 pb-8">
        {movies.map((movie: IMovie, index: number) => (
          <MemorizeMovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            lastMovieElementRef={
              movies.length === index + 1 ? lastMovieElementRef : null
            }
          />
        ))}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
      </div>
    );
  }
);

export default MoviesGrid;
