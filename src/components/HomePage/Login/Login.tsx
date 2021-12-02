import Button from "../../Shared/Button/Button";
import "./Login.scss";

const Login = () => {

    return (
        <div>
            <div className="loginformbody">
                <div>
                    <label className="loginlabel">Username:</label>
                    <input className="logininput" type="text" />
                </div>
                <div>
                    <label className="loginlabel">Password:</label>
                    <input className="logininput" type="password" />
                </div>
            </div>
            <div className="loginformfooter">
                <Button />
            </div>
        </div>
    )
}

export default Login;