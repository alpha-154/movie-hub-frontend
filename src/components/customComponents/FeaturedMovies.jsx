import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const featuredMovieData = [
  {
    id: 1,
    title: "Annapurna Base Camp Trek",
    image: "https://images.pexels.com/photos/29435883/pexels-photo-29435883/free-photo-of-snow-capped-mountain-under-clear-sky.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Experience the majestic Annapurna range while participating in sustainable tourism practices.",
    cost: 1200,
    location: "Nepal",
    ecoFriendlyFeatures: [
      "Solar-powered lodges",
      "Waste management program",
      "Local community support"
    ],
    duration: "5days",
    adventureLevel: "Intermediate",
    maxGroupSize: "4",
  },
  {
    id: 2,
    title: "Mount Kilimanjaro Green Route",
    image: "https://images.pexels.com/photos/29424931/pexels-photo-29424931/free-photo-of-majestic-rocky-canyon-with-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Climb Africa's highest peak through an eco-conscious route with minimal environmental impact.",
    cost: 2800,
    location: "Tanzania",
    ecoFriendlyFeatures: [
      "Zero plastic policy",
      "Reforestation project",
      "Indigenous guide program"
    ],
    duration: "3days",
    adventureLevel: "Advanced",
    maxGroupSize: "3",
  },
  {
    id: 3,
    title: "Patagonia Eco Trail",
    image: "https://images.pexels.com/photos/29420691/pexels-photo-29420691/free-photo-of-dramatic-snowy-mountain-landscape-in-tirol.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Trek through pristine wilderness while learning about conservation efforts.",
    cost: 3200,
    location: "Argentina",
    ecoFriendlyFeatures: [
      "Wildlife conservation",
      "Sustainable camping",
      "Native species protection"
    ],
    duration: "7days",
    adventureLevel: "Intermediate",
    maxGroupSize: "10",
  },
  {
    id: 4,
    title: "Alps Sustainable Trek",
    image: "https://images.pexels.com/photos/29430724/pexels-photo-29430724/free-photo-of-majestic-mountain-range-during-autumn-daytime.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Experience the European Alps with minimal environmental footprint.",
    cost: 2400,
    location: "Switzerland",
    ecoFriendlyFeatures: [
      "Green transportation",
      "Eco-lodging",
      "Local food sourcing"
    ],
    duration: "3days",
    adventureLevel: "Intermediate",
    maxGroupSize: "7",
  },
  {
    id: 5,
    title: "Himalayan Village Trek",
    image: "https://images.pexels.com/photos/28624276/pexels-photo-28624276/free-photo-of-majestic-glacial-waterfalls-on-rocky-cliffs.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Connect with local communities while exploring remote Himalayan trails.",
    cost: 1800,
    location: "Bhutan",
    ecoFriendlyFeatures: [
      "Cultural preservation",
      "Renewable energy use",
      "Traditional farming support"
    ],
    duration: "5days",
    adventureLevel: "Intermediate",
    maxGroupSize: "4",
  },
  {
    id: 6,
    title: "Himalayan Village Trek",
    image: "https://images.pexels.com/photos/28624276/pexels-photo-28624276/free-photo-of-majestic-glacial-waterfalls-on-rocky-cliffs.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Connect with local communities while exploring remote Himalayan trails.",
    cost: 1800,
    location: "Bhutan",
    ecoFriendlyFeatures: [
      "Cultural preservation",
      "Renewable energy use",
      "Traditional farming support"
    ],
    duration: "5days",
    adventureLevel: "Intermediate",
    maxGroupSize: "4",
  }
];

const FeaturedMovies = () => {
    const navigate = useNavigate();
  return (
    <section id='adventures' className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10">
      <div className="container mx-auto px-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMovieData.map((adventure) => (
            <div
              key={adventure.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={adventure.image}
                  alt={adventure.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full shadow-md">
                  <span className="font-semibold text-blue-600">
                    ${adventure.cost}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {adventure.title}
                  </h3>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {adventure.location}
                </div>

                <p className="text-gray-600">
                  {adventure.description}
                </p>

                <button onClick={() => navigate(`/movie-details/${adventure.id}`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center mt-10'>
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