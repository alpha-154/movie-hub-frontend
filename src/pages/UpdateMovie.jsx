import React, { useState, useEffect } from "react";
import axios from "axios";
import { addMovieSchema } from "@/schema/addMovie.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {  updateMovie , getMovieById} from "@/api";
import { Rating } from "react-simple-star-rating";


const UpdateMovie = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(movie?.posterImg || null);
  const [preview, setPreview] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState( movie?.genre || []);
  const [rating, setRating] = useState(movie?.rating || 0);


  const form = useForm({
    resolver: zodResolver(addMovieSchema),
    defaultValues: {
      uploadedBy: movie?.uploadedBy || "",
      title: movie?.title || "",
      posterImg: movie?.posterImg || "",
      genre: movie?.genre || [],
      duration:  movie?.duration || "",
      releaseYear: movie?.releaseYear || "",
      rating: movie?.rating || 0,
      description: movie?.description || "",
    },
  });


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setFetchLoading(true);
        const response = await getMovieById(id);
        setMovie(response.data?.movie);
        console.log("movie", response.data?.movie);
      } catch (error) {
        console.log("error", error);
      } finally {
        setFetchLoading(false);
      }
    };

    if(id){
      fetchMovie();
    }

  }, [id]);


  // Update form data when movie state changes
  useEffect(() => {
    form.reset({
      uploadedBy: movie?.uploadedBy || "",
      title: movie?.title || "",
      posterImg: movie?.posterImg || "",
      genre: movie?.genre || [],
      duration: movie?.duration || "",
      releaseYear: movie?.releaseYear || "",
      rating: movie?.rating || 0,
      description: movie?.description || "",
    });
    setSelectedGenres(movie?.genre || []);
    setRating(movie?.rating || 0);
    setImage(movie?.posterImg || null);
    setPreview(movie?.posterImg || null);
  }, [movie, form]);


  
  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB.");
    } else {
      setImage(file || null);
      console.log("image", image);
      setPreview(URL.createObjectURL(file)); // Image preview
    }
  };

  // Handle genre selection
  const handleGenreSelection = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    console.log("selectedGenres", selectedGenres);
  };

  
  const handleRatingChange = (newRating) => {
    setRating(newRating); // Convert ratingValue to 1-5 scale
    console.log("Rating:", newRating);
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      let imageUrl = "";

      if (image && image !== movie?.posterImg) {
        console.log("image-> onSubmit()", image);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "user_profile_image");

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dyy7hjubd/image/upload`,
          formData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }
      else if (image === movie?.posterImg) {
        imageUrl = movie?.posterImg

      }

      const addMovieData = {
        ...data,
        genre: selectedGenres,
        rating: rating, // Convert rating to a 1-10 scale
        posterImg: imageUrl,
      };
      console.log("updateMovieData", addMovieData);

      const response = await updateMovie(addMovieData);

      if (response.status === 201) {
        toast.success("Movie added successfully!");
        form.reset();
        setImage(null);
        setPreview(null);
        setLoading(false);
        setRating(0);
        setSelectedGenres([]);
        navigate("/all-movies");
      }
    } catch (err) {
      setLoading(false);
      form.reset();
      setImage(null);
      setPreview(null);
      setRating(0);
        setSelectedGenres([]);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      { !movie  ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-gray-200 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="uploadedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uploader Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Johndoe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Avengers" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posterImg"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Movie Poster</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2"
              />
            )}
            <FormField
              control={form.control}
              name="genre"
              render={() => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={handleGenreSelection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Genre(s)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comedy">Comedy</SelectItem>
                      <SelectItem value="Horror">Horror</SelectItem>
                      <SelectItem value="Action">Action</SelectItem>
                      <SelectItem value="Drama">Drama</SelectItem>
                      <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-2">
                    Selected Genres: {selectedGenres.join(", ")}
                  </p>
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
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="2:28" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Year</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="2023" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Add a description..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {loading ? (
                <Button disabled>
                  <span>Adding...</span>
                </Button>
              ) : (
                <Button type="submit">Update Movie</Button>
              )}
            </div>
          </form>
        </Form>
      </div>
       )}
     
    </div>
  );
};

export default UpdateMovie;