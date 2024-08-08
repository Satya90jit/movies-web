import { IMovie } from "@/types";
import useLocalStorage from "./useLocalStorage";

const useFavorite = () => {
  const {
    data: favorites,
    toggleData: toggleFavorite,
    isDataStored: isFavorite,
  } = useLocalStorage("favorites");

  return {
    favorites,
    toggleFavorite: (movie: IMovie) => toggleFavorite(movie, "imdbID"),
    isFavorite: (movie: IMovie) => isFavorite(movie, "imdbID"),
  };
};

export default useFavorite;
