import "./style.css";

const ProblemCard = ({infoProblem}) => {
    return (
        <div className="problem-card">
            <div className="problemInfo">
                <p style={{fontSize: "20px", color: "white",}}>{infoProblem.name}</p>
                <p style={{fontSize: "20px", color: "white"}}>{infoProblem.pbRequirement}</p>
            </div>
            <div className="solveButton">
                <button className="buttonStyle">Rezolva</button>
            </div>
        </div>
    );
}

export default ProblemCard;