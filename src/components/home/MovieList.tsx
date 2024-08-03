import useDebounce from "@/hooks/useDebounce";
import { Filters, IMovie } from "@/types";
import { API_KEY, getFromLocalStorage, OMDbAPI } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { MemorizeMovieCard } from "../cards";
import { Loader, NoDataLoader } from "../core";
import MemorizeFavoriteMovieList from "./FavoriteMovieList";
import FilterBox from "./FilterBox";

const MoviesList = () => {
  const [query, setQuery] = useState("prem");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const [filters, setFilters] = useState<Filters>({
    Type: "",
    Year: "",
  });
  const debouncedQuery = useDebounce(query, 500);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      getFromLocalStorage("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

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
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const isFavorite = (movie: IMovie) => {
    return favorites.some((fav) => fav?.imdbID === movie?.imdbID);
  };

  // infinite scrolling
  const lastMovieElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <section className="w-full">
      <FilterBox
        query={query}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalData={totalData}
      />
      <div className="main-container">
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
        {showFav ? (
          <MemorizeFavoriteMovieList
            favorites={favorites}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <div className="w-full">
            <h2 className="text-2xl mb-4 font-semibold text-white">
              All Movies
            </h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 lg:gap-7 md:gap-5 gap-3 pb-8">
              {filteredMovies.map((movie, index) => (
                <MemorizeMovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={isFavorite(movie)}
                  toggleFavorite={() => toggleFavorite(movie)}
                  lastMovieElementRef={
                    filteredMovies.length === index + 1
                      ? lastMovieElementRef
                      : null
                  }
                />
              ))}
            </div>
            {loading && <Loader />}
            {!loading && filteredMovies.length === 0 && (
              <NoDataLoader text="No Matching Movies Found" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MoviesList;
