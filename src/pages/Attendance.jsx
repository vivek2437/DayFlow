import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, differenceInMinutes } from 'date-fns';

export default function Attendance() {
    const { user } = useAuth();
    const { attendance } = useData();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Filter based on role
    const records = user.role === 'admin'
        ? attendance.filter(r => r.date === selectedDate)
        : attendance.filter(r => r.employeeId === user.id);

    const calculateHours = (inTime, outTime) => {
        if (!inTime || !outTime) return '-';
        // Mock parsing "HH:MM:SS" or "HH:MM"
        // Assuming simple format for prototype
        const [inH, inM] = inTime.split(':').map(Number);
        const [outH, outM] = outTime.split(':').map(Number);

        // Very simplified diff for same-day
        let minutes = (outH * 60 + outM) - (inH * 60 + inM);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Attendance</h1>
                {user.role === 'admin' && (
                    <div className="flex items-center gap-4 bg-surface p-2 rounded-xl border border-white/10">
                        <button className="p-1 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
                        <div className="flex items-center gap-2 text-sm font-mono text-white">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            {selectedDate}
                        </div>
                        <button className="p-1 hover:bg-white/5 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
                    </div>
                )}
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-background/50 text-xs uppercase text-gray-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Check In</th>
                            <th className="px-6 py-4">Check Out</th>
                            <th className="px-6 py-4">Work Hours</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">No records found</td>
                            </tr>
                        ) : (
                            records.map((record) => (
                                <tr key={record.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{record.employeeId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{record.date}</td>
                                    <td className="px-6 py-4 text-sm text-emerald-400 font-mono">{record.checkIn}</td>
                                    <td className="px-6 py-4 text-sm text-red-400 font-mono">{record.checkOut || '--:--'}</td>
                                    <td className="px-6 py-4 text-sm text-white font-mono">{calculateHours(record.checkIn, record.checkOut)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.status === 'present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
