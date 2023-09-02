import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, FilmReel, Video, } from "@phosphor-icons/react";

const Search = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("Spider man");
  const [type, setType] = useState(false);
    const numPages = 3;

    const apiKey = "3c3f231b"
    
    useEffect(() => {
        const fetchMovieData = async () => {
            
        const movies = [];
        for(let page = 1; page <= numPages; page++) {
        
            const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTitle}&type=${type === true ? "series": "movie"}&page=${page}`        
            
            try {
                const response = await fetch(searchUrl);
                const data = await response.json();

                if (data.Search) {
                    movies.push(...data.Search);
                    
                } else {
                    break;
                    
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        }
            setMovieData(movies);
        };

        fetchMovieData();
    }, [searchTitle, type]);

    const handleInputChange = (event) => {
        setSearchTitle(event.target.value.length > 3 ? event.target.value : "Spider man");
    }
    
    const handleCheckboxChange = () => {
        setType(!type); 
    };

  return (
    <div className="px-2 pt-2">
        <div className="relative flex items-center px-2 w-full  gap-2">
            <MagnifyingGlass size={20} className="text-black absolute ms-1"/>
            <input 
                className="pl-6 pt-2 pb-1 rounded text-lg"
                type="text"
                onChange={handleInputChange}
                placeholder="Search movie"
            />
            <input type="checkbox" 
                id="checkboxInput" 
                onChange={handleCheckboxChange}
            />
            <label for="checkboxInput" className="toggleSwitch">

                <div className="movie flex flex-col items-center">
                    <FilmReel size={20} className="text-zinc-50"/>
                    <p className="text-zinc-50 text-xs">Movie</p>
                </div>

                <div className="series flex flex-col items-center">
                    <Video size={20} className="text-zinc-50"/>
                    <p className="text-zinc-50 text-xs">Series</p>
                </div>

            </label>

        </div>
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5  gap-2 place-items-center pt-4">
            {  movieData.map((item) => {
                return <Link to={"/item/"+ item.Title} className="flex flex-col items-center group/photo" key={item.imbdId}><img src={item.Poster} className="rounded-md h-full max-h-44 object-cover" alt={item.Title}/><p className="text-zinc-50 text-xs scale-0 sm:text-sm group-hover/photo:scale-100 transition-all">{item.Title}</p></Link>
            })}
        </ul>
        <div className="h-16 bg-black w-full"></div>    
    </div>
  );
};

export default Search;
