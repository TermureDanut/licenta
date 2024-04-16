import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import SideMenu from "../side-menu/SideMenu";
import "./style.css";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const SolveProblemPage = () => {
    const location = useLocation();
    const {state} = location;
    const {teacherData, infoProblem} = state;
    const [category, setCategory] = useState("");
    const [difOption, setDifOption] = useState("");
    const [difOptionColor, setDifOptionColor] = useState("");
    const [code, setCode] = useState("");
    const [showMessageArea, setShowMessageArea] = useState(false);
    const [responseValue, setResponseValue] = useState("");
    const [examples, setExamples] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const {selectionStart, selectionEnd, value} = e.target;
            const newValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
            setCode(newValue);
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleExecuteClick = async () => {
        setLoading(true);
        setShowMessageArea(false);
        try {
            const response = await fetch('http://localhost:8080/api/execute/runcpp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cppCode: code,
                    infoProblemId: infoProblem.id
                })
            });
            if (response.ok) {
                const responseBody = await response.text();
                setResponseValue(responseBody);
                setShowMessageArea(true);
            } else {
                const errorResponse = await response.text();
                console.error(errorResponse);
                setResponseValue(errorResponse);
                setShowMessageArea(true);
            }
        } catch (error) {
            console.error("Error executing code:", error);
            setResponseValue("Error executing code. Please try again.");
            setShowMessageArea(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/infoproblem/getexamples/" + infoProblem.id);
                const data = await response.json();
                setExamples(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    },);

    return (
        <div className="mainArea">
            <SideMenu teacherData={teacherData}/>
            <div className="problemArea">
                <div className="problemTags">
                    <Stack direction="row" spacing={2}>
                        <Chip label={category}/>
                        <Chip label={difOption} style={{backgroundColor: difOptionColor}}/>
                        <Chip label={`${teacherData.firstName} ${teacherData.lastName}`}/>
                    </Stack>
                </div>
                <div className="solvingArea">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p className="idAndNameDiv">#{infoProblem.id} </p>
                        <p className="idAndNameDiv" style={{paddingLeft: '10px'}}>{infoProblem.name}</p>
                    </div>
                    <div>
                        <p style={{fontSize: '25px', textDecoration: 'underline'}}>Cerinta</p>
                        <p className="pbRequirement">{infoProblem.pbRequirement}</p>
                    </div>
                    <div>
                        {examples.map((example, index) => (
                            <div key={index}>
                                {examples.length > 1 ?
                                    <p style={{fontSize: '25px', textDecoration: 'underline'}}>Exemplu {index + 1}</p>
                                    :
                                    <p style={{fontSize: '25px', textDecoration: 'underline'}}>Exemplu</p>
                                }

                                <p style={{fontSize: '20px'}}>Date de intrare</p>
                                <p style={{fontSize: '20px'}}>{example.inputData}</p>

                                <p style={{fontSize: '20px'}}>Date de iesire</p>
                                <p style={{fontSize: '20px'}}>{example.outputData}</p>
                            </div>
                        ))}
                    </div>
                    <div className="codeArea">
                        <textarea className="codeArea" onKeyDown={handleKeyDown} value={code}
                                  onChange={handleCodeChange}></textarea>
                    </div>
                    <div className="buttonsDiv">
                        <button className="buttonStyle"
                                onClick={handleExecuteClick}>{loading ? "Loading..." : "Executa"}</button>
                        <button className="buttonStyle">Posteaza</button>
                    </div>
                    {showMessageArea && (
                        <div className="executeArea">
                            <textarea className="executeArea" readOnly value={responseValue} onChange={() => {
                            }}></textarea>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SolveProblemPage;
