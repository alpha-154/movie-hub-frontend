import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Film, Star } from 'lucide-react'

// Fake movie data
const moviesData = [
  {
    id: 1,
    name: "Inception",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWnBnPN47nWvqWJAxw-vmchKc_2u1zkG6Bw&s",
    rating: 8.8,
    boxOffice: "$836.8M",
    genre: "hollywood"
  },
  {
    id: 2,
    name: "3 Idiots",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTHxnS2_93lmU8R0dqTTbSMlrG8IjuFPUzng&s",
    rating: 8.4,
    boxOffice: "$90.3M",
    genre: "bollywood"
  },
  {
    id: 3,
    name: "Parasite",
    image: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 8.6,
    boxOffice: "$258.7M",
    genre: "korean"
  },
  {
    id: 4,
    name: "The Dark Knight",
    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
    rating: 9.0,
    boxOffice: "$1.005B",
    genre: "hollywood"
  },
  {
    id: 5,
    name: "Dangal",
    image: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_FMjpg_UX1000_.jpg",
    rating: 8.4,
    boxOffice: "$330.6M",
    genre: "bollywood"
  },
  {
    id: 6,
    name: "Jawan",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_y_apBYq-sLRNVO6L6GLIcEeL43DGaPqULg&s",
    rating: 8.4,
    boxOffice: "$330.6M",
    genre: "bollywood"
  },
  // Add more movie objects as needed
]

const MovieCard = ({ movie }) => (
  <Card className="w-full max-w-sm mx-auto">
    <CardContent className="p-4">
      <img src={movie.image} alt={movie.name} className="w-full h-64 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{movie.name}</h3>
      <div className="flex items-center mb-2">
        <Star className="w-5 h-5 text-yellow-400 mr-1" />
        <span>{movie.rating}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Box Office: {movie.boxOffice}</p>
      <p className="text-sm text-gray-600 capitalize">{movie.genre}</p>
    </CardContent>
  </Card>
)

const TopMoviesSection = () => {
  const [filter, setFilter] = useState('all')

  const filteredMovies = filter === 'all' 
    ? moviesData 
    : moviesData.filter(movie => movie.genre === filter)

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Top Earning Movies</h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
        >
          All
        </Button>
        <Button 
          onClick={() => setFilter('hollywood')}
          variant={filter === 'hollywood' ? 'default' : 'outline'}
        >
          <Film className="mr-2 h-4 w-4" /> Hollywood
        </Button>
        <Button 
          onClick={() => setFilter('bollywood')}
          variant={filter === 'bollywood' ? 'default' : 'outline'}
        >
          <Film className="mr-2 h-4 w-4" /> Bollywood
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default TopMoviesSection

