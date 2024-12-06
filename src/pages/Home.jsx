import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Hero from "@/components/customComponents/Hero";
import FeaturedMovies from "../components/customComponents/FeaturedMovies";
import ReviewMovie from "@/components/customComponents/ReviewMovie";
import TestimonialSection from "@/components/customComponents/Testimonial";

const Home = () => {
  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Home - Movie Hub";
  }, []);

  // State initialized from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update theme based on state
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-start space-x-2 mt-4 md:mb-10 ">
        <div className="flex items-center justify-start gap-2 border border-gray-200 dark:border-gray-600 p-2 rounded-lg">
        <Switch
          id="theme-switch"
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
        />
        <Label htmlFor="theme-switch">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Label>
        </div>
       
      </div>
      <Hero/>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-gray-200 tracking-wide text-center mb-5 md:mb-10">Featured Movies</h1>
      <FeaturedMovies/>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-gray-200 tracking-wide text-center mb-5 md:mb-10">Review Movie</h1>
      <ReviewMovie/>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-gray-200 tracking-wide text-center mb-5 md:mb-10">Users Reviews</h1>
      <TestimonialSection/>
    </div>
  );
};

export default Home;
