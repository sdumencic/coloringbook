import Button from "../../Shared/Button/Button";
import "./Register.scss";

const Register = () => {

    return (
        <div>
            <div className="registerformbody">
                <div>
                    <label className="loginlabel">Username:</label>
                    <input className="logininput" type="text" />
                </div>
                <div>
                    <label className="loginlabel">Password:</label>
                    <input className="logininput" type="password" />
                </div>
                <div className="register-item-2">
                    <label className="loginlabel">Email:</label>
                    <input className="logininput" type="email" />
                </div>

            </div>
            <div className="loginformfooter">
                <Button />
            </div>
        </div>
    )
}

const Test = () => (
    <div id="results" className="search-results">
        Some Results
    </div>
)

export default Register;