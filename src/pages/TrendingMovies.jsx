import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const trendingMovieData = [
    {
      movie: "Barbie 2",
      country: "USA",
      boxOfficeCollection: "$750M",
      genre: "Fantasy/Comedy",
    },
    {
      movie: "Pushpa: The Rule - Part 2",
      country: "India",
      boxOfficeCollection: "$400M",
      genre: "Action/Thriller",
    },
    {
      movie: "Escape",
      country: "South Korea",
      boxOfficeCollection: "$150M",
      genre: "Drama/Thriller",
    },
    {
      movie: "Fighter",
      country: "India",
      boxOfficeCollection: "$350M",
      genre: "Action/Romance",
    },
    {
      movie: "Avatar: The Last Airbender",
      country: "USA",
      boxOfficeCollection: "$900M",
      genre: "Fantasy/Adventure",
    },
    {
      movie: "Seeking the King",
      country: "South Korea",
      boxOfficeCollection: "$250M",
      genre: "Sci-Fi/Drama",
    },
    {
      movie: "Dune: Part Two",
      country: "USA",
      boxOfficeCollection: "$600M",
      genre: "Sci-Fi/Adventure",
    },
  ];
  

const TrendingMovies = () => {
  return (
    <div className="w-full mx-auto p-8 border border-gray-200 dark:border-gray-800 rounded-md my-4">
      <Table>
        <TableCaption>A list of trending movies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Movie</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead className="text-right">Box Office Collection</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trendingMovieData.map((movie) => (
            <TableRow key={movie.invoice}>
              <TableCell className="font-medium">{movie.movie}</TableCell>
              <TableCell>{movie.country}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell className="text-right">
                {movie.boxOfficeCollection}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          
        </TableFooter>
      </Table>
    </div>
  );
};

export default TrendingMovies;
