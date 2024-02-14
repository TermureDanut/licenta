import Header from "../header/Header";
import LoginCard from "../login-card/LoginCard";
import "./style.css";

const WelcomePage = () => {
    return (
        <div className="welcome-page">
            <Header/>
            <div className="content">
                <LoginCard/>
            </div>
        </div>
    );
}

export default WelcomePage;