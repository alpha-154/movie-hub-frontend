import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import avenger from "../../../public/avengers.jpg"
import squidgame from "../../../public/squidgame.jpg";
import oppenheimer from "../../../public/oppenheimer.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [avenger, squidgame, oppenheimer];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    // Image slider timer
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[80vh] w-full overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 py-8">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-gray-200 tracking-wide"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Discover Your Next Cinematic Adventure
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Stream timeless classics and the latest blockbusters—all curated
              for every mood and every movie lover.
            </p>
            <div data-aos="fade-up" data-aos-delay="600" className="flex items-center gap-4">
              <a href="#featured-movies" className="mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  Explore
                </button>
              </a>
              <Link to="/trending-movies">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  Trending
                </button>
              </Link>
            </div>

          </div>

          {/* Right Section - Image Slider */}
          <div
            className="w-full md:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide}
                  alt={`Mountain trek ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Slider Indicators */}
            <div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
