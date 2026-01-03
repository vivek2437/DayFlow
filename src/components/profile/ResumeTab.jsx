import React from 'react';

export default function ResumeTab({ isEditing, profileData, updateData }) {
    return (
        <div className="space-y-6">
            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">About</h3>
                {isEditing ? (
                    <textarea
                        className="w-full bg-background border border-white/10 rounded-xl p-4 text-gray-300 focus:border-emerald-500/50 outline-none min-h-[120px]"
                        value={profileData.about || 'Lorem ipsum is simply dummy text...'}
                        onChange={(e) => updateData({ about: e.target.value })}
                    />
                ) : (
                    <p className="text-gray-400 leading-relaxed">
                        {profileData.about || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
                    </p>
                )}
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Skills</h3>
                    {isEditing && <button className="text-xs text-emerald-400 font-medium">+ Add Skills</button>}
                </div>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'UI Design', 'Tailwind CSS'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Certifications</h3>
                    {isEditing && <button className="text-xs text-emerald-400 font-medium">+ Add</button>}
                </div>
                <div className="p-4 border border-dashed border-white/10 rounded-xl text-center text-gray-500 text-sm">
                    No certifications added yet
                </div>
            </div>
        </div>
    );
}
