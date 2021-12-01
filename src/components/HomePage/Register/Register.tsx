import Button from "../../Shared/Button/Button";
import "./Register.scss";

const Register = () => {

    return (
        <div>
            <div className="loginformbody">
                <label className="loginlabel">Username:</label>
                <input className="logininput" type="text" />
                <label className="loginlabel">Password:</label>
                <input className="logininput" type="password" />
                <label className="loginlabel">Password:</label>
                <input className="logininput" type="password" />
                
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