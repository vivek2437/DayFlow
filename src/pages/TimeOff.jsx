import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Plus, Check, X } from 'lucide-react';

export default function TimeOff() {
    const { user } = useAuth();
    const { timeOffRequests, setTimeOffRequests } = useData();
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [requestForm, setRequestForm] = useState({
        type: 'Paid Time Off',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            id: `TO${Date.now()}`,
            employeeId: user.id,
            ...requestForm,
            status: 'Pending'
        };
        setTimeOffRequests([newRequest, ...timeOffRequests]);
        setShowModal(false);
        setRequestForm({ type: 'Paid Time Off', startDate: '', endDate: '', reason: '' });
    };

    const filteredRequests = timeOffRequests.filter(req => {
        if (user.role !== 'admin' && req.employeeId !== user.id) return false;
        if (filter === 'All') return true;
        return req.status === filter;
    });

    const handleStatusChange = (id, newStatus) => {
        setTimeOffRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };

    return (
        <div className="animate-fade-in space-y-6 relative">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Time Off Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Request Time Off
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-surface border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-scale-in">
                        <h2 className="text-xl font-bold text-white mb-4">New Request</h2>
                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
                                <select
                                    value={requestForm.type}
                                    onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                                >
                                    <option>Paid Time Off</option>
                                    <option>Sick Leave</option>
                                    <option>Unpaid Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={requestForm.startDate}
                                        onChange={(e) => setRequestForm({ ...requestForm, startDate: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={requestForm.endDate}
                                        onChange={(e) => setRequestForm({ ...requestForm, endDate: e.target.value })}
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Reason</label>
                                <textarea
                                    required
                                    value={requestForm.reason}
                                    onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
                                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white outline-none min-h-[80px]"
                                    placeholder="Brief reason..."
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white transition-colors"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabs / Filters */}
            <div className="flex gap-4 border-b border-white/10 pb-0">
                {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${filter === status ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-400 hover:text-white'}`}
                    >
                        {status} Requests
                    </button>
                ))}
            </div>

            {/* Requests Table */}
            <div className="grid gap-4">
                {filteredRequests.map(req => (
                    <div key={req.id} className="bg-surface border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:border-emerald-500/30 transition-all">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${req.type === 'Sick Leave' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    {req.type}
                                </span>
                                <span className={`text-xs ${req.status === 'Approved' ? 'text-emerald-400' : req.status === 'Rejected' ? 'text-red-400' : 'text-amber-400'
                                    }`}>
                                    ● {req.status}
                                </span>
                            </div>
                            <h3 className="text-white font-medium text-lg">{req.employeeId} <span className="text-gray-500 text-base font-normal">requested for</span> {req.startDate} <span className="text-gray-500 text-sm">to</span> {req.endDate}</h3>
                            <p className="text-gray-400 text-sm mt-1">{req.reason}</p>
                        </div>

                        {user.role === 'admin' && req.status === 'Pending' && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleStatusChange(req.id, 'Approved')}
                                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl transition-all" title="Approve">
                                    <Check className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleStatusChange(req.id, 'Rejected')}
                                    className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all" title="Reject">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-surface/30 rounded-2xl border-dashed border border-white/10">
                        No requests found
                    </div>
                )}
            </div>
        </div>
    );
}
