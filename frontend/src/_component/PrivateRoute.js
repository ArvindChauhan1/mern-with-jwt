import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/use-auth';

export const PrivateRoute = () => {

    const auth = useAuth(); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
}