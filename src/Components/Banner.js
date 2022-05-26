import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import requests from "../request";
import axios from "axios";
import "./Banner.scss";

var styles = {
  banner: "banner",
  contents: {
    content: "banner__contents",
    title: "banner__contents__title",
    buttons: "banner__contents__buttons",
    description: "banner__contents__description",
    contentsFadeBottom: "banner__contents--fade-bottom",
  },
};

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const limit = 200;

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        `${requests.base_url}${requests.fetchTopRated}`
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  const truncate = useCallback(
    (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str),
    [movie]
  );

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}") `,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.contents.content}>
        <h1 className={styles.contents.title}>
          {movie?.name || movie?.original_name || movie?.title}
        </h1>
        <div className={styles.contents.buttons}>
          <Button content="Play" />
          <Button content="My List" />
        </div>
        <h1 className={styles.contents.description}>
          {truncate(movie?.overview, limit)}
        </h1>
      </div>
      <div className={styles.contents.contentsFadeBottom}></div>
    </header>
  );
};

export default Banner;
