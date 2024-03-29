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
            e.target.value = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
            e.target.dispatchEvent(new Event('input'));
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleExecuteClick = async () => {
        const response = await fetch('http://localhost:8080/api/execute/runcpp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cppCode: code,
                inputData: infoProblem.inputData
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
    };

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
                        <p style={{fontSize: '25px'}}>Cerinta</p>
                        <p className="pbRequirement">{infoProblem.pbRequirement}</p>
                    </div>
                    <div>
                        <p style={{fontSize: '25px'}}>Exemplu</p>
                        <p style={{fontSize: '20px'}}>Date de intrare</p>
                        <p style={{fontSize: '20px'}}>{infoProblem.inputData}</p>

                        <p style={{fontSize: '20px'}}>Date de iesire</p>
                        <p style={{fontSize: '20px'}}>{infoProblem.outputData}</p>
                    </div>
                    <div className="codeArea">
                        <textarea className="codeArea" onKeyDown={handleKeyDown} value={code}
                                  onChange={handleCodeChange}></textarea>
                    </div>
                    <div className="buttonsDiv">
                        <button className="buttonStyle" onClick={handleExecuteClick}>Executa</button>
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
