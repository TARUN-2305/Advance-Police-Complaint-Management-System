import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, Upload, Send, Calendar, Loader, ArrowRightLeft, Lock, FileText, Download } from 'lucide-react';
import AIAnalysisPanel from '../components/AIAnalysisPanel'; // Import AI Panel

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

    // Share State
    const [isSharing, setIsSharing] = useState(false);
    const [officers, setOfficers] = useState([]);
    const [shareTarget, setShareTarget] = useState('');

    useEffect(() => {
        loadComplaint();
        loadNotes();
        api.get('/stations').then(res => setStations(res.data)).catch(console.error);
        api.get('/complaints/officers').then(res => setOfficers(res.data)).catch(console.error);
    }, [id]);

    const loadComplaint = () => {
        api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(console.error);
    }

    const loadNotes = () => {
        api.get(`/notes/complaints/${id}`).then(res => setNotes(res.data)).catch(err => console.error("Failed to load notes", err));
    }

    const handleAddNote = async () => {
        if (!noteContent.trim()) return;
        try {
            await api.post(`/notes/complaints/${id}`, { content: noteContent });
            setNoteContent('');
            loadNotes();
        } catch (error) {
            alert('Failed to add note');
        }
    };

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

    const handleShare = async () => {
        if (!shareTarget) return alert("Select an officer");
        try {
            await api.post(`/complaints/${id}/share`, { officer_id: shareTarget });
            alert("Case Shared Successfully");
            setIsSharing(false);
            loadComplaint();
        } catch (e) { alert("Share failed"); }
    };

    // Transfer logic handles navigation automatically

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

            {/* Share Modal */}
            {isSharing && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg w-[500px] shadow-2xl border-t-4 border-blue-600">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Send className="w-6 h-6 text-blue-600" /> Share Case Access
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Select Officer</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={shareTarget}
                                    onChange={(e) => setShareTarget(e.target.value)}
                                >
                                    <option value="">Select Officer...</option>
                                    {officers.map(o => (
                                        <option key={o.officer_id} value={o.officer_id}>
                                            {o.full_name} ({o.rank}) - {o.station?.station_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-end mt-8">
                            <button
                                onClick={() => setIsSharing(false)}
                                className="px-5 py-2 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-5 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
                            >
                                Share Access
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                    {/* Share Button */}
                    <button
                        onClick={() => setIsSharing(true)}
                        className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded font-bold text-sm shadow transition-colors flex items-center gap-2 border border-white/20"
                    >
                        <Send className="w-4 h-4" /> Share
                    </button>
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

            <main className="p-8 max-w-[1600px] mx-auto space-y-6">
                {/* Visual Indicator if Transferred */}
                {complaint.is_transferred && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-800 p-4 rounded flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" />
                        <strong>Notice:</strong> This case was transferred from another station. Please review the timeline for details.
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar: AI & Metadata */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* AI Analysis Panel - Highlighting it */}
                        <div className="border-2 border-indigo-100 rounded-lg overflow-hidden shadow-sm">
                            <AIAnalysisPanel complaintId={id} />
                        </div>

                        {/* Case Metadata */}
                        <div className="bg-white p-6 rounded shadow-card">
                            <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Case Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Incident Date</h3>
                                    <p className="text-gray-800 font-medium">
                                        {complaint.incident_date ? new Date(complaint.incident_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-bold uppercase border border-gray-200">
                                        {complaint.category || 'Uncategorized'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location</h3>
                                    <p className="text-gray-800 text-sm">{complaint.incident_location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Original Description - Full Width */}
                        <div className="bg-white p-6 rounded shadow-card">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Original Complaint Description
                            </h3>
                            <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {complaint.description}
                            </div>
                        </div>

                        {/* Actions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Column 1: Add Timeline Update */}
                            <div className="bg-white p-6 rounded shadow-card h-full flex flex-col">
                                <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Timeline Update</h2>
                                <textarea
                                    className="w-full border border-gray-300 rounded p-4 text-sm focus:border-header focus:ring-1 focus:ring-header mb-4 flex-1 resize-none bg-gray-50"
                                    placeholder="Enter investigation update details..."
                                    rows="6"
                                    value={updateText}
                                    onChange={(e) => setUpdateText(e.target.value)}
                                ></textarea>
                                <div className="mb-4">
                                    <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">Visibility</label>
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
                                <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Evidence</h2>
                                <div
                                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-gray-100 transition-colors flex-1"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-600">Click to Upload</span>
                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                                </div>

                                {/* File List */}
                                <div className="space-y-2 mb-4 flex-1 overflow-y-auto max-h-40 min-h-[100px]">
                                    {complaint.evidence && complaint.evidence.length > 0 ? (
                                        complaint.evidence.map((ev, i) => (
                                            <div key={i} className="flex justify-between items-center text-xs p-2 bg-gray-100 rounded border border-gray-200">
                                                <a href={`http://localhost:5001${ev.file_url}`} target="_blank" className="font-medium text-blue-600 truncate max-w-[120px]">{ev.file_url.split('/').pop()}</a>
                                                <span className="text-[10px] bg-gray-200 px-1 py-0.5 rounded text-gray-600 font-bold uppercase">{ev.visibility}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-400 text-xs py-4">No evidence uploaded yet.</p>
                                    )}
                                </div>
                                <button
                                    disabled={uploading}
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-header text-white w-full py-3 rounded font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {uploading ? 'Uploading...' : 'Upload Evidence'}
                                </button>
                            </div>

                            {/* Column 3: Issue Summon */}
                            <div className="bg-white p-6 rounded shadow-card h-full flex flex-col">
                                <h2 className="text-lg font-bold text-header uppercase mb-4 border-b pb-2">Issue Summon</h2>
                                <div className="mb-4">
                                    <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        value={summonDate}
                                        onChange={(e) => setSummonDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">Reason</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded p-3 text-sm h-24 resize-none bg-gray-50"
                                        placeholder="Reason..."
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
                                            alert('Summon Issued');
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

                        {/* Internal Notes Section */}
                        <div className="bg-white rounded shadow p-6 mt-6">
                            <h3 className="text-header font-bold uppercase tracking-wide text-lg mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5" /> Internal Notes (Private)
                            </h3>

                            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4 max-h-60 overflow-y-auto space-y-3">
                                {notes.length === 0 ? (
                                    <p className="text-gray-500 italic text-sm">No internal notes yet.</p>
                                ) : (
                                    notes.map(note => (
                                        <div key={note._id} className="border-b border-yellow-200 pb-2 last:border-0">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-xs uppercase text-gray-700">{note.officer_name}</span>
                                                <span className="text-[10px] text-gray-400">{new Date(note.created_at).toLocaleString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-800 mt-1">{note.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a confidential note..."
                                    className="flex-1 border p-2 rounded text-sm focus:outline-none focus:border-header"
                                    value={noteContent}
                                    onChange={e => setNoteContent(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                                />
                                <button
                                    onClick={handleAddNote}
                                    className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-bold uppercase hover:bg-black transition-colors"
                                >
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default CaseManagement;
