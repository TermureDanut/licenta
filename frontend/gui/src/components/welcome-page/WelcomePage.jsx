import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../header/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import config from "../../config";
import "./style.css";

const WelcomePage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.teacher === true) {
            navigate("/mainpage", {replace: true});
        }
    }, [navigate]);

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
        const response = await fetch(`${config.API_BASE_URL}auth/login`, {
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
            localStorage.setItem("userData", JSON.stringify(jsonResponse));
            const storedData = JSON.parse(localStorage.getItem("userData"));
            if (storedData.teacher === true) {
                navigate("/mainpage", {replace: true});
            }
        } else {
            console.log("to implement incorrect credentials");
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
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                className="input-bars"
                                onChange={handlePasswordChange}
                            />
                            <IconButton onClick={togglePasswordVisibility}
                                        style={{
                                            marginTop: '10px',
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
