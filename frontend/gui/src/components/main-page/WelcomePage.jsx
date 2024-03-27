import Header from "../header/Header";
import "./style.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";

const WelcomePage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        const response = await fetch("http://localhost:8080/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.hasOwnProperty("studentFlag")) {
            } else {
                navigate("/teacher", {
                    state: {teacherData: jsonResponse.teacher},
                });
            }
        } else {
            console.log("not ok");
        }
    };

    return (
        <div className="welcome-page">
            <Header/>
            <div className="content">
                <div className="login-card">
                    <div className="text_login_register">Login</div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter email"
                            className="input-bars"
                            onChange={handleEmailChange}
                        />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                className="input-bars"
                                onChange={handlePasswordChange}
                            />
                            <IconButton onClick={togglePasswordVisibility}
                                        style={{
                                            color: 'black',
                                            backgroundColor: 'white',
                                            width: '40px',
                                            height: '40px',
                                            marginLeft: '10px'
                                        }}
                            >
                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                            </IconButton>
                        </div>
                    </div>
                    <button className="login-button" onClick={handleLogin}>
                        Login
                    </button>
                    <button className="login-button" onClick={handleLogin}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
