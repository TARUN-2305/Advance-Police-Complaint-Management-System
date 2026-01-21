import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Public endpoints work fine if API allows
import { ArrowLeft, Send, EyeOff } from 'lucide-react';

const AnonymousTip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        location: '',
        incident_date: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tips', formData);
            setStatus({ type: 'success', msg: 'Tip submitted securely. Thank you for your service.' });
            setFormData({ description: '', location: '', incident_date: '' });
        } catch (err) {
            setStatus({ type: 'error', msg: 'Submission failed. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-sm">
                        <EyeOff className="w-5 h-5" /> Anonymous Tip
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">Submit Intelligence</h1>
                <p className="text-gray-400 mb-8 text-sm">
                    Your identity is protected. Use this form to report suspicious activity or provide information on crimes.
                </p>

                {status.msg && (
                    <div className={`p-4 mb-6 rounded border ${status.type === 'success' ? 'bg-green-900/50 border-green-500 text-green-200' : 'bg-red-900/50 border-red-500 text-red-200'}`}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Detailed Description</label>
                        <textarea
                            name="description" required
                            value={formData.description} onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-4 text-white focus:border-yellow-500 outline-none transition h-32 resize-none"
                            placeholder="Describe what you saw, who was involved, and what happened..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location of Incident</label>
                        <input
                            type="text" name="location"
                            value={formData.location} onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:border-yellow-500 outline-none transition"
                            placeholder="e.g. Near City Market"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Date (Approximate)</label>
                        <input
                            type="date" name="incident_date"
                            value={formData.incident_date} onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-3 text-white focus:border-yellow-500 outline-none transition"
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 text-white font-bold py-4 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider">
                        <Send className="w-5 h-5" /> Submit Securely
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-600">
                    This submission is not traced. IP addresses require court order to reveal.
                </p>
            </div>
        </div>
    );
};

export default AnonymousTip;
