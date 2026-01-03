import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-surface border-b border-white/10 h-16 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg">
            {/* Logo & Tabs */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Dayflow</span>
                </div>

                <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-white/5">
                    <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive ? 'bg-surface shadow text-white' : 'text-gray-400 hover:text-white'}`}>
                        Employees
                    </NavLink>
                    <NavLink to="/attendance" className={({ isActive }) => `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive ? 'bg-surface shadow text-white' : 'text-gray-400 hover:text-white'}`}>
                        Attendance
                    </NavLink>
                    <NavLink to="/time-off" className={({ isActive }) => `px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive ? 'bg-surface shadow text-white' : 'text-gray-400 hover:text-white'}`}>
                        Time Off
                    </NavLink>
                </div>
            </div>

            {/* Search & Profile */}
            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-background border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-emerald-500/50 w-64 text-gray-200"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium text-white">{user?.name}</div>
                        <div className="text-xs text-gray-400 capitalize">{user?.designation || user?.department || user?.role}</div>
                    </div>

                    <div className="relative group">
                        <button className="w-10 h-10 rounded-full border-2 border-emerald-500/30 overflow-hidden hover:border-emerald-500 transition-colors">
                            <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </button>

                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-white/10 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                            <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2">
                                <User className="w-4 h-4" /> My Profile
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2">
                                <LogOut className="w-4 h-4" /> Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
