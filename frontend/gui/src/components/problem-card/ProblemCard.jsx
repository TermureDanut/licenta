import "./style.css";
import {useNavigate} from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, {useEffect, useState} from "react";

const ProblemCard = ({infoProblem, teacherData}) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [difOption, setDifOption] = useState("");
    const [difOptionColor, setDifOptionColor] = useState("");

    useEffect(() => {
        const setNames = () => {
            if (infoProblem) {
                if (infoProblem.category === '1') {
                    setCategory("Clasa a 9 a");
                } else if (infoProblem.category === '2') {
                    setCategory("Clasa a 10 a");
                } else if (infoProblem.category === '3') {
                    setCategory("Clasa a 11 a");
                } else if (infoProblem.category === '4') {
                    setCategory("Bacalaureat");
                }

                if (infoProblem.difOption === '1') {
                    setDifOption("Mica");
                    setDifOptionColor("#00c04b");
                } else if (infoProblem.difOption === '2') {
                    setDifOption("Medie");
                    setDifOptionColor("orange");
                } else if (infoProblem.difOption === '3') {
                    setDifOption("Mare");
                    setDifOptionColor("#FF3632");
                }
            }
        };
        setNames();
    }, [infoProblem]);

    const solveClick = () => {
        const combinedState = {teacherData, infoProblem};
        navigate('/solve/problem', {state: combinedState});
    };
    return (
        <div className="problem-card">
            <div className="problemInfo">
                <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                    <p style={{
                        fontSize: "20px",
                        color: "black",
                        textAlign: "left",
                        marginLeft: '10px'
                    }}>{infoProblem.name}</p>
                    <p style={{
                        fontSize: "20px",
                        color: "black",
                        textAlign: "left",
                        marginRight: '10px'
                    }}>#{infoProblem.id}</p>
                </div>
                <p style={{
                    width: '100%',
                    fontSize: "20px",
                    color: "black",
                    textAlign: "left",
                    marginLeft: '40px'
                }}>{infoProblem.pbRequirement}</p>
            </div>
            <div className="solveButton">
                <div style={{
                    width: "80%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginLeft: "10px"
                }}>
                    <Stack direction="row" spacing={2}>
                        <Chip label={category}/>
                        <Chip label={difOption} style={{backgroundColor: difOptionColor}}/>
                        <Chip label={`${teacherData.firstName} ${teacherData.lastName}`}/>
                    </Stack>
                </div>

                <button className="buttonStyle" onClick={solveClick} style={{backgroundColor: 'lightgray'}}>Rezolva
                </button>
            </div>
        </div>
    );
}

export default ProblemCard;