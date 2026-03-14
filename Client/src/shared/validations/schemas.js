import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "Enter valid email." }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 characters long." }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be unique." }),
  email: z.email({ message: "Enter valid email." }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long." }),
});

const adminMovieSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),

  poster: z.string().url("Poster must be a valid URL"),

  description: z.string().min(10, "Description is too short"),

  movieId: z.coerce.number({
    invalid_type_error: "Movie ID must be a number",
  }),

  releaseDate: z.string().min(1, "Release date is required"),

  trailer: z.string().min(3, "Trailer ID is required"),

  genre: z.string().min(2, "Genre is required"),

  category: z.enum(["movie", "tv"]),
});

export { loginSchema, registerSchema, adminMovieSchema };
