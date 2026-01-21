import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Search, MapPin, Loader } from 'lucide-react';

// Mockup: Search page.png
const PublicSearch = () => {
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearched(true);
        setLoading(true);
        setResult(null);
        try {
            const res = await api.get(`/complaints/public/${searchId}`);
            setResult(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
            {/* Faint Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="w-[600px] h-[600px] grayscale" />
            </div>

            <div className="relative z-10 w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl transform transition-all">
                <div className="mb-8 text-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-20 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-header uppercase tracking-wide">Public Complaint Search</h1>
                </div>

                <form onSubmit={handleSearch} className="relative mb-10">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-full py-3.5 pl-14 pr-32 text-gray-700 outline-none focus:border-header focus:ring-0 transition-colors shadow-sm"
                        placeholder="Enter Complaint ID (e.g. 1)"
                    />
                    <button
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-header text-white px-6 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-black transition-colors shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {searched && !loading && !result && (
                    <div className="text-center text-red-500 font-medium">
                        No public record found for ID #{searchId}
                    </div>
                )}

                {result && (
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/50 animate-fade-in relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Complaint Type</h3>
                                <p className="text-lg font-bold text-gray-800">{result.category}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Status</h3>
                                <span className={`px-3 py-1 rounded text-xs font-bold uppercase inline-block border ${result.current_status === 'CLOSED' ? 'bg-green-100 text-green-700 border-green-200' :
                                    result.current_status === 'INVESTIGATION' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                        'bg-yellow-100 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {result.current_status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Assigned Station</h3>
                                <p className="font-semibold text-header">{result.station?.station_name || 'Processing'}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Location</h3>
                                <p className="font-medium text-gray-700 flex items-center gap-1"><MapPin className="w-3 h-3" /> {result.incident_location}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                * Only public information is shown. Private details are protected.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicSearch;
