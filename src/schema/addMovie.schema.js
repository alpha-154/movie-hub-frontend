import { z } from "zod";

const addMovieSchema = z.object({
    uploadedBy: z.string(),
    title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
    posterImg: z.string(),
    genre: z.array(z.string()),
    duration: z.string(),
    releaseYear: z.string(),
    rating: z.number(),
    description: z.string(),
  });

export {
    addMovieSchema
}