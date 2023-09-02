import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carrossel = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const apiLinks = {
    omdb: {
      apiKey: "3c3f231b",
      url: `https://www.omdbapi.com/?apikey=3c3f231b&s=${props.searchTitle}&type=${props.type}`
    },
    tmdb: {
      apiKey: "896f6ef616f8b91cced6474f3c483088",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=896f6ef616f8b91cced6474f3c483088&language=en-US&page=${props.page}`
    }
  }

  const searchUrl = props.searchTitle === "Popular" ? apiLinks.tmdb.url : apiLinks.omdb.url;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        if (data.Search || data.results) {
          setMovieData(props.searchTitle === "Popular" ? data.results : data.Search);

      } else {
          setMovieData([]);

      }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    };

    fetchMovieData();
  }, [searchUrl,props.searchTitle]);

  useEffect(() => {
    function changeSlidesPerView () {
      if (window.innerWidth < 440) {
        setSlidesPerView(3)
      }else if (window.innerWidth < 600){
        setSlidesPerView(4)
      }else if(window.innerWidth < 900){
        setSlidesPerView(5)
      }else {
        setSlidesPerView(7)
      }
    }
    changeSlidesPerView()
    function handleResize() {
      changeSlidesPerView()
    }

    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      
    }
    
  },[slidesPerView])


  return (
    <div className="px-2 pt-6">
        <h2 className="text-zinc-50">{props.searchTitle} {props.type === "movie" ? "movies" : props.type}</h2>
        <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation={window.innerWidth < 768 ? false : true}
        loop
        grabCursor

        >
            {props.searchTitle === "Popular" 
            ? movieData.map((item) => {
            return <SwiperSlide ><Link to={"/item/"+ item.original_title} className="group/photo"><img src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} className="rounded-md h-full max-h-44 object-cover sm:max-h-60 " alt={item.original_title}/><p className="text-zinc-50 text-sm max-sm:hidden scale-0 sm:text-sm group-hover/photo:scale-100 transition-all">{item.original_title}</p></Link></SwiperSlide>
          })
            : movieData.map((item) => {
                return <SwiperSlide ><Link to={"/item/"+ item.Title} className="group/photo"><img src={item.Poster} className="rounded-md h-full max-h-44 object-cover" alt={item.Title}/><p className="text-zinc-50 text-xs max-sm:hidden scale-0 sm:text-sm group-hover/photo:scale-100 transition-all">{item.Title}</p></Link></SwiperSlide>
            })}
            
        </Swiper>   
        
    </div>
  );
};

export default Carrossel;
