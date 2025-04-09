import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token'); // Verifica si el token está almacenado

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/" replace />;
    }

    // Si hay token, renderiza la página protegida
    return children;
}

export default ProtectedRoute;