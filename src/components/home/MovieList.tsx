import useDebounce from "@/hooks/useDebounce";
import { IMovie } from "@/types";
import { API_KEY, getFromLocalStorage, OMDbAPI } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { MemorizeMovieCard } from "../cards";
import { Loader, NoDataLoader } from "../core";
import MemorizeFavoriteMovieList from "./FavoriteMovieList";
import FilterBox from "./FilterBox";

interface Filters {
  Type: string;
  Year: string;
}

const MoviesList = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [favorites, setFavorites] = useState<any[]>([]);
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
  const isFavorite = (movie: any) => {
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
      <div className="main-container lg:my-12 my-6 lg:mt-[12rem]">
        <header className="bg-[#0A1121] mb-8 overflow-hidden bg-[url('/Hero-BG.png')] bg-no-repeat bg-cover bg-center p-6 text-white text-center rounded-md">
          <h1 className="text-3xl font-bold mb-2">Movie Browser</h1>
          <p className="text-slate-200">
            Discover and explore your favorite movies. Use the filters to refine
            your search and toggle between all movies and your favorites.
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="text-gray-900 bg-slate-200 border border-gray-100 px-6 py-2 rounded-md transition-colors duration-300 hover:bg-slate-300"
              onClick={() => setShowFav(!showFav)}
            >
              {showFav ? "View All Movies" : "View Favorites"}
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
          <aside>
            <div className="w-full">
              {filteredMovies && filteredMovies.length === 0 ? (
                <NoDataLoader text="No Movies Found" />
              ) : loading ? (
                <Loader />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
                  {filteredMovies.map((data: any, index: number) => {
                    if (filteredMovies.length === index + 1) {
                      return (
                        <div key={data.imdbID} ref={lastMovieElementRef}>
                          <MemorizeMovieCard
                            movie={data}
                            isFavorite={isFavorite(data)}
                            toggleFavorite={() => toggleFavorite(data)}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={data.imdbID}>
                          <MemorizeMovieCard
                            movie={data}
                            isFavorite={isFavorite(data)}
                            toggleFavorite={() => toggleFavorite(data)}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              )}
              {loading && (
                <div className="flex items-center justify-center h-[5rem] w-full">
                  <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default MoviesList;
