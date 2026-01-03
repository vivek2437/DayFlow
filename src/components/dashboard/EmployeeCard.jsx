import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';

const statusColors = {
    present: 'bg-emerald-500',
    leave: 'bg-amber-500',
    absent: 'bg-red-500',
};

export default function EmployeeCard({ employee }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/profile/${employee.id}`)}
            className="bg-surface border border-white/5 rounded-2xl p-6 relative group hover:border-emerald-500/30 transition-all cursor-pointer hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
        >
            {/* Status Dot */}
            <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${statusColors[employee.status] || 'bg-gray-500'} ring-4 ring-background z-10`} title={employee.status} />

            <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full p-1 border-2 border-white/10 mb-4 group-hover:border-emerald-500/50 transition-colors">
                    <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-full h-full rounded-full object-cover bg-background"
                    />
                </div>

                <h3 className="text-white font-semibold text-lg mb-1">{employee.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{employee.designation}</p>

                <div className="w-full h-px bg-white/5 my-2" />

                <div className="grid grid-cols-2 w-full gap-2 text-xs mt-2">
                    <div className="text-gray-500 text-left">Department</div>
                    <div className="text-gray-300 text-right">{employee.department}</div>

                    <div className="text-gray-500 text-left">Emp ID</div>
                    <div className="text-gray-300 text-right font-mono">{employee.id}</div>
                </div>
            </div>
        </div>
    );
}
