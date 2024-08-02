import { memo } from "react";
import { MemorizeMovieCard } from "../cards";
import { NoDataLoader } from "../core";

const FavoriteMovieList = ({
  favorites,
  isFavorite,
  toggleFavorite,
}: {
  favorites: any;
  isFavorite?: any;
  toggleFavorite?: any;
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
          {favorites.map((data: any) => (
            <div key={data?.id}>
              <MemorizeMovieCard
                movie={data}
                key={data?.id}
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
