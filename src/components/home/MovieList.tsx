import { useDebounce, useFavorite, useInfiniteScroll } from "@/hooks";
import { Filters, IMovie } from "@/types";
import { API_KEY, OMDbAPI } from "@/utils";
import { useEffect, useState } from "react";
import { NoDataLoader, TextTitles } from "../core";
import { MoviesGrid } from "../grids";
import FavoriteMovieList from "./FavoriteMovieList";
import FilterBox from "./FilterBox";
import MovieSectionHeader from "./MovieSectionHeader";

const MoviesList = () => {
  const [query, setQuery] = useState("prem");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    Type: "",
    Year: "",
  });
  const debouncedQuery = useDebounce(query, 500);
  const { isFavorite, toggleFavorite, favorites } = useFavorite();
  const lastMovieElementRef = useInfiniteScroll({ loading, hasMore, setPage });

  //fetch movies
  const fetchMovies = async (searchQuery: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${OMDbAPI}?s=${searchQuery}&page=${page}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data?.Response === "False") {
        setHasMore(false);
        throw new Error(data?.Error);
      }
      setMovies((prevMovies) => [...prevMovies, ...data?.Search]);
      setTotalData(data?.totalResults);
      setHasMore(
        data?.Search.length > 0 &&
          movies.length < parseInt(data.totalResults) &&
          !data?.Error &&
          data?.Response !== "False"
      );
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // dynamic search
  useEffect(() => {
    if (debouncedQuery) {
      setMovies([]);
      setPage(1);
      fetchMovies(debouncedQuery, 1);
    } else {
      setMovies([]);
      setTotalData(0);
      setHasMore(false);
    }
  }, [debouncedQuery]);
  useEffect(() => {
    if (page > 1 && debouncedQuery) {
      fetchMovies(debouncedQuery, page);
    }
  }, [page]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // dynamic filtering
  const handleFilterChange = (name: string, value: string | string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name.charAt(0).toUpperCase() + name.slice(1)]: value,
    }));
  };
  const handleClearFilters = () => {
    setFilters({
      Type: "",
      Year: "",
    });
  };
  const applyFilters = (movies: IMovie[]) => {
    return movies.filter((movie: IMovie) => {
      return (
        (!filters.Type || movie.Type === filters.Type) &&
        (!filters.Year || movie.Year === filters.Year)
      );
    });
  };
  const filteredMovies = applyFilters(movies);
  return (
    <>
      <FilterBox
        query={query}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalData={totalData}
      />
      <div className="main-container">
        <MovieSectionHeader showFav={showFav} setShowFav={setShowFav} />
        {showFav ? (
          <FavoriteMovieList
            favorites={favorites}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <>
            <TextTitles title="All Movies" />
            <MoviesGrid
              movies={filteredMovies}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              lastMovieElementRef={lastMovieElementRef}
              loading={loading}
            />
            {!loading && filteredMovies.length === 0 && (
              <NoDataLoader text="No Matching Movies Found" />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MoviesList;
