/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import requests from "../request";
import Modal from "./Modal";
import "./Row.scss";

// const truncate = (str, n) => {
//   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
// };

// const getRating = (rate) => {
//   return Math.round((rate * 10) / 20);
// };

const styles = {
  row: "row",
  rows: {
    posters: "row__posters",
    cards: "row__cards",
    images: "row__cards__images",
    ratings: "row__cards__rating",
    description: "row__cards__description",
  },
};

const Row = (props) => {
  const { title, fetchURL } = props;
  const limit = 200;
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.base_url}${fetchURL}`);
      // console.log(title, request);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchURL]);

  const onClickHandler = useCallback(
    (movie) => {
      setMovieDetails(movie);
      setModal(true);
    },
    [movies]
  );

  const getRating = useCallback(
    (rate) => Math.round((rate * 10) / 20),
    [movies]
  );

  const truncate = useCallback(
    (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str),
    [movies]
  );

  const ratings = useCallback(
    (rate) =>
      [...Array(getRating(rate) || 0)].map((el, key) => (
        <span key={key} className="star">
          &#9733;
        </span>
      )),
    [movies]
  );

  return (
    <div>
      <Modal movieDetails={movieDetails} onClose={setModal} show={modal} />
      <div className={styles.row}>
        <h2>{title}</h2>
        <div className={styles.rows.posters}>
          {movies.map((movie) => (
            <div
              className={styles.rows.cards}
              key={movie.id}
              onClick={() => {
                onClickHandler(movie);
              }}
            >
              <img
                className={styles.rows.images}
                src={`${requests.img_url}${movie?.backdrop_path}`}
                alt={movie.name}
              />
              <b>{movie.title || movie.name}</b>
              <p className={styles.rows.ratings}>
                <small>Rating: </small>
                {ratings(movie?.vote_average)}
              </p>
              <div className={styles.rows.description}>
                <p>{truncate(movie.overview, limit)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
