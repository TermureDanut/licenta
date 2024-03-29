import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/main-page/WelcomePage";
import TeacherPage from "./components/teacher-page/TeacherPage";
import ExercisesPage from "./components/exercises-page/ExercisesPage";
import AddProblem from "./components/add-problem/AddProblem";
import SolveProblemPage from "./components/solve-problem-page/SolveProblemPage";

function AppRoutes({problemId}) {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<WelcomePage/>}/>
                <Route path="/teacher" element={<TeacherPage/>}/>
                <Route path="/exercises" element={<ExercisesPage/>}/>
                <Route path="/teacher/new/problem" element={<AddProblem/>}/>
                <Route path='/solve/problem' element={<SolveProblemPage/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
