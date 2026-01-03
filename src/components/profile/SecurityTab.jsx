import React from 'react';

export default function SecurityTab({ isEditing, profileData, updateData }) {
    const banks = profileData.bankDetails || {};

    const updateBank = (field, value) => {
        updateData({
            bankDetails: {
                ...banks,
                [field]: value
            }
        });
    };

    return (
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Bank Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Bank Name</label>
                    <input
                        disabled={!isEditing}
                        value={banks.bankName || ''}
                        onChange={(e) => updateBank('bankName', e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Account Number</label>
                    <input
                        disabled={!isEditing}
                        value={banks.accountNumber || ''}
                        onChange={(e) => updateBank('accountNumber', e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none font-mono disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">IFSC Code</label>
                    <input
                        disabled={!isEditing}
                        value={banks.ifsc || ''}
                        onChange={(e) => updateBank('ifsc', e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none font-mono disabled:opacity-50 uppercase"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">PAN No</label>
                    <input
                        disabled={!isEditing}
                        value={banks.pan || ''}
                        onChange={(e) => updateBank('pan', e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-white focus:border-emerald-500/50 outline-none font-mono disabled:opacity-50 uppercase"
                    />
                </div>
            </div>
        </div>
    );
}
