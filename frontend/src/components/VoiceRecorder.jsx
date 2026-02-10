import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader, UploadCloud, X, CheckCircle } from 'lucide-react';
import api from '../api/axios';

const VoiceRecorder = ({ onAnalysisComplete, onClose }) => {
    const [recording, setRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check if browser supports Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-IN'; // Indian English

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + ' ';
                    }
                }
                if (finalTranscript) {
                    setTranscript(prev => prev + finalTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setError(`Error: ${event.error}`);
                setRecording(false);
            };
        } else {
            setError("Speech recognition not supported. Please use Chrome.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startRecording = () => {
        setError(null);
        setTranscript('');
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current && recording) {
            recognitionRef.current.stop();
            setRecording(false);
        }
    };

    const handleAnalyze = async () => {
        if (!transcript.trim()) {
            setError("No transcript available. Please record first.");
            return;
        }

        setAnalyzing(true);
        setError(null);

        try {
            const res = await api.post('/voice/extract', { transcript }, {
                timeout: 30000
            });

            if (res.data.success && res.data.data) {
                onAnalysisComplete(res.data.data, transcript);
            } else {
                setError("AI could not extract valid data. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">

                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Voice Complaint Assistant</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Speak clearly. AI will analyze and fill the form.
                    </p>
                </div>

                {/* VISUALIZER / STATUS */}
                <div className="flex flex-col items-center justify-center min-h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 mb-4 p-4">
                    {analyzing ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                            <span className="text-sm font-medium text-blue-600 animate-pulse">Analyzing with AI...</span>
                        </div>
                    ) : recording ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex gap-1 items-end h-8">
                                <span className="w-1 bg-red-500 animate-[bounce_1s_infinite] h-4"></span>
                                <span className="w-1 bg-red-500 animate-[bounce_1.2s_infinite] h-8"></span>
                                <span className="w-1 bg-red-500 animate-[bounce_0.8s_infinite] h-5"></span>
                            </div>
                            <span className="text-sm text-red-500 font-bold tracking-widest">LISTENING...</span>
                        </div>
                    ) : transcript ? (
                        <div className="text-left w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-semibold text-green-600">Recorded:</span>
                            </div>
                            <p className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                                {transcript}
                            </p>
                        </div>
                    ) : (
                        <span className="text-gray-400 text-sm">Ready to record</span>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* CONTROLS */}
                <div className="flex gap-3">
                    {!recording && !transcript && (
                        <button
                            onClick={startRecording}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <Mic className="w-5 h-5" /> Start Recording
                        </button>
                    )}

                    {recording && (
                        <button
                            onClick={stopRecording}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors animate-pulse"
                        >
                            <Square className="w-5 h-5 fill-current" /> Stop
                        </button>
                    )}

                    {!recording && transcript && !analyzing && (
                        <>
                            <button
                                onClick={() => { setTranscript(''); setError(null); }}
                                className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center justify-center transition-colors text-sm font-medium"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleAnalyze}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <UploadCloud className="w-5 h-5" /> Analyze & Fill
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default VoiceRecorder;
