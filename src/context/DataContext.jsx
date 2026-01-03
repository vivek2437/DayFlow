import React, { createContext, useContext, useState } from 'react';
import { mockAttendance, mockTimeOff } from './mockData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState(mockAttendance);
    const [timeOffRequests, setTimeOffRequests] = useState(mockTimeOff);

    const getMyAttendance = () => {
        if (!user) return [];
        return attendance.filter(a => a.employeeId === user.id);
    };

    const getTodaysAttendance = () => {
        if (!user) return null;
        const today = new Date().toISOString().split('T')[0];
        return attendance.find(a => a.employeeId === user.id && a.date === today);
    };

    const checkIn = () => {
        if (!user) return;
        const newRecord = {
            id: Date.now(),
            employeeId: user.id,
            date: new Date().toISOString().split('T')[0],
            checkIn: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            checkOut: null,
            status: 'present'
        };
        setAttendance([...attendance, newRecord]);
        updateUserStatus('present');
    };

    const checkOut = () => {
        const todayRecord = getTodaysAttendance();
        if (!todayRecord) return;

        // Calculate hours (simplified)
        const checkOutTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        // Update record
        const updatedRecord = { ...todayRecord, checkOut: checkOutTime };
        setAttendance(attendance.map(a => a.id === updatedRecord.id ? updatedRecord : a));
        updateUserStatus('present'); // Remains present or maybe 'left'? Spec says "present in office" vs "absent". Usually remains present for the day log.
    };

    const updateUserStatus = (status) => {
        // This would sync with AuthContext in a real app or backend
        // For prototype, we'll assume AuthContext employees update reflects this if we shared state, 
        // but here we might need to call a function passed from AuthContext or just rely on local derived state.
    };

    return (
        <DataContext.Provider value={{
            attendance,
            timeOffRequests,
            checkIn,
            checkOut,
            getTodaysAttendance,
            getMyAttendance,
            setTimeOffRequests
        }}>
            {children}
        </DataContext.Provider>
    );
};
