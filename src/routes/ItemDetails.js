import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, Calendar } from "@phosphor-icons/react";

const ItemDetails = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState([]);
    const [movieRuntime, setMovieRuntime] = useState([]);


    const apiKey = "3c3f231b";
    const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${id}`;

    useEffect(() => {
        const fetchMovieData = async () => {
        try {
            const response = await fetch(searchUrl);
            const data = await response.json();
    
            setMovieData(data);

            var runtime = Number(data.Runtime.replace("min",""))
            var hour = 0;
            while (runtime - 60 > 1) {
                hour++;
                runtime -= 60
            }
            setMovieRuntime({hour: hour, min: runtime})
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        }
        };

        fetchMovieData();
    }, [searchUrl]);

    const imdb = process.env.PUBLIC_URL + '/assets/imdb.png'

    return <div className="sm:flex sm:gap-2 items-center justify-center w-screen h-screen">
            
        <img src={movieData.Poster} className="w-xs max-sm:w-full max-h-[520px] sm:rounded-lg" alt={movieData.Title}/>
        
        <div className="flex flex-col sm:gap-4 w-4/6">
            <div className="w-full flex flex-col items-center sm:items-start justify-center gap-2 pt-2 px-2">
                <p className="text-zinc-400 text-sm sm:text-xl order-2">{movieData.Genre}</p>
                <h1 className="text-zinc-50 text-2xl text-center sm:text-start">{movieData.Title}</h1>
            </div>
            <div className="w-full flex items-center justify-between gap-2 pt-1 px-2 sm:-order-first sm:justify-normal">
                {
                    movieData.imdbRating !== "N/A" 
                    ? <p className="text-yellow-400 text-xs flex gap-1 items-center"><img src={imdb} alt="imdb" className="h-4 w-4 sm:h-8 sm:w-8"/>{movieData.imdbRating}</p>
                    : <></>
                }
                <div className="flex gap-2">
                {
                    movieData.Awards !== "N/A" 
                    ? <div className="text-zinc-400 text-sm flex gap-1 items-start"><Clock size={16} />{movieRuntime.hour}h{movieRuntime.min}m</div>
                    : <></>    
                }
                <div className="text-zinc-400 text-sm flex gap-1 items-start"><Calendar size={16}/>{movieData.Year}</div>
                </div>
            </div>
            
            <div className="flex flex-col justify-between pt-2 px-2 gap-2">
                <p className="text-zinc-50 text-sm sm:text-xl"><strong className="text-base sm:text-2xl">Description:</strong> {movieData.Plot}</p>
                <p className="text-zinc-50 text-sm sm:text-xl"><strong className="text-base sm:text-2xl">Actors:</strong> {movieData.Actors}</p>
                {
                    movieData.Awards !== "N/A" 
                    ? <p className="text-zinc-50 text-sm sm:text-xl"><strong className="text-base sm:text-2xl">Awards:</strong> {movieData.Awards}</p>
                    : <></>
                }
                <p className="text-zinc-50 text-sm sm:text-xl"><strong className="text-base sm:text-2xl">Director:</strong> {movieData.Director}</p>
                <p className="text-zinc-50 text-sm sm:text-xl"><strong className="text-base sm:text-2xl">Writer:</strong> {movieData.Writer}</p>
            </div>    
        </div>
            <div className="h-16 bg-black w-full sm:hidden"></div>

    </div>
}

export default ItemDetails;