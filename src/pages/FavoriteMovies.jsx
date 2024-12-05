import React from 'react'
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import MovieCard from "@/components/customComponents/MovieCard";
import { getAllFavoritesMovies } from '@/api';
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const FavouriteMovies = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getAllFavoritesMovies(user.displayName);
        setMovies(response.data?.favoriteMovies);
        console.log("movies", response.data?.favoriteMovies);
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
                 <MovieCard key={movie._id} movie={movie} viewDetails={true}  deleteMovieButton={false}  addToWatchList={false} deleteFromWatchList={true} />
                ))}
              </div>
            ) : (
              <h1>No movies added yet!</h1>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default FavouriteMovies;
