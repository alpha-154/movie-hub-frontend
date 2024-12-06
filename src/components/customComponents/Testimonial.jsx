import React from 'react';
import { motion } from 'framer-motion';
import avenger from "../../../public/avengers.jpg"
import squidgame from "../../../public/squidgame.jpg";
import oppenheimer from "../../../public/oppenheimer.jpg";
import topgun from "../../../public/topgun.jpg";
import spiderman from "../../../public/spiderman.jpg";
import batman from "../../../public/thebatman.jpg";

const testimonials = [
    {
      id: 1,
      movieName: "Avengers",
      image: avenger,
      description: "Earth's mightiest heroes unite to stop Loki and his alien army from subjugating the planet." 
    },
    {
      id: 2,
      movieName: "Squid Game",
      image: squidgame,
      description: "Contestants in dire financial straits risk their lives in deadly children's games for a huge cash prize." 
    },
    {
      id: 3,
      movieName: "Oppenheimer",
      image: oppenheimer,
      description: "A biographical drama about J. Robert Oppenheimer and the creation of the atomic bomb during World War II." 
    },
    {
      id: 4,
      movieName: "The Batman",
      image: batman,
      description: "Batman uncovers corruption in Gotham City while hunting a sadistic serial killer called the Riddler." 
    },
    {
      id: 5,
      movieName: "Top Gun",
      image: topgun,
      description: "A daring pilot navigates love, rivalry, and high-octane aerial maneuvers in an elite naval flight school." 
    },
    {
      id: 6,
      movieName: "Spiderman",
      image: spiderman,
      description: "Peter Parker embraces his dual life as Spider-Man to battle villains and protect New York City." 
    }
  ];
  
const TestimonialSection = () => {
  return (
    <div className="w-full py-16 bg-slate-50  mt-14 md:mt-20 px-6 border rounded-xl overflow-hidden mb-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Blockbuster Movies
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover the thrill of blockbuster movies and relive the excitement of the big screen.
          </p>
        </div>

        {/* Testimonial Carousel */}

        <div className="max-md:max-w-[400px]  overflow-hidden mt-5">
          <motion.div
            className="relative flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
          >
            {/* First set of cards */}
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.movieName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{testimonial.movieName}</h3>
                   
                  </div>
                </div>
                <p className="text-slate-700 line-clamp-2">{testimonial.description}</p>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div
                key={`${testimonial.id}-duplicate`}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.movieName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{testimonial.movieName}</h3>
                   
                  </div>
                </div>
                <p className="text-slate-700 line-clamp-2">{testimonial.description}</p>
              </div>
            ))}
          </motion.div>
        </div> 

     
      </div>
    </div>
  );
};

export default TestimonialSection;