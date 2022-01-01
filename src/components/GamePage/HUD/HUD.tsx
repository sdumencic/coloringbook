import "./HUD.scss";

import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GlobalState } from "../../../redux/store";

const HUD: React.FC = () => {
  const [popup, setPopup] = useState(false);

  // Used for correct sizing
  const client = useSelector((state: GlobalState) => state.client);

  const historyUndo = () => {
    return;
  };

  const minStyle = {
    color: true ? "red" : "black",
  };

  const popupStyle: CSSProperties = {
    left: `${client.width / 2 - 157}px`,
    top: `${client.height / 2 - 302}px`,
  };

  const blockStyle: CSSProperties = {
    width: `${client.width}px`,
    height: `${client.height}px`,
  };

  const startSolution = () => {
    setPopup(false);
  };

  const renderPopup = () => {
    return (
      <div className="blocker" style={blockStyle}>
        <div className="popup" style={popupStyle}>
          <p>{"QUESTION1"}</p>
          <p>{"QUESTION2"}</p>
          <button type="button" onClick={() => startSolution()} className="confirm">
            {"YES"}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-check-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          </button>
          <button type="button" onClick={() => setPopup(false)} className="cancel">
            {"NO"}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-x-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  if (popup) return renderPopup();

  return (
    <>
      <div className="HUD" style={{ left: "10px" }}>
        <button type="button" onClick={historyUndo} className="history" disabled>
          <svg
          width="1em"
          height="1em"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-left"
            className="svg-inline--fa fa-arrow-left fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default HUD;
