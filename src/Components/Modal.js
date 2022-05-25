import React, { useCallback, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import requests from "../request";
import Button from "./Button";
import "./Modal.scss";


  const styles = {
    modal: "modal",
    contents: {
      content: "modal__content",
      image: "modal__content__image",
      header: "modal__content__header",
      title: "modal__content__title",
      body: "modal__content__body",
      rating: "modal__content__rating",
      button: "modal__content__button",
    },
  };

const Modal = (props) => {
  const { movieDetails, show, onClose } = props;

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  // const getRating = (rating) => {
  //   return Math.round((rating * 10) / 20);
  // };

  const getRating = useCallback((rate) => Math.round((rate * 10) / 20), []);

  const ratings = useMemo(() => {
    return [...Array(getRating(movieDetails?.vote_average) || 0)].map(
      (el, key) => (
        <span key={key} className="star">
          &#9733;
        </span>
      )
    );
  }, [movieDetails]);

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className={styles.modal} onClick={() => onClose(false)}>
        <div className={styles.contents.content} onClick={(e) => e.stopPropagation()}>
          <div>
            <img
              className={styles.contents.image}
              src={`${requests.img_url}${movieDetails?.backdrop_path}`}
              alt={movieDetails?.title}
            />
          </div>
          <div className={styles.contents.header}>
            <h4 className={styles.contents.title}>
              <b>{movieDetails?.title || movieDetails?.name}</b>
            </h4>
          </div>
          <div className={styles.contents.body}>
            <p className={styles.contents.rating}>{ratings}</p>
            {props.movieDetails.overview}
          </div>
          <div className={styles.contents.button}>
            <Button content="Play" />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
