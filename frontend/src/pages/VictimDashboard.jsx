import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import {
    FileText, Clock, CheckCircle, Menu, User as UserIcon, LogOut
} from 'lucide-react';

// Mockup: Citizen dashboard.png
const CitizenDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    // Derived Metrics
    const total = complaints.length;
    const active = complaints.filter(c => c.current_status === 'INVESTIGATION' || c.current_status === 'PENDING').length;
    const closed = complaints.filter(c => c.current_status === 'CLOSED').length;

    useEffect(() => {
        api.get('/complaints/my').then(res => setComplaints(res.data)).catch(console.error);
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'INVESTIGATION': return 'bg-blue-100 text-blue-700';
            case 'CLOSED': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header - Dark Blue Bar */}
            <header className="bg-header h-16 flex items-center justify-between px-6 text-white shadow-md">
                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/10 rounded"><Menu className="w-6 h-6" /></button>
                    <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Logo" className="h-8 invert opacity-90" />
                        <span className="font-bold tracking-wider text-lg">POLICE PORTAL</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium">{user?.full_name}</p>
                        <p className="text-xs text-gray-400 opacity-80">Citizen</p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <button onClick={logout} title="Sign Out">
                        <LogOut className="w-5 h-5 text-red-400 hover:text-red-300" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Dashboard Overview</h1>
                    <button
                        onClick={() => navigate('/lodge-complaint')}
                        className="bg-header text-white px-6 py-2 rounded shadow hover:bg-black transition-colors"
                    >
                        + NEW COMPLAINT
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <MetricCard
                        title="Total Complaints"
                        count={total}
                        icon={FileText}
                        accentColor="border-blue-500"
                        iconBg="bg-blue-50"
                        iconColor="text-blue-500"
                    />
                    <MetricCard
                        title="Active Complaints"
                        count={active}
                        icon={Clock}
                        accentColor="border-yellow-500"
                        iconBg="bg-yellow-50"
                        iconColor="text-yellow-500"
                    />
                    <MetricCard
                        title="Closed Complaints"
                        count={closed}
                        icon={CheckCircle}
                        accentColor="border-green-500"
                        iconBg="bg-green-50"
                        iconColor="text-green-500"
                    />
                </div>

                {/* Complaints Table */}
                <div className="bg-white rounded-lg shadow-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-gray-700 uppercase text-sm tracking-widest">My Complaints</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Complaint ID</th>
                                    <th className="px-6 py-4 font-semibold">Title</th>
                                    <th className="px-6 py-4 font-semibold">Police Station</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {complaints.map(c => (
                                    <tr key={c.complaint_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-900 font-medium">#CPL-{c.complaint_id}</td>
                                        <td className="px-6 py-4 text-gray-700">{c.title}</td>
                                        <td className="px-6 py-4 text-gray-600">{c.station?.station_name || 'Assignment Pending'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(c.current_status)}`}>
                                                {c.current_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => navigate(`/track/${c.complaint_id}`)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline"
                                            >
                                                Track &rarr;
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {complaints.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400 italic">No complaints found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper Component for Metric Cards
const MetricCard = ({ title, count, icon: Icon, accentColor, iconBg, iconColor }) => (
    <div className={`bg-white p-6 rounded-lg shadow-card relative border-b-4 ${accentColor}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm font-medium uppercase mb-1">{title}</p>
                <h3 className="text-4xl font-bold text-gray-800">{count}</h3>
            </div>
            <div className={`p-3 rounded-full ${iconBg}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
        </div>
    </div>
);

export default CitizenDashboard;
