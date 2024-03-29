import "./style.css";
import {useNavigate} from "react-router-dom";

const ProblemCard = ({infoProblem, teacherData}) => {
    const navigate = useNavigate();
    const solveClick = () => {
        const combinedState = {teacherData, infoProblem};
        navigate('/solve/problem', {state: combinedState});
    };
    return (
        <div className="problem-card">
            <div className="problemInfo">
                <p style={{fontSize: "20px", color: "white",}}>{infoProblem.name}</p>
                <p style={{fontSize: "20px", color: "white"}}>{infoProblem.pbRequirement}</p>
            </div>
            <div className="solveButton">
                <button className="buttonStyle" onClick={solveClick}>Rezolva</button>
            </div>
        </div>
    );
}

export default ProblemCard;