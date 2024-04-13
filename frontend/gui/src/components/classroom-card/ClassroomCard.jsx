import "./style.css";
import {useNavigate} from "react-router-dom";

const ClassroomCard = ({classroom}) => {
    const navigate = useNavigate();

    const classroomPage = () => {
        navigate('/teacher/classroom', {state: {classroom}});
    };

    return (
        <div className="classroom-card">
            <div style={{
                width: "100%",
                height: "100px",
                backgroundColor: "lightgray"
            }}>
                <p style={{
                    fontSize: "20px",
                    color: "black",
                    fontFamily: "Arial",
                    textAlign: "left",
                    marginLeft: "10px"
                }}>{classroom.name}</p>
            </div>
            <div style={{
                width: "100%",
                height: "100px",
                marginTop: "-30px",
            }}>
                <p style={{
                    width: "80%",
                    fontSize: "17px",
                    color: "black",
                    fontFamily: "Arial",
                    textAlign: "right",
                    marginRight: "10px"
                }}>{classroom.teacher.firstName}</p>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "end"}}>
                <button style={{
                    fontSize: "20px",
                    height: "40px",
                    width: "80px",
                    marginRight: "10px",
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    outline: "none",
                    textDecoration: "none",
                    display: "inline-block",
                    textAlign: "center",
                    lineHeight: "40px",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#ccc"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "white"}
                        onClick={classroomPage}>
                    Intra
                </button>
            </div>
        </div>

    );
};

export default ClassroomCard;
