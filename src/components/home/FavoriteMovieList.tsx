import { IMovie } from "@/types";
import { memo } from "react";
import { MemorizeMovieCard } from "../cards";
import { NoDataLoader } from "../core";

type ToggleFavorite = (movie: IMovie) => void;
type IsFavorite = (movie: IMovie) => boolean;

const FavoriteMovieList = ({
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
      <h2 className="text-2xl mb-4 font-semibold text-white">
        Favorite Movies
      </h2>
      {favorites?.length === 0 ? (
        <NoDataLoader text="No favorite movies yet." />
      ) : (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 lg:gap-7 md:gap-5 gap-3 w-full pb-8">
          {favorites.map((data: IMovie) => (
            <div key={data?.imdbID}>
              <MemorizeMovieCard
                movie={data}
                isFavorite={isFavorite(data)}
                toggleFavorite={() => toggleFavorite(data)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const MemorizeFavoriteMovieList = memo(FavoriteMovieList);

export default MemorizeFavoriteMovieList;
