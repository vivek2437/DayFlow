import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EmployeeCard from '../components/dashboard/EmployeeCard';
import { Filter } from 'lucide-react';

export default function Dashboard() {
    const { employees } = useAuth();
    const [filter, setFilter] = useState('all');

    const filteredEmployees = employees.filter(emp => {
        if (filter === 'all') return true;
        return emp.status === filter;
    });

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">Overview of all employees</p>
                </div>

                <div className="flex items-center gap-3 bg-surface p-1 rounded-xl border border-white/10">
                    {['all', 'present', 'leave', 'absent'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === status ? 'bg-background text-white shadow ring-1 ring-white/10' : 'text-gray-400 hover:text-white'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map(emp => (
                    <EmployeeCard key={emp.id} employee={emp} />
                ))}
            </div>
        </div>
    );
}
