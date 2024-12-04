import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Adventure Data
const adventuresData = [
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
  }
];

const AdventureDetails = () => {


  


  const [trekData, setTrekData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Use React Router's useParams to get the ID from URL
  const { id } = useParams();

  useEffect(() => {
    // Find trek data based on ID from URL params
    const trek = adventuresData.find(trek => trek.id === parseInt(id));
    setTrekData(trek);
  }, [id]);

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `${trekData?.title} - Mountain Trek`;
  }, [trekData]);

  const handleExpertTalk = () => {
    const hours = currentTime.getHours();
    if (hours >= 10 && hours < 20) {
      // Open Google Meet in new tab (replace with actual meet link)
      window.open('https://meet.google.com', '_blank');
    } else {
      setShowModal(true);
    }
  };

  if (!trekData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Trek Image */}
        <div className="h-64 w-full relative">
          <img
            src={trekData.image}
            alt={trekData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Trek Details */}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{trekData.title}</h1>
              <p className="mt-2 text-gray-600">{trekData.location}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">${trekData.cost}</p>
              <p className="text-gray-600">{trekData.duration}</p>
            </div>
          </div>

          <p className="mt-6 text-gray-700">{trekData.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Adventure Details</h2>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Level:</span>
                  {trekData.adventureLevel}
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Max Group:</span>
                  {trekData.maxGroupSize} people
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Eco-Friendly Features</h2>
              <ul className="mt-4 space-y-2">
                {trekData.ecoFriendlyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleExpertTalk}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Talk with Expert
            </button>
          </div>
        </div>
      </div>

      {/* Consultation Time Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultation Hours</h2>
            <p className="text-gray-600 mb-6">
              Our experts are available for consultation between 10:00 AM and 8:00 PM.
              Please come back during these hours to connect with an expert.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventureDetails;