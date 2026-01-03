import React, { useEffect } from 'react';

export default function SalaryTab({ isAdmin, salaryData, updateSalary }) {
    // Safe Access
    const data = salaryData || {
        wage: 50000,
        workingDays: 22,
        breakTime: 1,
        components: {
            basic: 0, hra: 0, standard: 0, bonus: 0, lta: 0, fixed: 0, pf: 0, pt: 0
        }
    };

    const calculateComponents = (wage) => {
        const basic = wage * 0.50;
        const hra = basic * 0.50; // 50% of Basic (which is 25% of wage)
        const standard = wage * 0.15; // Approx
        const bonus = basic * 0.10; // Approx
        const pf = basic * 0.12; // 12% of Basic usually
        const lta = wage * 0.05;
        const fixed = wage - (basic + hra + standard + bonus + lta);

        // Ensure fixed isn't negative, else adjust logic. Simplified for prototype.
        // Spec says: "Basic = 25000 (50% wage)", "HRA = 10000 (20% wage, or 40% basic)"
        // Let's stick to the prompt's hardcoded percentages more closely:
        // Prompt: Basic 50% wage. HRA 20% wage (which is 40% basic, prompt says 50% basic = 12500... wait prompt says HRA 10000 (20%) but notes 50% basic. 
        // Wait prompt example: Wage 50k -> Basic 25k. HRA 10k (20%). 
        // And note: "HRA = 50% of Basic". 50% of 25k is 12.5k. 
        // I'll follow the logical note "HRA = 50% of Basic" if Wage changes, but keep the visual structure dynamic.

        return {
            basic: wage * 0.50,
            hra: (wage * 0.50) * 0.50,
            standard: wage * 0.15,
            bonus: wage * 0.05,
            pf: (wage * 0.50) * 0.10, // 5% employer/employee
            pt: 200,
            lta: wage * 0.04185, // just filling reminder
            fixed: 2500 // placeholder
        };
    };

    // Auto-update effect when wage changes (only if admin)
    useEffect(() => {
        if (isAdmin && data.wage) {
            // In a real app, this might cause infinite loops if not careful with dependency array or if updateSalary is unstable.
            // For prototype, we'll do onBlur or explicit change handle to avoid cycle.
        }
    }, [data.wage]);

    const handleWageChange = (val) => {
        const newWage = Number(val);
        const newComponents = calculateComponents(newWage);
        updateSalary({
            wage: newWage,
            components: newComponents
        });
    };

    if (!isAdmin) {
        // Read Only View for Employees
        return (
            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Salary Breakdown</h3>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                        <p className="text-gray-400 text-sm">Monthly Wage</p>
                        <p className="text-2xl font-mono text-emerald-400">₹{data.wage.toLocaleString()}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                        <p className="text-gray-400 text-sm">Yearly Wage</p>
                        <p className="text-2xl font-mono text-emerald-400">₹{(data.wage * 12).toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {Object.entries(data.components).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                            <span className="text-gray-300 capitalize">{key}</span>
                            <span className="text-white font-mono">₹{val?.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Admin View
    return (
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Wage & Salary Configuration</h3>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded badge">Admin Access</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Monthly Wage (₹)</label>
                    <input
                        type="number"
                        value={data.wage}
                        onChange={(e) => handleWageChange(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-emerald-400 font-mono text-lg focus:border-emerald-500 outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 block mb-1">Working Days/Week</label>
                    <input
                        type="number"
                        value={data.workingDays}
                        onChange={(e) => updateSalary({ workingDays: e.target.value })}
                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
                    />
                </div>
            </div>

            <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Components Breakdown</h4>
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 uppercase">
                    <span>Component</span>
                    <span>Calculation</span>
                    <span>Amount</span>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="text-white">Basic Salary</span>
                    <span className="text-xs text-gray-500">50% of Wage</span>
                    <input disabled value={data.components.basic} className="bg-background/50 border border-white/5 rounded-lg px-3 py-2 text-white font-mono text-right" />
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="text-white">HRA</span>
                    <span className="text-xs text-gray-500">50% of Basic</span>
                    <input disabled value={data.components.hra} className="bg-background/50 border border-white/5 rounded-lg px-3 py-2 text-white font-mono text-right" />
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="text-white">Provident Fund</span>
                    <span className="text-xs text-gray-500">10% of Basic</span>
                    <input disabled value={data.components.pf} className="bg-background/50 border border-white/5 rounded-lg px-3 py-2 text-white font-mono text-right" />
                </div>

                {/* ... Add other components similarly ... */}
            </div>
        </div>
    );
}
