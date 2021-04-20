import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const imgBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

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
  return (
    <div className="row">
      <h2> {title} </h2>
      <div className="row__posters">
        {/* many film posters here! */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${imgBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {/* title */}
      {/* posters of movies */}
    </div>
  );
}

export default Row;
