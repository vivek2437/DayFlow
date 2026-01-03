import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockEmployees } from './mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [employees, setEmployees] = useState(mockEmployees);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check local storage or persist login if needed
        // For prototype, we start fresh or maybe hydrate if we wanted
    }, []);

    const login = (email, password) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = employees.find(e => e.email === email && e.password === password);
                if (foundUser) {
                    setUser(foundUser);
                    resolve(foundUser);
                } else {
                    reject("Invalid credentials");
                }
                setLoading(false);
            }, 800);
        });
    };

    const signup = (data) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate ID: [CompanyInitials][NameInitials][Year][Serial]
                const compInitials = data.companyName ? data.companyName.substring(0, 2).toUpperCase() : 'CO';
                const nameInitials = data.name.substring(0, 2).toUpperCase();
                const year = new Date().getFullYear();
                const serial = String(employees.length + 1).padStart(3, '0');
                const newId = `${compInitials}${nameInitials}${year}${serial}`;

                const newUser = {
                    id: newId,
                    ...data,
                    role: data.role || 'employee',
                    status: 'present', // default
                    salary: { wage: 0, components: {} }, // initialize empty
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
                };

                setEmployees([...employees, newUser]);
                setUser(newUser);
                resolve(newUser);
                setLoading(false);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (id, updates) => {
        setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
        if (user && user.id === id) {
            setUser(prev => ({ ...prev, ...updates }));
        }
    };

    return (
        <AuthContext.Provider value={{ user, employees, login, signup, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
