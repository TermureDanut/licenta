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
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState("");
    const [pbRequirement, setPbRequirement] = useState("");
    const [teacherId] = useState(teacherData.id);

    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleDifOptionChange = (e) => {
        setDifOption(e.target.value);
    };

    const handleInputDataChange = (e) => {
        setInputData(e.target.value);
    };

    const handleOutputDataChange = (e) => {
        setOutputData(e.target.value);
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
        const response = await fetch("http://localhost:8080/api/infoproblem/new/" + teacherId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                category: category,
                difOption: difOption,
                inputData: inputData,
                outputData: outputData,
                pbRequirement: pbRequirement
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
                            <div>
                                <p className="textStyle">Date de intrare</p>
                                <textarea className="textStyle inputStyle diInputStyle" value={inputData}
                                          onChange={handleInputDataChange}/>
                            </div>
                            <div>
                                <p className="textStyle">Date de iesire</p>
                                <textarea className="textStyle inputStyle doInputStyle" value={outputData}
                                          onChange={handleOutputDataChange}/>
                            </div>
                        </div>
                        <div className="pDivStyle">
                            <div>
                                <p className="textStyle">Cerinta</p>
                                <textarea className="textStyle inputStyle cerintaInputStyle" value={pbRequirement}
                                          onChange={handlePbRequirementChange}/>
                            </div>
                        </div>
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