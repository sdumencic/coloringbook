import "./HomePage.scss";

import { MouseEvent, useEffect, useRef, useState } from "react";

import Button from "../Shared/Button/Button";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const IMAGE = "/images/220102background.png";
const ZECIC = "/images/zecnoleg1.png";
const ZECICLEG = "/images/zecleg1.png";

const HomePage = () => {
  const style = {
    backgroundImage: `url(${IMAGE})`,
  };

  const [change, setChange] = useState(false);

  const changeAnimate = () => {
    if (change === true) {
      setChange(false);
    } else {
      setChange(true);
    }
  };

  return (
    <div className="loginBackground" style={style}>
      <form className="loginform">
        <div className="loginformheader">
          <h1 className="title" onClick={changeAnimate}>
            Bojanka
          </h1>
        </div>
        <div className="loginformbody">
          <img className="image1" src={ZECIC} />
          <img className={`image2 ${change ? "leg" : " "}`} src={ZECICLEG} />
          <Link to="/game">
            <Button onHover={changeAnimate} text={"Započni"} />
          </Link>
        </div>
      </form>
      <Link to="/settings">
        <div className="hud">
          <FiSettings size={30} className="hud-icon" />
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
