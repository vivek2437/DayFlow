import React from 'react';

export default function PrivateInfoTab({ isEditing, profileData, updateData }) {
    const handleChange = (e) => updateData({ [e.target.name]: e.target.value });

    return (
        <div className="bg-surface border border-white/5 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                        <input disabled value="Dayflow Inc." className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-2 text-gray-400" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
                        <input
                            name="department"
                            disabled={!isEditing}
                            value={profileData.department}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Nationality</label>
                        <input
                            name="nationality"
                            disabled={!isEditing}
                            value={profileData.nationality || 'Indian'}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Date of Joining</label>
                        <input
                            type="date"
                            name="joiningDate"
                            disabled={!isEditing}
                            value={profileData.joiningDate}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Manager</label>
                        <input
                            name="manager"
                            disabled={!isEditing}
                            value={profileData.manager}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Personal Email</label>
                        <input
                            name="personalEmail"
                            disabled={!isEditing}
                            value={profileData.personalEmail || profileData.email}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Marital Status</label>
                        <select
                            name="maritalStatus"
                            disabled={!isEditing}
                            value={profileData.maritalStatus || 'Single'}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50 appearance-none"
                        >
                            <option>Single</option>
                            <option>Married</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                        <textarea
                            name="address"
                            disabled={!isEditing}
                            value={profileData.address}
                            onChange={handleChange}
                            rows={1}
                            className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50 resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
