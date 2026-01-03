import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Systray() {
    const { checkIn, checkOut, getTodaysAttendance } = useData();
    const todayRecord = getTodaysAttendance();
    const isCheckedIn = !!todayRecord?.checkIn && !todayRecord?.checkOut;
    const isCheckedOut = !!todayRecord?.checkOut;

    if (isCheckedOut) {
        return (
            <div className="fixed bottom-6 right-6 bg-surface border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-40 animate-slide-up">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm font-semibold text-emerald-400">Shift Completed</p>
                </div>
                {/* Dev Reset for Prototype */}
                <button
                    onClick={() => window.location.reload()} // Simple reload to reset mock state for now, or we could add a context method
                    className="ml-2 text-xs text-gray-500 hover:text-white underline decoration-dashed"
                    title="Reset for testing"
                >
                    Reset
                </button>
            </div>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 bg-surface border border-white/10 rounded-2xl shadow-2xl p-1.5 flex items-center gap-2 z-40 animate-slide-up backdrop-blur-md">
            {!todayRecord ? (
                <button
                    onClick={checkIn}
                    className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-emerald-500/20 group"
                >
                    <LogIn className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    Check In
                </button>
            ) : (
                <div className="flex items-center gap-4 pl-4">
                    <div>
                        <p className="text-xs text-gray-400">Shift Started</p>
                        <p className="text-sm font-mono text-white">{todayRecord.checkIn}</p>
                    </div>
                    <button
                        onClick={checkOut}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2.5 rounded-xl font-medium transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Check Out
                    </button>
                </div>
            )}
        </div>
    );
}
