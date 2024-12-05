import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { getTopRatedMovies } from "@/api";
import MovieCard from "./MovieCard";
import { Loader2 } from "lucide-react";

const FeaturedMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getTopRatedMovies();
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
      className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10"
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
                  <MovieCard key={movie._id} movie={movie} viewDetails={true} deleteMovie={false} addToWatchList={false} deleteFromWatchList={false} />
                ))}
              </div>
            ) : (
              <h1>No movies added yet!</h1>
            )}
          </>
        )}
        <div className="flex justify-center items-center mt-10">
          <Button
            onClick={() => navigate("/all-movies")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            View All Movies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
