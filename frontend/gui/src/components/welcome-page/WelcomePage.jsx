import "../../style.css";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../header/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import config from "../../config";
import {ReactComponent as LogoWithText} from "../../images/Logo with text.svg";
import {Input, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Visibility, VisibilityOff} from "@mui/icons-material";


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
            {/*<Header/>*/}
            <div className="content">
                <div className="login-card">
                    <LogoWithText width="400px" height="300px"/>
                    <div className="text_login_register">Login</div>
                    <div style={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            type="text"
                            className="input-bars"
                            onChange={handleEmailChange}
                            style={{marginBottom: '16px'}}
                        />

                        <FormControl variant="standard" className="input-bars" style={{marginBottom: '16px'}}>
                            <InputLabel htmlFor="standard-adornment-password">Parola</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        {/*<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>*/}
                        {/*    <TextField*/}
                        {/*        id="standard-basic"*/}
                        {/*        label="Enter password"*/}
                        {/*        variant="standard"*/}
                        {/*        type={showPassword ? 'text' : 'password'}*/}
                        {/*        className="input-bars"*/}
                        {/*        onChange={handlePasswordChange}*/}
                        {/*    />*/}
                        {/*    <IconButton onClick={togglePasswordVisibility}*/}
                        {/*                style={{*/}
                        {/*                    marginTop: '10px',*/}
                        {/*                    color: 'black',*/}
                        {/*                    backgroundColor: 'white',*/}
                        {/*                    width: '40px',*/}
                        {/*                    height: '40px',*/}
                        {/*                    marginLeft: '10px'*/}
                        {/*                }}*/}
                        {/*    >*/}
                        {/*        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}*/}
                        {/*    </IconButton>*/}
                        {/*</div>*/}
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
