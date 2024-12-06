import React from "react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reviewMovie } from "@/api";

const ReviewMovie = () => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      movieName: "",
      movieReview: "",
      rating: 0,
    },
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log("Rating:", newRating);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      const reviewMovieData = {
        ...data,

        rating: rating,
      };
      console.log("reviewMovieData", reviewMovieData);

      const response = await reviewMovie(reviewMovieData);

      if (response.status === 201) {
        toast.success("Movie review successful!");
        form.reset();

        setLoading(false);
        setRating(0);
      }
    } catch (err) {
      console.log("err", err);
      form.reset();

      setRating(0);

      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 border border-gray-300 dark:border-gray-800 rounded-md mb-10">
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Johndoe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movieName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Johndoe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movieReview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Review</FormLabel>
                  <FormControl>
                    <Textarea type="text" placeholder="Johndoe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  {/* Rating Component */}
                  <div>
                    <Rating
                      className="flex items-center justify-center"
                      onClick={handleRatingChange}
                      ratingValue={rating} // Convert to percentage for rendering
                      size={30} // Adjust star size
                      allowHalfIcon={false} // Disable half stars
                    />
                    <p className="mt-2 text-gray-600">
                      Current Rating: {rating} / 5
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {loading ? (
                <Button disabled>
                  <span>Reviewing...</span>
                </Button>
              ) : (
                <Button type="submit">Add Movie Review</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReviewMovie;
