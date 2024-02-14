import { useNavigate } from 'react-router-dom';
import "./style.css";
import {useState} from "react";

const LoginCard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {


        // navigate("/teacher", {
        //     state: {
        //         teacher: "teacherName",
        //     }
        // });
    }

    return (
        <div className="login-card">
            <input type = "text"
                   placeholder="Enter email"
                   className="input-bars"
                   onChange={handleEmailChange}
            />
            <input type = "text"
                   placeholder="Enter password"
                   className="input-bars"
                   onChange={handlePasswordChange}
            />
            <button className="login-button" onClick={handleLogin}> Login </button>
        </div>
    );
}

export default LoginCard;
