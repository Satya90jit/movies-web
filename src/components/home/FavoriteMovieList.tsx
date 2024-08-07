import { IMovie } from "@/types";
import { memo } from "react";
import { NoDataLoader, TextTitles } from "../core";
import { MoviesGrid } from "../grids";

type ToggleFavorite = (movie: IMovie) => void;
type IsFavorite = (movie: IMovie) => boolean;

const FavoriteMovieList = memo(
  ({
    favorites,
    isFavorite,
    toggleFavorite,
  }: {
    favorites: IMovie[];
    isFavorite: IsFavorite;
    toggleFavorite: ToggleFavorite;
  }) => {
    return (
      <section>
        <TextTitles title="Favorite Movies" />
        <MoviesGrid
          movies={favorites}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        {favorites.length === 0 && (
          <NoDataLoader text="No favorite movies yet." />
        )}
      </section>
    );
  }
);
export default FavoriteMovieList;
