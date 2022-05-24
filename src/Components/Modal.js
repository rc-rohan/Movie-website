import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import requests from "../request";
import Button from "./Button";
import "./Modal.scss";

const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const getRating = (rating) => {
    return Math.round((rating * 10) / 20);
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div>
            <img
              className="modal__content__image"
              src={`${requests.img_url}${props.movieDetails?.backdrop_path}`}
              alt={props.movieDetails?.title}
            />
          </div>
          <div className="modal__content__header">
            <h4 className="modal__content__title">
              <b>{props.movieDetails.title || props?.movieDetails?.name}</b>
            </h4>
          </div>
          <div className="modal__content__body">
            <p className="modal__content__rating">
              {[
                ...Array(getRating(props?.movieDetails?.vote_average) || 0),
              ].map((el, key) => {
                return (
                  <span key={key} className="star">
                    &#9733;
                  </span>
                );
              })}
            </p>
            {props.movieDetails.overview}
          </div>
          <div className="modal__content__button">
            <Button content="Play" />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
