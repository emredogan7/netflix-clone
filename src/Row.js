import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const imgBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  // when this component loads, do some stuff, run sth.
  // for our case, fetch api!
  useEffect(() => {
    // [], run once when the row loads. don't run again
    // if [movies], it will be run each time movies changes.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // why [fetchUrl] => dependency.
  // everytime this changes, we need to update useEffect()

  // console.log(movies);
  const youtubeOptions = {
    height: "300",
    width: "100%",
  };

  const handleClick = (movie) => {
    console.warn(movie);
    if (trailerURL) {
      setTrailerURL("");
    } else {
      console.log(movie);
      movieTrailer(movie?.original_title || movie?.name || "")
        .then((url) => {
          // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2> {title} </h2>
      <div className="row__posters">
        {/* many film posters here! */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${imgBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {/* <Youtube videoId={"ADQFNBZwEPo"} opts={youtubeOptions} /> */}
      {trailerURL && <Youtube videoId={trailerURL} opts={youtubeOptions} />}

      {/* title */}
      {/* posters of movies */}
    </div>
  );
}

export default Row;
