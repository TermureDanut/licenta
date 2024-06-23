import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/welcome-page/WelcomePage";
import MainPage from "./components/main-page/MainPage";
import ExercisesPage from "./components/exercises-page/ExercisesPage";
import AddProblem from "./components/add-problem/AddProblem";
import SolveProblemPage from "./components/solve-problem-page/SolveProblemPage";
import ClassroomPage from "./components/classroom-page/ClassroomPage";
import ProtectedRoute from "./components/route-protection/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<WelcomePage/>}/>
                <Route path="/mainpage" element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
                <Route path="/exercises" element={<ProtectedRoute><ExercisesPage/></ProtectedRoute>}/>
                <Route path="/teacher/new/problem" element={<ProtectedRoute><AddProblem/></ProtectedRoute>}/>
                <Route path="/solve/problem" element={<ProtectedRoute><SolveProblemPage/></ProtectedRoute>}/>
                <Route path="/teacher/classroom" element={<ProtectedRoute><ClassroomPage/></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
