import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Systray from './Systray';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-emerald-500">Loading Dayflow...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
            {/* Show Systray for all authenticated users */}
            <Systray />
        </div>
    );
}
