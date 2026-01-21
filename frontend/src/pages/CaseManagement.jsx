import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, Upload, Send, Calendar, Loader, ArrowRightLeft, Lock, FileText, Download } from 'lucide-react';

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

    // Transfer State
    const [stations, setStations] = useState([]);
    const [isTransferring, setIsTransferring] = useState(false);
    const [transferTarget, setTransferTarget] = useState('');
    const [transferReason, setTransferReason] = useState('');

    // Internal Notes State
    const [notes, setNotes] = useState([]);
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        loadComplaint();
        loadNotes();
        api.get('/stations').then(res => setStations(res.data)).catch(console.error);
    }, [id]);

    const loadComplaint = () => {
        api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(console.error);
    }

    const loadNotes = () => {
        api.get(`/complaints/${id}/notes`).then(res => setNotes(res.data)).catch(err => console.error("Failed to load notes", err));
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

    const handleTransfer = async () => {
        if (!transferTarget || !transferReason) {
            alert("Please select a target station and provide a reason.");
            return;
        }

        if (!window.confirm("Are you sure you want to transfer this case? You will lose access until reassigned.")) return;

        try {
            await api.put(`/complaints/${id}/transfer`, {
                target_station_id: transferTarget,
                reason: transferReason
            });
            alert('Case Transferred Successfully');
            navigate('/police-dashboard');
        } catch (e) {
            alert('Transfer failed: ' + (e.response?.data?.message || e.message));
        }
    };

    const handleAddNote = async () => {
        if (!noteContent.trim()) return;
        try {
            await api.post(`/complaints/${id}/notes`, { content: noteContent });
            setNoteContent('');
            loadNotes();
        } catch (e) { alert('Failed to add note'); }
    };

    const downloadFIR = async () => {
        try {
            const res = await api.get(`/complaints/${id}/fir`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `FIR_CPL_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (e) { alert('Failed to download FIR'); }
    };

    return (
        <div className="min-h-screen bg-background font-sans relative pb-20">

            {/* Transfer Modal */}
            {isTransferring && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg w-[500px] shadow-2xl border-t-4 border-accent">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ArrowRightLeft className="w-6 h-6 text-accent" /> Transfer Case
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Target Station</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={transferTarget}
                                    onChange={(e) => setTransferTarget(e.target.value)}
                                >
                                    <option value="">Select Station...</option>
                                    {stations.filter(s => s.station_id !== complaint.station_id).map(s => (
                                        <option key={s.station_id} value={s.station_id}>{s.station_name} ({s.location})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Reason for Transfer</label>
                                <textarea
                                    className="w-full border p-2 rounded h-24"
                                    placeholder="e.g. Jurisdiction mismatch, specialist required..."
                                    value={transferReason}
                                    onChange={(e) => setTransferReason(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-end mt-8">
                            <button
                                onClick={() => setIsTransferring(false)}
                                className="px-5 py-2 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTransfer}
                                className="px-5 py-2 bg-accent text-white rounded font-bold hover:bg-yellow-600"
                            >
                                Confirm Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                <div className="flex gap-4 items-center">
                    <button onClick={downloadFIR} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded font-bold text-sm shadow transition-colors flex items-center gap-2 border border-white/20">
                        <Download className="w-4 h-4" /> FIR
                    </button>
                    {/* Transfer Button */}
                    {complaint.current_status !== 'CLOSED' && (
                        <button
                            onClick={() => setIsTransferring(true)}
                            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded font-bold text-sm shadow transition-colors flex items-center gap-2 border border-white/20"
                        >
                            <ArrowRightLeft className="w-4 h-4" /> Transfer
                        </button>
                    )}

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

            <main className="p-8 max-w-[1600px] mx-auto space-y-8">
                {/* Visual Indicator if Transferred */}
                {complaint.is_transferred && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-800 p-4 rounded flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" />
                        <strong>Notice:</strong> This case was transferred from another station. Please review the timeline for details.
                    </div>
                )}

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
                                        <a href={`http://localhost:5001${ev.file_url}`} target="_blank" className="font-medium text-blue-600 truncate max-w-[150px]">{ev.file_url.split('/').pop()}</a>
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

                {/* Internal Notes Section - Police Only */}
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded shadow-card">
                    <h2 className="text-lg font-bold text-yellow-800 uppercase mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5" /> Internal Police Notes (Confidential)
                    </h2>

                    <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2">
                        {notes.length === 0 && <p className="text-gray-500 italic text-sm">No internal notes yet.</p>}
                        {notes.map(note => (
                            <div key={note._id} className="bg-white p-3 rounded border border-yellow-100 shadow-sm">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-sm text-gray-800">{note.officer_name}</span>
                                    <span className="text-xs text-gray-400">{new Date(note.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-gray-700 text-sm whitespace-pre-wrap">{note.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <textarea
                            className="flex-1 border border-yellow-300 rounded p-2 text-sm focus:border-yellow-500 focus:outline-none bg-white"
                            placeholder="Add a confidential note for other officers..."
                            rows="2"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        ></textarea>
                        <button
                            onClick={handleAddNote}
                            className="bg-yellow-600 text-white px-4 py-2 rounded font-bold hover:bg-yellow-700 transition items-center flex gap-2"
                        >
                            <FileText className="w-4 h-4" /> Add Note
                        </button>
                    </div>
                </div>

                {/* Full Description Block */}
                <div className="bg-white p-6 rounded shadow-card">
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
