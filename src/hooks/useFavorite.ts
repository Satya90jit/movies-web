import { IMovie } from "@/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { useEffect, useState } from "react";

const useFavorite = () => {
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      getFromLocalStorage("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // favorite movie store
  const toggleFavorite = (movie: IMovie) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      updatedFavorites = favorites.filter(
        (fav) => fav?.imdbID !== movie?.imdbID
      );
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    saveToLocalStorage("favorites", JSON.stringify(updatedFavorites));
  };
  const isFavorite = (movie: IMovie) => {
    return favorites.some((fav) => fav?.imdbID === movie?.imdbID);
  };
  return { isFavorite, toggleFavorite, favorites };
};

export default useFavorite;
