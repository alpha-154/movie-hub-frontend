import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchMovieCard = ({movie}) => {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/movie-details/${movie._id}`)} className='max-w-sm flex flex-col gap-2 border border-gray-300 rounded-md p-2 cursor-pointer'>
      <div className='w-[150px] h-[200px] border rounded-full'>
      <img
        src={movie.posterImg}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      </div>
      <div>
        <h2 className='text-md font-semibold'>{movie.title}</h2>
      </div>
    </div>
  )
}

export default SearchMovieCard
