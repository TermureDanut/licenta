import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import SideMenu from "../side-menu/SideMenu";
import "./style.css";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import IconButton from "@mui/material/IconButton";
import Pagination from '@mui/material/Pagination';
import ProblemCard from "../problem-card/ProblemCard";
import CircularProgress from '@mui/material/CircularProgress';

const ExercisesPage = () => {
    const location = useLocation();
    const {teacherData} = location.state;
    const navigate = useNavigate();
    const [sectionName, setSectionName] = useState("Toate");
    const [pageCount, setPageCount] = useState(1);
    const [problemList, setProblemList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProblems = async () => {
            setIsLoading(true);
            const simulatedDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
            await simulatedDelay(1000);
            const size = 5;
            const baseUrl = 'http://localhost:8080/api/infoproblem';
            const url = category
                ? `${baseUrl}/filtered?category=${category}&page=${currentPage - 1}&size=${size}`
                : `${baseUrl}/all?page=${currentPage - 1}&size=${size}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setProblemList(data.content);
                    setPageCount(data.totalPages);
                } else {
                    console.log("Fetch error:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProblems();
    }, [currentPage, category]);


    const handleCategoryChange = (newCategory, newSectionName) => {
        setCurrentPage(1);
        setCategory(newCategory);
        setSectionName(newSectionName);
    };

    const handleNewProblemClick = () => {
        navigate("/teacher/new/problem", {state: {teacherData}});
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="mainArea">
            <SideMenu teacherData={teacherData}/>
            <div className="exercisesArea">
                <div className="sideMenu">
                    <button className="buttons" onClick={() => handleCategoryChange("", "Toate")}>Toate</button>
                    <button className="buttons" onClick={() => handleCategoryChange("1", "Clasa a 9 a")}>Clasa a 9 a
                    </button>
                    <button className="buttons" onClick={() => handleCategoryChange("2", "Clasa a 10 a")}>Clasa a 10 a
                    </button>
                    <button className="buttons" onClick={() => handleCategoryChange("3", "Clasa a 11 a")}>Clasa a 11 a
                    </button>
                    <button className="buttons" onClick={() => handleCategoryChange("4", "Bacalaureat")}>Bacalaureat
                    </button>
                </div>
                <div className="problemsArea">
                    <div className="miniHeader">
                        <p className="text">{sectionName}</p>
                        <Pagination count={pageCount} shape="rounded" page={currentPage} onChange={handlePageChange}/>
                        <IconButton onClick={handleNewProblemClick}>
                            <AddToQueueIcon/>
                        </IconButton>
                    </div>
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%'
                        }}>
                            <CircularProgress/>
                        </div>
                    ) : (
                        <div className="problems">
                            {problemList.map((problem, index) => (
                                <ProblemCard key={index} infoProblem={problem}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;
