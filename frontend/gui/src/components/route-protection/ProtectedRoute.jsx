import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
        return <Navigate to="/"/>;
    }

    return children;
};

export default ProtectedRoute;
