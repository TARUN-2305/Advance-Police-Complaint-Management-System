import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';

const ManageStations = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Simple Admin Check
    if (user?.role !== 'ADMIN') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow text-center">
                    <h1 className="text-xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p>Only Administrators can manage police stations.</p>
                    <button onClick={() => navigate('/police-dashboard')} className="mt-4 text-blue-600 underline">Back</button>
                </div>
            </div>
        );
    }

    const [formData, setFormData] = useState({
        station_name: '',
        location: '',
        contact_number: '',
        jurisdiction_areas: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/stations', formData);
            setStatus({ type: 'success', msg: `Station ${formData.station_name} created successfully!` });
            setFormData({
                station_name: '',
                location: '',
                contact_number: '',
                jurisdiction_areas: ''
            });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Failed to create station' });
        }
    };

    return (
        <div className="min-h-screen bg-[#E5E4D6]/30 font-sans">
            <header className="bg-header h-16 flex items-center px-6 text-white shadow-md">
                <button onClick={() => navigate('/police-dashboard')} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded">
                    <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                </button>
                <div className="ml-auto font-bold tracking-wider uppercase flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Station Management
                </div>
            </header>

            <main className="max-w-xl mx-auto p-8">
                <div className="bg-white p-8 rounded shadow-lg border-2 border-header">
                    <h2 className="text-2xl font-bold text-header mb-2 flex items-center gap-2">
                        <MapPin className="w-8 h-8" /> Add New Station
                    </h2>
                    <p className="text-gray-500 mb-6">Expand the force jurisdiction by adding new stations.</p>

                    {status.msg && (
                        <div className={`p-3 mb-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Station Name</label>
                            <input
                                type="text" name="station_name" required
                                value={formData.station_name} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                placeholder="e.g. Whitefield Police Station"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Location / Area</label>
                            <input
                                type="text" name="location" required
                                value={formData.location} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                placeholder="e.g. Whitefield"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="text" name="contact_number" required
                                value={formData.contact_number} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none"
                                placeholder="e.g. 080-2845..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Jurisdiction Keywords</label>
                            <textarea
                                name="jurisdiction_areas"
                                value={formData.jurisdiction_areas} onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded focus:border-header outline-none h-24"
                                placeholder="Comma separated areas e.g. ITPL, Hope Farm, Kadugodi"
                            />
                            <p className="text-xs text-gray-500 mt-1">Used for auto-routing complaints.</p>
                        </div>

                        <button type="submit" className="w-full bg-header text-white font-bold py-3 rounded hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md">
                            <Building2 className="w-5 h-5" /> Create Station
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ManageStations;
