import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import {
    FileText, Search, Gavel, Menu, LogOut, MapPin, Calendar, LayoutDashboard
} from 'lucide-react';

// Mockup: Police page.png
const PoliceDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stationComplaints, setStationComplaints] = useState([]);

    // Metrics
    const newComplaints = stationComplaints.filter(c => c.current_status === 'PENDING').length;
    const activeInvestigations = stationComplaints.filter(c => c.current_status === 'INVESTIGATION').length;
    const closedCases = stationComplaints.filter(c => c.current_status === 'CLOSED').length;

    useEffect(() => {
        api.get('/complaints/station').then(res => {
            // Sort: Active first, Closed last. Within groups, newest first.
            const sorted = res.data.sort((a, b) => {
                const isClosedA = a.current_status === 'CLOSED';
                const isClosedB = b.current_status === 'CLOSED';
                if (isClosedA && !isClosedB) return 1;
                if (!isClosedA && isClosedB) return -1;
                return new Date(b.created_at) - new Date(a.created_at);
            });
            setStationComplaints(sorted);
        }).catch(console.error);
    }, []);

    const handleAccept = async (id) => {
        if (!window.confirm("Are you sure you want to accept this case for investigation?")) return;
        try {
            await api.put(`/complaints/${id}/status`, { status: 'INVESTIGATION', remarks: 'Case accepted by officer.' });
            alert('Case Accepted');
            // Optimistic Update
            setStationComplaints(prev => prev.map(p => p.complaint_id === id ? { ...p, current_status: 'INVESTIGATION' } : p));
        } catch (e) { alert('Failed to accept case'); }
    };

    return (
        <div className="min-h-screen bg-[#E5E4D6]/30 font-sans">
            {/* Header: Officer Dashboard */}
            <header className="bg-header h-16 flex items-center justify-between px-6 text-white shadow-md">
                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/10 rounded"><Menu className="w-6 h-6" /></button>
                    <div className="flex items-center gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Logo" className="h-8 invert opacity-90" />
                        <span className="font-bold tracking-wider text-lg uppercase hidden md:inline-block">Officer Dashboard - {user?.rank} {user?.full_name}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="bg-white/10 px-3 py-1 rounded text-sm font-mono tracking-widest">{user?.badge_number}</span>
                    <button onClick={logout} title="Sign Out">
                        <LogOut className="w-5 h-5 text-red-400 hover:text-red-300" />
                    </button>
                </div>
            </header>

            <main className="p-8 max-w-7xl mx-auto">

                {/* Metrics Cards - Large & Bold */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <OfficerMetricCard
                        title="NEW COMPLAINTS"
                        count={newComplaints}
                        icon={FileText}
                    />
                    <OfficerMetricCard
                        title="ACTIVE INVESTIGATIONS"
                        count={activeInvestigations}
                        icon={Search}
                    />
                    <OfficerMetricCard
                        title="CLOSED CASES"
                        count={closedCases}
                        icon={Gavel}
                    />
                </div>

                {/* Recent Complaints List */}
                <div className="mb-4">
                    <h2 className="text-header font-bold uppercase tracking-wide text-lg mb-4">Recent Complaints</h2>

                    <div className="space-y-4">
                        {stationComplaints.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 bg-white rounded shadow italic">No complaints assigned to your station.</div>
                        ) : (
                            stationComplaints.map(c => (
                                <div key={c.complaint_id} className={`${c.current_status === 'CLOSED' ? 'bg-green-50 border-green-300' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-sm border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-transform hover:scale-[1.005]`}>
                                    <div className="flex-1">
                                        <div className="text-header font-bold text-lg mb-1 flex items-center gap-2">
                                            Complaint ID: #{c.complaint_id}
                                            <span className="text-gray-400 font-normal text-sm">|</span>
                                            <span className="text-gray-600 font-medium text-sm">Type: {c.category}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-4">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Location: {c.incident_location}</span>
                                            <span className="hidden md:inline">|</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Date: {new Date(c.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => navigate(`/manage-complaint/${c.complaint_id}`)}
                                            className="bg-header text-white px-5 py-2 rounded font-bold text-sm tracking-wide uppercase hover:bg-black transition-colors"
                                        >
                                            Manage
                                        </button>
                                        {c.current_status === 'PENDING' && (
                                            <button
                                                onClick={() => handleAccept(c.complaint_id)}
                                                className="bg-accent text-white px-5 py-2 rounded font-bold text-sm tracking-wide uppercase hover:bg-yellow-600 transition-colors shadow-sm"
                                            >
                                                Accept Case
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Based on the mockup "Police page.png", cards are huge with dark headers
const OfficerMetricCard = ({ title, count, icon: Icon }) => (
    <div className="bg-white rounded border-2 border-header overflow-hidden shadow-lg flex flex-col h-40">
        <div className="bg-header text-white px-4 py-2 font-bold uppercase tracking-wider text-sm">
            {title}
        </div>
        <div className="flex-1 flex items-center justify-between px-6">
            <span className="text-6xl font-bold text-header">{count}</span>
            <Icon className="w-16 h-16 text-header opacity-90" />
        </div>
    </div>
);

export default PoliceDashboard;
