import React from 'react'
import { useNavigate } from "react-router-dom";
import { Camera, Clock, Star } from 'lucide-react'
import { Button } from '../ui/button';
import { auth } from "@/firebase";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteMovie, addToFavorite,  removeMovieFromFavorite  } from '@/api';

const MovieCard = ({movie, viewDetails, deleteMovieButton, addToWatchList , deleteFromWatchList, updateButton}) => {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleDeleteMovie = async() => {
    try {
      const response = await deleteMovie({ 
        username: user.displayName,
        movieId: movie._id,
      })
      if(response.status === 200){
        toast.success("Movie deleted successfully!");
        navigate("/all-movies");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  }

  const handleAddToFavoriteList = async() => {
    try {
      const response = await addToFavorite({ 
        username: user.displayName,
        movieId: movie._id,
      })
      if(response.status === 200){
        toast.success("Movie added to watchlist successfully!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  }

  const handleRemoveMovieFromFavoriteList = async() => {
    try {
      const response = await removeMovieFromFavorite({ 
        username: user.displayName,
        movieId: movie._id,
      })
      if(response.status === 200){
        toast.success("Movie added to watchlist successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
    window.Reload();
  }



  return (
    <div
    className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 dark:border dark:border-gray-800"
  >
    <div className="relative aspect-[4/3]">
      <img
        src={movie.posterImg}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 px-4 py-1 rounded-full shadow-md">
        <span className="font-semibold text-blue-600">
          ⭐️{movie.rating}
        </span>
      </div>
    </div>

    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <Camera size={16} />
        <span>{movie.genre?.join(", ")}</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <Clock size={16} />
        <span>{movie.duration} hours</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <Star size={16} />
        <span>{movie.rating}</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <span>Uploaded by: {movie.uploadedBy}</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <span>Release Year: {movie.releaseYear}</span>
      </div>
      {
        deleteMovieButton && addToWatchList &&(
          <div className='max-w-sm flex items-center space-x-2 mb-2 '>
          <p>Description: {movie.description}</p>
        </div>
        )
      }
     
      <div className='flex flex-col gap-2'>
      { viewDetails && (
         <Button onClick={() => navigate(`/movie-details/${movie._id}`)}>View Details</Button>
      )}
      { deleteMovieButton && addToWatchList && (
        <div className='flex gap-2 items-center justify-start'>
          <Button   onClick={handleDeleteMovie}>Delete</Button>
          <Button onClick={handleAddToFavoriteList}>Add to Watchlist</Button>

          <Button onClick={() => navigate(`/update-movie/${movie._id}`)}  >Update</Button>

        </div>
      )}
     {  deleteFromWatchList && (
       <Button className='' onClick={handleRemoveMovieFromFavoriteList}>Remove from Watchlist</Button>
     )}
      </div>
    
    
     
    </div>
  </div>
  )
}

export default MovieCard
