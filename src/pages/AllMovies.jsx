// import React from "react";
// import { useState, useEffect } from "react";
// import { getAllMovies, searchMovies } from "@/api";
// import debounce from "lodash.debounce";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import MovieCard from "@/components/customComponents/MovieCard";
// import SearchMovieCard from "@/components/customComponents/SearchMovieCard";

// const AllMovies = () => {
//   //search states
//   const [query, setQuery] = useState("");
//   const [searchFindMovies, setSearchFindMovies] = useState([]);
//   const [fetchSearcedMovieLoading, setFetchSearcedMovieLoading] =
//     useState(false);
//   const [searchClicked, setSearchClicked] = useState(false);
//   // movies states
//   const [movies, setMovies] = useState([]);

//   const [loading, setLoading] = useState(false);

//     // dynamic title on the browser's title bar
//     useEffect(() => {
//       document.title = "All Movies - Movie Hub";
//     }, []);
  


//    // >>>>>>>>>>>>>>>> Searching Movies on the Search bar >>>>>>>>>>>>>> //

//   // Debounced search function
//   const fetchMovies = debounce(async (query) => {

//     if (query.trim() === "") {
//       setSearchFindMovies([]);
//       setFetchSearcedMovieLoading(false);
//       return;
//     }
//     const data = {
//       query,
//     };
//     try {
//       setFetchSearcedMovieLoading(true); // Start loading when search begins
//       const response = await searchMovies(data);
     
//         console.log("searched user data", response.data.searchedMovies);
//       setSearchFindMovies(response.data.searchedMovies);
//     } catch (error) {
      
//         console.error("Error fetching users:", error);
//     } finally {
//       setFetchSearcedMovieLoading(false); // End loading when search completes
//     }
//   }, 300);

//   // Effect to handle input change
//   useEffect(() => {
//     fetchMovies(query);
//   }, [query]);

//   // Cancel debounce on component unmount to avoid potential memory leaks
//   useEffect(() => {
//     return () => fetchMovies.cancel();
//   }, []);

//   // Handle search button click
//   const handleSearch = () => {
//     setSearchClicked(true);
//     fetchMovies(query);
//   };





//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllMovies();
//         setMovies(response.data?.movies);
//         console.log("movies", response.data?.movies);
//       } catch (error) {
//         console.log("error", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <section
//       id="featured-movies"
//       className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10 mt-10"
//     >
//       {/* Search movies input field  */}
//       <div className="flex flex-col gap-1 mb-10">
//         <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 md:mb-10">All Movies</h1>
//         <div className="flex items-center gap-2">
//           <Input
//             value={query}
//             className="text-sm "
//             placeholder="Search for a movie"
//             onChange={(e) => {
//               setQuery(e.target.value);
//               setFetchSearcedMovieLoading(true); // Show "searching the user..." message while typing
//               setSearchClicked(false); // Reset search click
//             }}
//           />
//           <Button
//             variant="default"
//             className="text-sm "
//             onClick={handleSearch}
//           >
//             Search
//           </Button>
//         </div>
//         <div className="max-h-[300px] flex flex-col items-center gap-2 p-4 overflow-y-auto">
//           {/* Show loading message */}
//           {fetchSearcedMovieLoading && !searchClicked ? (
//             <p className="text-sm ">
//               Searching the movie...
//             </p>
//           ) : (
//             <>
//               {/* Show search results or "No users found" based on results */}
//               {
//                 searchFindMovies.length > 0 ? (
//                   <>
//                     <h1 className="text-sm ">
//                       Available Movies:
//                     </h1>
//                     {searchFindMovies.map((movie, index) => (
//                       <SearchMovieCard
//                         key={index}
//                         movie={movie}
//                       />
//                     ))}
//                   </>
//                 ) : (
//                   query.length !== 0 &&
//                   searchFindMovies.length === 0 && (
//                     <p className="text-sm ">No movies found!</p>
//                   )
//                 ) // Show "No users found" only if search button is clicked
//               }
//             </>
//           )}
//         </div>
//       </div>

  


//       <div className="container mx-auto px-4">
//         {loading ? (
//           <div className="flex items-center justify-center">
//             <div className="flex items-center space-x-2">
//               <Loader2 className="text-red-500 animate-spin" />
//               <p>Loading...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {movies.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {movies.map((movie) => (
//                  <MovieCard key={movie._id} movie={movie} viewDetails={true}  deleteMovieButton={false} addToWatchList={false} deleteFromWatchList={false} />
//                 ))}
//               </div>
//             ) : (
//               <h1>No movies added!</h1>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllMovies;


import React from "react";
import { useState, useEffect } from "react";
import { getAllMovies, searchMovies } from "@/api";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import MovieCard from "@/components/customComponents/MovieCard";
import SearchMovieCard from "@/components/customComponents/SearchMovieCard";

const AllMovies = () => {
  const [query, setQuery] = useState("");
  const [searchFindMovies, setSearchFindMovies] = useState([]);
  const [fetchSearcedMovieLoading, setFetchSearcedMovieLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    document.title = "All Movies - Movie Hub";
  }, []);

  const fetchMovies = debounce(async (query) => {
    if (query.trim() === "") {
      setSearchFindMovies([]);
      setFetchSearcedMovieLoading(false);
      return;
    }
    const data = { query };
    try {
      setFetchSearcedMovieLoading(true);
      const response = await searchMovies(data);
      setSearchFindMovies(response.data.searchedMovies);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setFetchSearcedMovieLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  useEffect(() => {
    return () => fetchMovies.cancel();
  }, []);

  const handleSearch = () => {
    setSearchClicked(true);
    fetchMovies(query);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedMovies = [...movies].sort((a, b) => {
      if (order === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setMovies(sortedMovies);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getAllMovies();
        setMovies(response.data?.movies);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10 mt-10">
      <div className="flex flex-col gap-1 mb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 md:mb-10">All Movies</h1>
        <div className="flex items-center gap-2">
          <Input
            value={query}
            className="text-sm"
            placeholder="Search for a movie"
            onChange={(e) => {
              setQuery(e.target.value);
              setFetchSearcedMovieLoading(true);
              setSearchClicked(false);
            }}
          />
          <Button
            variant="default"
            className="text-sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant={sortOrder === 'asc' ? "default" : "outline"}
            className="text-sm flex items-center gap-2"
            onClick={() => handleSort('asc')}
          >
            <ArrowUpCircle className="h-4 w-4" />
            Rating Ascending
          </Button>
          <Button
            variant={sortOrder === 'desc' ? "default" : "outline"}
            className="text-sm flex items-center gap-2"
            onClick={() => handleSort('desc')}
          >
            <ArrowDownCircle className="h-4 w-4" />
            Rating Descending
          </Button>
        </div>

        <div className="max-h-[300px] flex flex-col items-center gap-2 p-4 overflow-y-auto">
          {fetchSearcedMovieLoading && !searchClicked ? (
            <p className="text-sm">Searching the movie...</p>
          ) : (
            <>
              {searchFindMovies.length > 0 ? (
                <>
                  <h1 className="text-sm">Available Movies:</h1>
                  {searchFindMovies.map((movie, index) => (
                    <SearchMovieCard
                      key={index}
                      movie={movie}
                    />
                  ))}
                </>
              ) : (
                query.length !== 0 &&
                searchFindMovies.length === 0 && (
                  <p className="text-sm">No movies found!</p>
                )
              )}
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="text-red-500 animate-spin" />
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map((movie) => (
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    viewDetails={true}  
                    deleteMovieButton={false} 
                    addToWatchList={false} 
                    deleteFromWatchList={false} 
                  />
                ))}
              </div>
            ) : (
              <h1>No movies added!</h1>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllMovies;