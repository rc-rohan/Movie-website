/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState,useMemo } from "react";
import requests from "../request";
import Modal from "./Modal";
import "./Row.css";


const Row = ({ title, fetchURL }) => {
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

  //usecallback/useMemo  for this functions.
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // const getRating = useMemo((rating)=>{
  //   return Math.round((rating*10)/20);
  // },[movies])

  //usecallback/useMemo for this functions
  const getRating = (rating) => {
    return Math.round((rating * 10) / 20);
  };

  return (
    <div>
      {
        <Modal
          movieDetails={movieDetails}
          onClose={() => setModal(false)}
          show={modal}
        />
      }
      <div className="row">
        <h2>{title}</h2>
        <div className="rowPosters">
          {movies.map((movie) => (
            <div
              className="rowCards"
              key={movie.id}
              onClick={() => {
                setMovieDetails(movie);
                setModal(true);
              }}
            >
              <img
                className="images"
                src={`${requests.img_url}${movie?.backdrop_path}`}
                alt={movie.name}
              />
              <b>{movie.title || movie.name}</b>
              <p className="rating">
                <small>Rating: </small>
                {/* Remove all these logics of JS from here. */}
                {[...Array(getRating(movie.vote_average))].map((el, key) => {
                  return (
                    <span key={key} className="star">
                      &#9733;
                    </span>
                  );
                })}
              </p>
              <div className="description">
                <p className="text">
                  {truncate(movie.overview, 200)}
                  <a href="#">
                    {" "}
                    {movie?.overview.length <= 200 ? "" : "read more"}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
