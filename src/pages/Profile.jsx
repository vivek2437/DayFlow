import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ResumeTab from '../components/profile/ResumeTab';
import PrivateInfoTab from '../components/profile/PrivateInfoTab';
import SalaryTab from '../components/profile/SalaryTab';
import SecurityTab from '../components/profile/SecurityTab';
import { Edit2, Save, X, Camera } from 'lucide-react';

export default function Profile() {
    const { id } = useParams();
    const { user, employees, updateUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Resume');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);

    // Determine which profile to show
    const targetId = id || user?.id;
    const isOwnProfile = user?.id === targetId;
    const isAdmin = user?.role === 'admin';
    const canEdit = isOwnProfile || isAdmin;

    useEffect(() => {
        const found = employees.find(e => e.id === targetId);
        if (found) {
            setProfileData(JSON.parse(JSON.stringify(found))); // Deep copy
        }
    }, [targetId, employees]);

    if (!profileData) return <div className="text-center p-10 text-gray-500">Loading Profile...</div>;

    const handleSave = () => {
        updateUser(profileData.id, profileData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        const found = employees.find(e => e.id === targetId);
        setProfileData(JSON.parse(JSON.stringify(found)));
        setIsEditing(false);
    };

    const updateData = (updates) => {
        setProfileData(prev => ({ ...prev, ...updates }));
    };

    const updateSalary = (salaryUpdates) => {
        setProfileData(prev => ({
            ...prev,
            salary: { ...prev.salary, ...salaryUpdates }
        }));
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            {/* Header / Cover */}
            <div className="relative mb-24">
                <div className="h-48 bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-background bg-surface overflow-hidden">
                            <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </button>
                        )}
                    </div>

                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-white mb-1">{profileData.name}</h1>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>{profileData.designation || 'Employee'}</span>
                            <span>•</span>
                            <span>{profileData.department || 'General'}</span>
                            <span>•</span>
                            <span className="text-emerald-400">{profileData.id}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="absolute bottom-4 right-8 flex gap-3">
                    {canEdit && !isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all shadow-lg"
                        >
                            <Edit2 size={16} /> Edit Profile
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-all"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20 transition-all"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 mb-6 border-b border-white/10 flex gap-8">
                {['Resume', 'Private Info', 'Salary Info', 'Security'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-t-full" />}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'Resume' && <ResumeTab isEditing={isEditing} profileData={profileData} updateData={updateData} />}
                {activeTab === 'Private Info' && <PrivateInfoTab isEditing={isEditing} profileData={profileData} updateData={updateData} />}
                {activeTab === 'Salary Info' && (
                    <SalaryTab
                        isAdmin={isAdmin}
                        salaryData={profileData.salary}
                        updateSalary={updateSalary}
                    />
                )}
                {activeTab === 'Security' && <SecurityTab isEditing={isEditing} profileData={profileData} updateData={updateData} />}
            </div>
        </div>
    );
}
