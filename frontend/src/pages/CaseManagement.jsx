import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, Upload, Send, Calendar, Loader } from 'lucide-react';

const CaseManagement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const fileInputRef = useRef(null);

    // Form States
    const [updateText, setUpdateText] = useState('');
    const [visibility, setVisibility] = useState('Police Only');
    const [summonDate, setSummonDate] = useState('');
    const [summonReason, setSummonReason] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadComplaint();
    }, [id]);

    const loadComplaint = () => {
        api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(console.error);
    }

    if (!complaint) return <div className="p-10 text-center">Loading Case Files...</div>;

    const handlePostUpdate = async () => {
        if (!updateText) return;
        try {
            let vis = 'POLICE_ONLY'; // Match backend enum implied by logic
            if (visibility === 'Public') vis = 'PUBLIC';
            if (visibility === 'Victim') vis = 'VICTIM';

            await api.post(`/complaints/${id}/updates`, { text: updateText, visibility: vis });
            alert('Update Posted');
            setUpdateText('');
            loadComplaint(); // Refresh timeline
        } catch (e) { alert('Error posting update'); }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        try {
            const uploadData = new FormData();
            uploadData.append('file', file);

            const uploadRes = await api.post('/complaints/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            await api.post(`/complaints/${id}/evidence`, {
                file_url: uploadRes.data.fileUrl,
                evidence_type: 'DOCUMENT',
                description: 'Uploaded via Case Management',
                visibility: 'PRIVATE' // Default for officer upload
            });

            alert('Evidence Uploaded');
            loadComplaint(); // Refresh evidence
        } catch (error) {
            alert('Upload Failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header Bar */}
            <header className="bg-header h-16 flex items-center justify-between px-6 text-white shadow-md">
                <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
                    <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-1.5 rounded"><ChevronLeft className="w-5 h-5" /></button>
                    <span>Complaint ID: #CPL-{complaint.complaint_id}</span>
                    <span className="text-gray-400">|</span>
                    <span>Victim: {complaint.victim?.full_name}</span>
                    <span className="text-gray-400">|</span>
                    <span>Location: {complaint.incident_location}</span>
                </div>

                <div className="flex gap-4">
                    {/* Status Dropdown/Button */}
                    {complaint.current_status !== 'CLOSED' && (
                        <button
                            onClick={async () => {
                                if (window.confirm('Are you sure you want to CLOSE this case? This action handles final closure.')) {
                                    const remarks = prompt("Enter Closing Remarks (Mandatory):");
                                    if (!remarks) return;
                                    try {
                                        await api.put(`/complaints/${id}/status`, { status: 'CLOSED', remarks });
                                        alert('Case Closed Successfully');
                                        loadComplaint();
                                    } catch (e) { alert('Closure Failed'); }
                                }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-bold text-sm shadow transition-colors"
                        >
                            CLOSE CASE
                        </button>
                    )}
                    <div className="bg-white text-header px-4 py-1.5 rounded font-bold text-sm shadow">
                        Status: {complaint.current_status}
                    </div>
                </div>
            </header>

            <main className="p-8 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Column 1: Add Timeline Update */}
                    <div className="bg-white p-6 rounded shadow-card h-full flex flex-col">
                        <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Add Timeline Update</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-4 text-sm focus:border-header focus:ring-1 focus:ring-header mb-4 flex-1 resize-none bg-gray-50"
                            placeholder="Enter investigation update details..."
                            rows="10"
                            value={updateText}
                            onChange={(e) => setUpdateText(e.target.value)}
                        ></textarea>

                        <div className="mb-4">
                            <label className="text-sm font-bold text-gray-700 block mb-1">Visibility:</label>
                            <select
                                className="w-full border border-gray-300 rounded p-2 text-sm bg-white"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                            >
                                <option>Police Only</option>
                                <option>Victim</option>
                                <option>Public</option>
                            </select>
                        </div>

                        <button
                            onClick={handlePostUpdate}
                            className="bg-header text-white w-full py-3 rounded font-bold uppercase tracking-wider hover:bg-black transition-colors"
                        >
                            Post Update
                        </button>
                    </div>

                    {/* Column 2: Upload Evidence */}
                    <div className="bg-white p-6 rounded shadow-card h-full flex flex-col">
                        <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Upload Evidence</h2>

                        <div
                            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center mb-6 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <div className="mb-4">
                                <Upload className="w-12 h-12 text-gray-400" />
                            </div>
                            <span className="text-sm font-bold text-gray-600">Drag & Drop files or</span>
                            <span className="text-sm text-blue-600 hover:underline">Click to Browse</span>
                            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                        </div>

                        {/* File List */}
                        <div className="space-y-4 mb-6 flex-1 overflow-y-auto max-h-64">
                            {complaint.evidence && complaint.evidence.length > 0 ? (
                                complaint.evidence.map((ev, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-200">
                                        <a href={`http://localhost:5000${ev.file_url}`} target="_blank" className="font-medium text-blue-600 truncate max-w-[150px]">{ev.file_url.split('/').pop()}</a>
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 font-bold uppercase">{ev.visibility}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 text-sm">No evidence uploaded yet.</p>
                            )}
                        </div>

                        <button
                            disabled={uploading}
                            onClick={() => fileInputRef.current.click()}
                            className="bg-header text-white w-full py-3 rounded font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {uploading ? <Loader className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />}
                            {uploading ? 'Uploading...' : 'Upload Evidence'}
                        </button>
                    </div>

                    {/* Column 3: Issue Summon */}
                    <div className="bg-white p-6 rounded shadow-card h-full flex flex-col">
                        <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Issue Summon</h2>

                        <div className="mb-4">
                            <label className="text-sm font-bold text-gray-700 block mb-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded p-2 pl-10 text-sm"
                                    value={summonDate}
                                    onChange={(e) => setSummonDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-6 flex-1">
                            <label className="text-sm font-bold text-gray-700 block mb-1">Reason for Summon:</label>
                            <textarea
                                className="w-full border border-gray-300 rounded p-3 text-sm h-32 resize-none bg-gray-50"
                                placeholder="e.g., Witness Interrogation"
                                value={summonReason}
                                onChange={(e) => setSummonReason(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            onClick={async () => {
                                if (!summonDate || !summonReason) return alert('Date and Reason required');
                                try {
                                    const text = `OFFICIAL POLICE SUMMON: You are required to appear at the station on ${summonDate}. Reason: ${summonReason}`;
                                    await api.post(`/complaints/${id}/updates`, { text, visibility: 'VICTIM' });
                                    alert('Summon Issued & Sent to Victim Timeline');
                                    setSummonReason('');
                                    setSummonDate('');
                                    loadComplaint();
                                } catch (e) { alert('Failed to Issue Summon'); }
                            }}
                            className="bg-header text-white w-full py-3 rounded font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Issue Summon
                        </button>
                    </div>

                </div>

                {/* Full Description Block */}
                <div className="mt-8 bg-white p-6 rounded shadow-card">
                    <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Full Complaint Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 p-4 rounded border border-gray-100">
                                {complaint.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Additional Info</h3>
                            <div className="space-y-2">
                                <p className="text-sm"><span className="font-bold">Category:</span> {complaint.category}</p>
                                <p className="text-sm"><span className="font-bold">Incident Date:</span> {complaint.incident_date || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CaseManagement;
