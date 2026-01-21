import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { BarChart3, TrendingUp, AlertTriangle, ArrowLeft, Eye } from 'lucide-react';

const AnalyticsDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    // Protect Route
    if (user?.role !== 'ADMIN') {
        return <div className="p-10 text-center text-red-600 font-bold">Authorized Personnel Only (Commissioner Level)</div>;
    }

    useEffect(() => {
        api.get('/analytics/stats')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return <div className="p-10 text-center">Loading Strategic Data...</div>;

    return (
        <div className="min-h-screen bg-[#E5E4D6]/30 font-sans">
            <header className="bg-header h-16 flex items-center px-6 text-white shadow-md">
                <button onClick={() => navigate('/police-dashboard')} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded">
                    <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                </button>
                <div className="ml-auto font-bold tracking-wider uppercase flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    Strategic Command Center
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-8">

                {/* 1. Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                        <h3 className="text-gray-500 font-bold uppercase text-xs">Total Cases</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{data.overview.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
                        <h3 className="text-gray-500 font-bold uppercase text-xs">Active Investigations</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{data.overview.pending}</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                        <h3 className="text-gray-500 font-bold uppercase text-xs">Closed Cases</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{data.overview.closed}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* 2. Station Load (Mock Bar Chart) */}
                    <div className="bg-white p-6 rounded shadow-lg border border-gray-100">
                        <h2 className="text-lg font-bold text-header uppercase mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" /> Station Workload
                        </h2>
                        <div className="space-y-4">
                            {data.stationStats.map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm font-bold mb-1">
                                        <span>{stat.name}</span>
                                        <span>{stat.count}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${Math.min((stat.count / data.overview.total) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            {data.stationStats.length === 0 && <p className="text-gray-400 italic">No precinct data available.</p>}
                        </div>
                    </div>

                    {/* 3. Recent Intelligence (Tips) */}
                    <div className="bg-white p-6 rounded shadow-lg border border-gray-100">
                        <h2 className="text-lg font-bold text-header uppercase mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" /> Unverified Intelligence
                        </h2>
                        <div className="space-y-4">
                            {data.recentTips.map((tip, i) => (
                                <div key={i} className="bg-red-50 p-4 rounded border border-red-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-red-800 uppercase bg-red-200 px-2 py-1 rounded">
                                            {tip.location || 'Unknown Loc'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(tip.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed mb-2 line-clamp-2">
                                        {tip.description}
                                    </p>
                                    <p className="text-xs text-blue-600 font-bold uppercase">Status: {tip.status}</p>
                                </div>
                            ))}
                            {data.recentTips.length === 0 && <p className="text-gray-400 italic">No intelligence reports.</p>}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AnalyticsDashboard;
