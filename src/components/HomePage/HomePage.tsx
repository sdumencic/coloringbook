import "./HomePage.scss";

import { MouseEvent, useEffect, useRef, useState } from "react";

import Button from "../Shared/Button/Button";

const IMAGE = "/images/220102background.png";
const ZECIC = "/images/zecnoleg.png";
const ZECICLEG = "/images/zecleg.png";

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
            Igraj
          </h1>
        </div>
        <div className="loginformbody">
          <img className="image1" src={ZECIC} />
          <img className={`image2 ${change ? "leg" : " "}`} src={ZECICLEG} />
        </div>
        <div className="loginformfooter">
          <Button onHover={changeAnimate} text={"Započni"} />
        </div>
      </form>
    </div>
  );
};

export default HomePage;
