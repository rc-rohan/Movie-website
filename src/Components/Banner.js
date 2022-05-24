import React, { useEffect, useState } from "react";
import Button from './Button'
import requests from "../request";
import axios from "axios";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.base_url}${requests.fetchNetflixOriginals}`);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  //remove the magic numbers like the truncate function requires the magic numbers
  const truncate = (str,n) => {
    return str?.length > n ? str.substr(0,n-1)+'...':str;
  }

  // const getDescription = () =>{
  //   return (
  //     <h1 className="bannerDescription">{truncate(movie?.overview, 150)}</h1>
  //   );
  // }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}") `,
        backgroundPosition: "center center",
      }}
    >
      <div className="bannerContents">
        <h1 className="bannerTitle">
          {movie?.name|| movie?.original_name}
        </h1>
        <div className="bannerButtons">
          <Button className="bannerButton" content="Play"/>
          <Button className="bannerButton" content="My List"/>
        </div>
        <h1 className="bannerDescription">{truncate(movie?.overview,150)}</h1>
      </div>
      <div className='bannerFadeBottom'></div>
    </header>
  );
}

export default Banner;