import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ChevronLeft, CheckCircle, Clock, MapPin, Shield, Star, Download } from 'lucide-react';

const TimelinePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);

    // Feedback State
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);

    useEffect(() => {
        loadComplaint();
    }, [id]);

    const loadComplaint = () => {
        api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(console.error);
    }

    if (!complaint) return <div className="p-10 text-center">Loading...</div>;

    const handleFeedbackSubmit = async () => {
        if (rating === 0) return alert('Please select a rating');
        try {
            await api.post(`/complaints/${id}/feedback`, { rating, comment });
            setFeedbackSent(true);
            loadComplaint();
        } catch (e) { alert('Failed to submit feedback'); }
    };

    const downloadFIR = async () => {
        try {
            const response = await api.get(`/complaints/${id}/fir`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `FIR_CPL_${complaint.complaint_id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (e) {
            alert('Failed to generate FIR');
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] font-sans">
            <header className="bg-header h-16 flex items-center px-6 text-white shadow-md">
                <button onClick={() => navigate('/victim-dashboard')} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded">
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <div className="ml-auto flex items-center gap-4">
                    <button onClick={downloadFIR} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center gap-2 border border-white/20">
                        <Download className="w-4 h-4" /> Download FIR
                    </button>
                    <div className="font-bold tracking-wider uppercase">Case #{complaint.complaint_id} Timeline</div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                {/* Header Card */}
                <div className="bg-white p-6 rounded shadow-card mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{complaint.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> {complaint.category}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {complaint.incident_location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(complaint.created_at).toLocaleDateString()}</span>
                        </div>
                        {/* Description Display */}
                        <p className="mt-4 text-gray-700 bg-gray-50 p-3 rounded border border-gray-200 text-sm max-w-2xl text-left">
                            <span className="font-bold block text-xs uppercase text-gray-400 mb-1">Description</span>
                            {complaint.description}
                        </p>
                    </div>

                    <div className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-sm ${complaint.current_status === 'CLOSED' ? 'bg-green-100 text-green-700 border border-green-200' :
                        complaint.current_status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                            'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                        {complaint.current_status}
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-gray-300 ml-4 space-y-8 pb-10">
                    {complaint.timeline && complaint.timeline.length > 0 ? (
                        complaint.timeline.map((event, index) => (
                            <div key={index} className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full border-2 border-white shadow-sm"></div>
                                <div className="bg-white p-4 rounded shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-accent uppercase tracking-wider">
                                            {event.author_role === 'POLICE' ? 'Officer Update' : 'Your Response'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {/* Mongo ObjectIds have timestamps but simpler to rely on basic info or passed timestamp if available. 
                                                Schema didn't explicitly demand timestamp in subdoc but Mongo adds _id. 
                                                If we want date, we might need to add it to schema or extract from _id.
                                                For now, just showing status.
                                            */}
                                            Update
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{event.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="pl-8 text-gray-500 italic">No updates regarding this case yet. Investigation is underway.</div>
                    )}
                </div>

                {/* Feedback Section (If Closed) */}
                {complaint.current_status === 'CLOSED' && (
                    <div className="mt-12 bg-white p-8 rounded shadow-lg border-t-4 border-accent text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Case Closed</h2>
                        <p className="text-gray-500 mb-6">This case has been officially closed by the department.</p>

                        {!complaint.feedback && !feedbackSent ? (
                            <div className="max-w-md mx-auto">
                                <h3 className="text-lg font-bold text-accent mb-4">Rate Your Experience</h3>
                                <div className="flex justify-center gap-2 mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        >
                                            <Star className="w-8 h-8 fill-inherit" />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className="w-full border border-gray-300 rounded p-3 mb-4 text-sm"
                                    placeholder="Any comments on the officer's conduct?"
                                    rows="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <button
                                    onClick={handleFeedbackSubmit}
                                    className="bg-accent text-white px-6 py-2 rounded font-bold uppercase tracking-wider hover:bg-yellow-600 transition"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        ) : (
                            <div className="bg-green-50 p-4 rounded text-green-800 border border-green-200 inline-block">
                                <div className="flex items-center gap-2 justify-center font-bold mb-1">
                                    <CheckCircle className="w-5 h-5" /> Feedback Received
                                </div>
                                <p className="text-sm">Thank you for helping us improve.</p>
                                {complaint.feedback && (
                                    <div className="flex gap-1 justify-center mt-2 text-yellow-500">
                                        {[...Array(complaint.feedback.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TimelinePage;
