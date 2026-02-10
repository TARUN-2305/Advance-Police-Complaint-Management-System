import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import {
    Menu, User as UserIcon, LogOut, MapPin, Calendar, Paperclip, Loader, Mic
} from 'lucide-react';
import VoiceRecorder from '../components/VoiceRecorder'; // Import VoiceRecorder

const LodgeComplaint = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false); // State for modal

    const [formData, setFormData] = useState({
        title: '', description: '', incident_location: '', category: 'General', incident_date: ''
    });
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Create Complaint
            const res = await api.post('/complaints', { ...formData, station_id: 1 });
            const complaintId = res.data.complaint_id;

            // 2. Upload File if exists
            if (file) {
                const uploadData = new FormData();
                uploadData.append('file', file);

                const uploadRes = await api.post('/complaints/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // 3. Link Evidence
                await api.post(`/complaints/${complaintId}/evidence`, {
                    file_url: uploadRes.data.fileUrl,
                    evidence_type: 'DOCUMENT', // Defaulting for now
                    description: 'Initial evidence uploaded during complaint lodging.'
                });
            }

            alert('Complaint Lodged Successfully');
            navigate('/victim-dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to lodge complaint: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const [aiAnalysis, setAiAnalysis] = useState(null);

    const handleVoiceAnalysis = (data, transcript) => {
        setAiAnalysis({
            score: data.severity_score,
            explanation: data.severity_explanation,
            urgency: data.urgency
        });

        setFormData({
            ...formData,
            title: data.incident_type ? `${data.incident_type} Incident` : formData.title,
            description: data.description || transcript || formData.description,
            incident_location: data.incident_location || formData.incident_location,
            incident_date: data.incident_date || formData.incident_date,
            category: data.incident_type || formData.category
        });
        setShowVoiceRecorder(false);
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Voice Recorder Modal */}
            {showVoiceRecorder && (
                <VoiceRecorder
                    onAnalysisComplete={handleVoiceAnalysis}
                    onClose={() => setShowVoiceRecorder(false)}
                />
            )}

            {/* Header - Dark Blue Bar */}
            <header className="bg-header h-16 flex items-center justify-between px-6 text-white shadow-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/victim-dashboard')} className="p-1 hover:bg-white/10 rounded"><Menu className="w-6 h-6" /></button>
                    <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Logo" className="h-8 invert opacity-90" />
                        <span className="font-bold tracking-wider text-lg">POLICE COMPLAINT PORTAL</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5" />
                    </div>
                </div>
            </header>

            {/* Main Form Area */}
            <main className="flex items-center justify-center p-8 min-h-[calc(100vh-64px)]">
                <div className="bg-white rounded-lg shadow-card w-full max-w-2xl overflow-hidden animate-fade-in">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Lodge Complaint</h1>
                        <button
                            onClick={() => setShowVoiceRecorder(true)}
                            className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                            <Mic className="w-4 h-4" /> Register via Voice
                        </button>
                    </div>

                    {/* AI Analysis Result */}
                    {aiAnalysis && (
                        <div className="mx-8 mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-lg flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    AI Severity Analysis
                                </h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${aiAnalysis.urgency === 'HIGH' ? 'bg-red-100 text-red-600' :
                                        aiAnalysis.urgency === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {aiAnalysis.urgency} URGENCY
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase font-bold">Severity Score</span>
                                    <span className="text-2xl font-black text-gray-700">{aiAnalysis.score}<span className="text-sm text-gray-400 font-normal">/10</span></span>
                                </div>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <p className="text-sm text-gray-600 italic">
                                    "{aiAnalysis.explanation}"
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        <div>
                            <input
                                type="text"
                                placeholder="Complaint Title"
                                className="w-full border border-gray-300 rounded p-4 text-gray-700 placeholder-gray-400 focus:border-header focus:ring-1 focus:ring-header transition-colors"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <select
                                className="w-full border border-gray-300 rounded p-4 text-gray-700 focus:border-header focus:ring-1 focus:ring-header transition-colors"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>General</option>
                                <option>Theft</option>
                                <option>Assault</option>
                                <option>Cybercrime</option>
                                <option>Lost Property</option>
                            </select>
                        </div>

                        <div>
                            <textarea
                                placeholder="Complaint Description"
                                rows="6"
                                className="w-full border border-gray-300 rounded p-4 text-gray-700 placeholder-gray-400 focus:border-header focus:ring-1 focus:ring-header transition-colors resize-none"
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="relative">
                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Incident Location"
                                className="w-full border border-gray-300 rounded p-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-header focus:ring-1 focus:ring-header transition-colors"
                                required
                                value={formData.incident_location}
                                onChange={e => setFormData({ ...formData, incident_location: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded p-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-header focus:ring-1 focus:ring-header transition-colors"
                                value={formData.incident_date}
                                onChange={e => setFormData({ ...formData, incident_date: e.target.value })}
                            />
                        </div>

                        <div
                            className={`relative cursor-pointer border border-dashed rounded p-4 transition-colors ${file ? 'bg-blue-50 border-blue-300' : 'border-gray-300 hover:bg-gray-50'}`}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <Paperclip className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${file ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`text-md ${file ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                                {file ? file.name : "File Upload (Evidence, Optional)"}
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-accent text-white w-full py-4 rounded font-bold uppercase tracking-widest hover:bg-yellow-600 transition-colors shadow-md mt-4 flex justify-center items-center gap-2 disabled:opacity-70"
                        >
                            {loading && <Loader className="w-5 h-5 animate-spin" />}
                            {loading ? 'Submitting...' : 'Submit Complaint'}
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default LodgeComplaint;
