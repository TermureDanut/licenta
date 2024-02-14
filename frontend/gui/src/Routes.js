import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/main-page/WelcomePage";
import TeacherPage from "./components/teacher-page/TeacherPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<WelcomePage />} />
                <Route path="/teacher" element={<TeacherPage/>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;