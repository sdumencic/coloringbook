import Login from "./Login/Login";
import Register from "./Register/Register";
import "./HomePage.scss";
import { MouseEvent, useEffect, useRef, useState } from "react";

const IMAGE = "/images/background.png";

const HomePage = () => {
    const style = {
        backgroundImage: `url(${IMAGE})`
    }

    const [title, setTitle] = useState("Log in");

    const [value, setValue] = useState(false);
    const [active, setActive] = useState(false);
    const changeRegister = () => {
        setTitle('Register');
        setValue(true);
        setActive(true);
    }

    const changeLogin = () => {
        setTitle('Log in');
        setValue(false);        
        setActive(false);
    }

    return (
        <div className="loginBackground" style={style}>
            <form className="loginform">
                <div className="loginformheader">
                    <div className="materialui">
                        <div className={`button ${active ? "" : "active"}`} onClick={changeLogin}>
                            Log in
                        </div>
                        <div className={`button ${active ? "active" : ""}`} onClick={changeRegister}>
                            Register
                        </div>
                    </div>
                    <h1>{title}</h1>
                </div>
                {value ? <Register /> : <Login />}
            </form>
        </div>

    )
}

export default HomePage;