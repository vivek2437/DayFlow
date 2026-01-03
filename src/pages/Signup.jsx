import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Upload, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [formData, setFormData] = useState({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        department: '',
        password: '',
        confirmPassword: '',
        role: 'employee'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        setLoading(true);
        await signup(formData);
        setLoading(false);
        navigate('/dashboard'); // or show success modal with generated ID
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-10 px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
                    <p className="text-gray-400 text-sm">Join Dayflow HRMS today</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Company Name</label>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-background border border-white/10 rounded-xl flex items-center justify-center text-gray-500 cursor-pointer hover:border-emerald-500/50 transition-colors">
                                <Upload size={18} />
                            </div>
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="flex-1 bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none"
                                placeholder="e.g. Odeo India"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none appearance-none"
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">HR / Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none appearance-none"
                        >
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Design">Design</option>
                            <option value="HR">HR</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Management">Management</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
