import MovieCard from '@/components/customComponents/MovieCard';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getMovieById } from '@/api';

const AdventureDetails = () => {
  // Use React Router's useParams to get the ID from URL
  const { id } = useParams();
  console.log("id", id);

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await getMovieById(id);
        setMovie(response.data?.movie);
        console.log("movie", response.data?.movie);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    if(id){
      fetchMovie();
    }

  }, [id]);


 
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      { loading ? ( 
        
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="text-red-500 animate-spin" />
              <p>Loading...</p>
            </div>
          </div>
      
      ) : (
        <>
         { movie ? ( 
          <MovieCard movie={movie} viewDetails={false} deleteMovieButton={true} addToWatchList={true} deleteFromWatchList={false} updateButton={true} />): (
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <p>Movie not found</p>
              </div>
            </div>
          )}
        </>
      )}
      
      </div>
    </div>
  );
};

export default AdventureDetails;