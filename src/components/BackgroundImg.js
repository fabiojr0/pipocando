import { useEffect, useState } from "react";
import { Clock, Calendar } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const BackgroundImg = (props) => {
    const [movieRuntime, setMovieRuntime] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const apiKey = "3c3f231b";
    const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${props.infos.imdbId}`;

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

return <Link to={"/item/"+ movieData.Title}>
        <div className="relative">
            <div className={props.blur ? "blur-sm bg-black h-8 w-full absolute left-0 -top-4" : ""}></div>
            <img src={props.infos.img} className="w-full mt-2 max-w-7xl max-h-[500px] object-cover sm:brightness-75 sm:mt-0" alt={movieData.Title + "img"}/>
            <div className={props.blur ? "blur-sm opacity-75 bg-black h-8 w-full absolute left-0 -bottom-1 sm:hidden" : ""}></div>
        </div>
        <div className="px-2">
            <div className="flex items-center gap-1 justify-between mt-2">
                <h1 className="text-zinc-50 text-lg sm:text-3xl">{movieData.Title}</h1>
                <div className="flex gap-4 items-center">

                {   
                    movieData.Type === "movie" 
                    ? <div className="text-zinc-400 text-sm flex gap-1 items-center sm:text-base"><Clock size={16} />{movieRuntime.hour}h{movieRuntime.min}m</div>
                    : <></>
                }
                    <div className="text-zinc-400 text-sm flex gap-1 items-center sm:text-base"><Calendar size={16}/>{movieData.Year}</div>
                </div>
            </div>
            <div className="flex items-center gap-1 justify-between">
                <p className="text-zinc-400 text-xs sm:text-xl">{movieData.Genre/*.replaceAll(","," -")*/}</p>
                <p className="text-yellow-400 text-xs flex gap-1 items-center sm:text-base"><img src={imdb} alt="imdb" className="h-4 w-4 sm:h-8 sm:w-8"/>{movieData.imdbRating}</p>
            </div>
        </div>
    </Link>
}

export default BackgroundImg;