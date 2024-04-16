import "./style.css";
import SideMenu from "../side-menu/SideMenu";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const AddProblem = () => {
    const location = useLocation();
    const {teacherData} = location.state;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [category, setCategory] = useState(-1);
    const [difOption, setDifOption] = useState(-1);
    const [nrOfExamples, setNrOfExamples] = useState("");
    const [pbRequirement, setPbRequirement] = useState("");
    const [teacherId] = useState(teacherData.id);
    const [inputOutputPairs, setInputOutputPairs] = useState([{inputData: "", outputData: "", checked: false}]);
    const [inputOutputPairsReversed, setInputOutputPairsReversed] = useState([{
        inputData: "",
        outputData: "",
        checked: false
    }]);

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [pairCount, setPairCount] = useState(0);
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleDifOptionChange = (e) => {
        setDifOption(e.target.value);
    };

    const handleNrOfExamplesChange = () => {
        const checkedPairsCount = inputOutputPairsReversed.filter(pair => pair.checked).length;
        setNrOfExamples(checkedPairsCount.toString());
    };


    const handlePbRequirementChange = (e) => {
        setPbRequirement(e.target.value);
    };

    const handleCancel = () => {
        navigate("/exercises", {
            state: {teacherData: teacherData},
        });
    }

    const handleSubmit = async () => {
        handleNrOfExamplesChange();
        const response = await fetch("http://localhost:8080/api/infoproblem/new/" + teacherId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                infoProblem: {
                    name: name,
                    category: category,
                    difOption: difOption,
                    pbRequirement: pbRequirement,
                    nrOfExamples: nrOfExamples
                },
                infoProblemTests: inputOutputPairs
            }),
        });
        if (response.ok) {
            handleSnackOpen();
        } else {
            console.log("not ok");
        }

    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
        navigate("/exercises", {
            state: {teacherData: teacherData},
        });
    };

    const handleSnackOpen = () => {
        setSnackOpen(true);
    }

    const handleAddPair = () => {
        setInputOutputPairs([...inputOutputPairs, {inputData: inputData, outputData: outputData}]);
        setPairCount(pairCount + 1);
        setInputOutputPairsReversed(inputOutputPairs.reverse());
    };

    const handleInputChange = (value) => {
        const newPairs = [...inputOutputPairs];
        const last = newPairs.length - 1;
        newPairs[last].inputData = value;
        setInputOutputPairs(newPairs);
        setInputData(value);
    };

    const handleOutputChange = (value) => {
        const newPairs = [...inputOutputPairs];
        const last = newPairs.length - 1;
        newPairs[last].outputData = value;
        setInputOutputPairs(newPairs);
        setOutputData(value);
    };

    const handleCheckboxChange = (index, isChecked) => {
        const newPairs = [...inputOutputPairsReversed];
        newPairs[index].checked = isChecked;
        setInputOutputPairsReversed(newPairs);
    };


    return (
        <>
            <div className="mainArea">
                <div>
                    <SideMenu teacherData={teacherData}/>
                </div>
                <div className="creationArea">
                    <div className="titleLabel">
                        <p className="textStyle">Creează o problemă</p>
                    </div>
                    <div className="inputArea">
                        <div>
                            <div>
                                <p className="textStyle">Nume</p>
                                <input className="textStyle inputStyle nameInputStyle" value={name}
                                       onChange={handleNameChange}/>
                            </div>
                            <div>
                                <p className="textStyle">Clasa</p>
                                <FormControl>
                                    <RadioGroup row value={category} onChange={handleCategoryChange}>
                                        <FormControlLabel value='1' control={<Radio/>} label="Clasa a 9 a"
                                                          labelPlacement="top"/>
                                        <FormControlLabel value='2' control={<Radio/>} label="Clasa a 10 a"
                                                          labelPlacement="top"/>
                                        <FormControlLabel value="3" control={<Radio/>} label="Clasa a 11 a"
                                                          labelPlacement="top"/>
                                        <FormControlLabel value="4" control={<Radio/>} label="Bacalaureat"
                                                          labelPlacement="top"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <p className="textStyle">Dificultate</p>
                                <FormControl>
                                    <RadioGroup row value={difOption} onChange={handleDifOptionChange}>
                                        <FormControlLabel value="1" control={<Radio/>} label="Mica"
                                                          labelPlacement="top"/>
                                        <FormControlLabel value="2" control={<Radio/>} label="Medie"
                                                          labelPlacement="top"/>
                                        <FormControlLabel value="3" control={<Radio/>} label="Mare"
                                                          labelPlacement="top"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <p className="textStyle">Exemple de date de intrare/iesire</p>
                            <div className="pairContainer">
                                <div>
                                    <p className="textStyle">Data de intrare</p>
                                    <textarea
                                        className="textStyle inputStyle diInputStyle"
                                        value={inputData}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                    />
                                </div>
                                <div style={{paddingLeft: "10px"}}>
                                    <p className="textStyle">Data de iesire</p>
                                    <textarea
                                        className="textStyle inputStyle doInputStyle"
                                        value={outputData}
                                        onChange={(e) => handleOutputChange(e.target.value)}
                                    />
                                </div>
                                <div style={{position: "relative", paddingLeft: "10px", minHeight: "100px"}}>
                                    <button className="buttonStyle addButton"
                                            onClick={handleAddPair}
                                            style={{position: "absolute", bottom: "0", marginBottom: "7px"}}>
                                        Adauga exemplu
                                    </button>
                                </div>
                            </div>

                            <div className="pairTableContainer">
                                {inputOutputPairsReversed.some(pair => pair.inputData || pair.outputData) && inputOutputPairsReversed.map((pair, index) => (
                                    <div key={index} style={{display: "flex", flexDirection: "column"}}>
                                        <div style={{marginBottom: "-20px"}}>
                                            <p className="textStyle">Example {inputOutputPairsReversed.length - index}</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                <input
                                                    type="checkbox"
                                                    checked={pair.checked}
                                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                                    style={{
                                                        margin: "0",
                                                        width: "20px",
                                                        height: "20px"
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <p style={{
                                                    paddingLeft: "10px"
                                                }} className="textStyle">Date de intrare: {pair.inputData}</p>
                                            </div>
                                            <div>
                                                <p style={{
                                                    paddingLeft: "10px"
                                                }} className="textStyle">Date de iesire: {pair.outputData}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pDivStyle">
                            <div>
                                <p className="textStyle">Cerinta</p>
                                <textarea className="textStyle inputStyle cerintaInputStyle" value={pbRequirement}
                                          onChange={handlePbRequirementChange}/>
                            </div>
                            <div className="buttonsArea">
                                <button className="buttonStyle cancelButton" onClick={handleCancel}>
                                    Anuleaza
                                </button>
                                <button className="buttonStyle addButton" onClick={handleSubmit}>
                                    Adauga
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackOpen}
                autoHideDuration={5000}
                onClose={handleSnackClose}>
                <Alert
                    onClose={handleSnackClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}>
                    Problema a fost adaugata cu succes!
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddProblem;