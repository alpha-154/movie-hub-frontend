import React from "react";
import { useState, useEffect } from "react";
import { getAllMovies } from "@/api";
import { Loader2 } from "lucide-react";
import MovieCard from "@/components/customComponents/MovieCard";


const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getAllMovies();
        setMovies(response.data?.movies);
        console.log("movies", response.data?.movies);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section
      id="featured-movies"
      className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10 mt-10"
    >
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="text-red-500 animate-spin" />
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map((movie) => (
                 <MovieCard key={movie._id} movie={movie} viewDetails={true}  deleteMovieButton={false} addToWatchList={false} deleteFromWatchList={false} />
                ))}
              </div>
            ) : (
              <h1>No movies added!</h1>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllMovies;
