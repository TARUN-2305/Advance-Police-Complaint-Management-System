import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { ArrowLeft, UserPlus, Shield, Building2, UserX, UserCheck, RefreshCw } from 'lucide-react';

const ManageTeam = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stations, setStations] = useState([]);
    const [officers, setOfficers] = useState([]);

    const isAdmin = user?.role === 'ADMIN';

    const [formData, setFormData] = useState({
        full_name: '',
        badge_number: '',
        email: '',
        password: '',
        rank: 'Sub-Inspector',
        station_id: '',
        role: 'OFFICER'
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        // Fetch stations
        api.get('/stations')
            .then(res => {
                setStations(res.data);
                if (res.data.length > 0) {
                    setFormData(prev => ({ ...prev, station_id: res.data[0].station_id }));
                }
            })
            .catch(err => console.error("Failed to fetch stations", err));

        if (isAdmin) {
            loadOfficers();
        }
    }, [isAdmin]);

    const loadOfficers = () => {
        api.get('/auth/officers')
            .then(res => setOfficers(res.data))
            .catch(console.error);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        try {
            await api.post('/auth/register/officer', formData);
            setStatus({ type: 'success', msg: `Officer ${formData.full_name} added successfully!` });
            setFormData(prev => ({
                ...prev,
                full_name: '',
                badge_number: '',
                email: '',
                password: '',
                rank: 'Sub-Inspector'
            }));
            if (isAdmin) loadOfficers();
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Failed to add officer' });
        }
    };

    const toggleStatus = async (officer) => {
        if (!window.confirm(`Are you sure you want to ${officer.is_active ? 'DEACTIVATE' : 'ACTIVATE'} this officer?`)) return;
        try {
            await api.put(`/auth/officers/${officer.officer_id}`, {
                station_id: officer.station_id, // maintain current
                rank: officer.rank, // maintain current
                is_active: !officer.is_active
            });
            loadOfficers();
        } catch (e) { alert('Failed to update status'); }
    };

    return (
        <div className="min-h-screen bg-[#E5E4D6]/30 font-sans pb-20">
            <header className="bg-header h-16 flex items-center px-6 text-white shadow-md">
                <button onClick={() => navigate('/police-dashboard')} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded">
                    <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                </button>
                <div className="ml-auto font-bold tracking-wider uppercase flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Team Management
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-8 rounded shadow-lg border-2 border-header h-fit">
                    <h2 className="text-2xl font-bold text-header mb-2 flex items-center gap-2">
                        <UserPlus className="w-8 h-8" /> Recruit New Personnel
                    </h2>
                    <p className="text-gray-500 mb-6">Create credentials for new officers.</p>

                    {status.msg && (
                        <div className={`p-3 mb-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Compact Form */}
                        <div className="space-y-4">
                            <input
                                type="text" name="full_name" required
                                value={formData.full_name} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                placeholder="Full Name"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text" name="badge_number" required
                                    value={formData.badge_number} onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                    placeholder="Badge #"
                                />
                                <input
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    name="rank" required
                                    value={formData.rank} onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none bg-white"
                                >
                                    <option value="Constable">Constable</option>
                                    <option value="Head Constable">Head Constable</option>
                                    <option value="Sub-Inspector">Sub-Inspector</option>
                                    <option value="Inspector">Inspector</option>
                                    <option value="ACP">ACP</option>
                                    {isAdmin && <option value="Commissioner">Commissioner</option>}
                                </select>
                                <select
                                    name="station_id" required
                                    value={formData.station_id} onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none bg-white"
                                >
                                    <option value="">Select Station...</option>
                                    {stations.map(s => (
                                        <option key={s.station_id} value={s.station_id}>{s.station_name}</option>
                                    ))}
                                </select>
                            </div>

                            {isAdmin && (
                                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 text-sm">
                                    <label className="font-bold text-gray-700">Access Level:</label>
                                    <select
                                        name="role"
                                        value={formData.role} onChange={handleChange}
                                        className="ml-2 border border-gray-300 rounded focus:border-header outline-none bg-white"
                                    >
                                        <option value="OFFICER">Officer</option>
                                        <option value="ADMIN">Administrator</option>
                                    </select>
                                </div>
                            )}

                            <input
                                type="password" name="password" required
                                value={formData.password} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                placeholder="Initial Password"
                            />
                        </div>

                        <button type="submit" className="w-full bg-header text-white font-bold py-3 rounded hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md">
                            <Shield className="w-5 h-5" /> Recruit Officer
                        </button>
                    </form>
                </div>

                {/* List Section (Admin Only) */}
                {isAdmin && (
                    <div className="bg-white p-8 rounded shadow-lg border border-gray-200 h-fit">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Shield className="w-8 h-8 text-blue-600" /> Active Roster
                            </h2>
                            <button onClick={loadOfficers} className="text-gray-400 hover:text-blue-600"><RefreshCw className="w-5 h-5" /></button>
                        </div>

                        <div className="overflow-y-auto max-h-[600px] space-y-4">
                            {officers.map(off => (
                                <div key={off.officer_id} className={`p-4 rounded border flex justify-between items-center ${off.is_active ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200 opacity-70'}`}>
                                    <div>
                                        <div className="font-bold text-gray-800">{off.full_name} ({off.rank})</div>
                                        <div className="text-xs text-gray-500">
                                            Badge: {off.badge_number} | Station: {off.station?.station_name || 'Unassigned'} |
                                            <span className="font-bold text-blue-600"> Cases: {off._count?.complaints || 0}</span>
                                        </div>
                                        <div className="text-xs font-mono text-gray-400">{off.email}</div>
                                    </div>
                                    <button
                                        onClick={() => toggleStatus(off)}
                                        title={off.is_active ? "Deactivate" : "Activate"}
                                        className={`p-2 rounded-full ${off.is_active ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                                    >
                                        {off.is_active ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                                    </button>
                                </div>
                            ))}
                            {officers.length === 0 && <p className="text-center text-gray-400 mt-10">No records found.</p>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageTeam;
