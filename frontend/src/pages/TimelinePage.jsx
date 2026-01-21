import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    Clock, MapPin, User, ChevronLeft
} from 'lucide-react';

// Mockup: Complaint track.png
const TimelinePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);

    useEffect(() => {
        api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(console.error);
    }, [id]);

    if (!complaint) return <div className="p-10 text-center">Loading Record...</div>;

    const timeline = complaint.timeline || [];

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Detailed Header Bar */}
            <header className="bg-header text-white py-4 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={() => navigate(-1)} className="hover:bg-white/10 p-1 rounded"><ChevronLeft /></button>
                    <h1 className="text-lg font-bold tracking-wide uppercase">COMPLAINT ID: #CPL-{complaint.complaint_id}</h1>
                </div>

                <div className="px-4 py-1.5 rounded bg-white/10 border border-blue-400 text-blue-300 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {complaint.current_status.replace('_', ' ')}
                </div>

                <div className="text-right text-xs md:text-sm text-gray-300 uppercase font-medium">
                    ASSIGNED STATION: <span className="text-white font-bold">{complaint.station?.station_name || 'PENDING'}</span>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6 md:p-10">
                {/* 1. Complaint Details Section */}
                <div className="bg-white p-6 rounded-lg shadow-card mb-10 border border-gray-100">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-b pb-2">My Complaint Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">Description</h3>
                            <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded text-sm">
                                {complaint.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">Uploaded Evidence</h3>
                            {complaint.evidence && complaint.evidence.length > 0 ? (
                                <div className="space-y-2">
                                    {complaint.evidence.map((ev, i) => (
                                        <a
                                            key={i}
                                            href={`http://localhost:5000${ev.file_url}`}
                                            target="_blank"
                                            className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded transition-colors group"
                                        >
                                            <div className="bg-blue-100 p-1.5 rounded text-blue-600 group-hover:bg-blue-200">
                                                <FileIcon />
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">{ev.description || 'Evidence'}</span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic">No files uploaded.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {/* Static Start Node */}
                        <div className="relative flex flex-col md:flex-row items-center justify-between group">
                            <div className="md:w-1/2 md:pr-10 md:text-right pl-20 md:pl-0 mb-4 md:mb-0 w-full text-left">
                                <h3 className="font-bold text-header text-sm uppercase tracking-wide mb-1 flex items-center md:justify-end gap-2">
                                    <FileIcon /> {new Date(complaint.created_at).toLocaleString()}
                                </h3>
                                <p className="text-gray-600 font-bold">Complaint Lodged.</p>
                            </div>

                            <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-white border-4 border-blue-500 rounded-full transform -translate-x-1/2 z-10 shadow-sm"></div>

                            <div className="md:w-1/2 md:pl-10 w-full pl-20">
                                <div className="bg-white p-4 rounded shadow-card border-l-4 border-header relative">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase">
                                        <Clock className="w-3 h-3" /> {new Date(complaint.created_at).toLocaleString()}
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed">
                                        Your complaint has been successfully lodged. An acknowledgement has been sent.
                                    </p>
                                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-[10px] uppercase font-bold rounded">Public</span>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Timeline Items */}
                        {timeline.map((item, idx) => (
                            <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between group">
                                <div className="md:w-1/2 md:pr-10 md:text-right pl-20 md:pl-0 mb-4 md:mb-0 w-full text-left">
                                    <h3 className="font-bold text-header text-sm uppercase tracking-wide mb-1 flex items-center md:justify-end gap-2">
                                        {item.author_role === 'OFFICER' ? <UserIcon /> : <UpdateIcon />}
                                        {new Date(item.timestamp).toLocaleString()}
                                    </h3>
                                    <p className="text-gray-600 font-bold">Investigation Update</p>
                                </div>

                                <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-white border-4 border-blue-500 rounded-full transform -translate-x-1/2 z-10 shadow-sm group-hover:scale-125 transition-transform"></div>

                                <div className="md:w-1/2 md:pl-10 w-full pl-20">
                                    <div className="bg-white p-4 rounded shadow-card border-l-4 border-header relative hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase">
                                            <Clock className="w-3 h-3" /> {new Date(item.timestamp).toLocaleString()}
                                        </div>
                                        <p className="text-gray-800 text-sm leading-relaxed">
                                            {item.text}
                                        </p>
                                        {/* Visibility Badges */}
                                        <span className={`absolute bottom-2 right-2 px-2 py-0.5 text-white text-[10px] uppercase font-bold rounded ${!item.visibility || item.visibility === 'PUBLIC' ? 'bg-blue-500' :
                                            item.visibility === 'VICTIM' ? 'bg-orange-500' : 'bg-red-500'
                                            }`}>
                                            {item.visibility || 'Public'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Simple Icons
const FileIcon = () => <svg className="w-4 h-4 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const UserIcon = () => <svg className="w-4 h-4 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const UpdateIcon = () => <svg className="w-4 h-4 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export default TimelinePage;
