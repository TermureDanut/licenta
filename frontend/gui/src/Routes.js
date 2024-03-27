import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/main-page/WelcomePage";
import TeacherPage from "./components/teacher-page/TeacherPage";
import ExercisesPage from "./components/exercises-page/ExercisesPage";
import AddProblem from "./components/add-problem/AddProblem";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<WelcomePage/>}/>
                <Route path="/teacher" element={<TeacherPage/>}/>
                <Route path="/exercises" element={<ExercisesPage/>}/>
                <Route path="/teacher/new/problem" element={<AddProblem/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
