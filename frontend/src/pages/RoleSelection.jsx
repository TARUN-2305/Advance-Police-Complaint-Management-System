import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

// Mockup: Home page.png
const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-header flex flex-col items-center justify-center relative overflow-hidden">
            {/* Emblem (Placeholder for the Government Emblem) */}
            <div className="mb-8 flex flex-col items-center animate-fade-in">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="h-24 w-auto mb-4 invert" />
                <h1 className="text-white text-3xl font-bold tracking-wider uppercase text-center">
                    Police Complaint Management System
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 z-10">
                {/* Citizen Card */}
                <div className="bg-white w-80 h-80 rounded-[30px] flex flex-col items-center justify-center p-8 shadow-2xl transition-transform hover:scale-105">
                    <User className="w-24 h-24 text-accent mb-6" fill="currentColor" />
                    <h2 className="text-header text-xl font-bold uppercase tracking-wide mb-8">Citizen Login</h2>
                    <button
                        onClick={() => navigate('/login/citizen')}
                        className="bg-accent text-white w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors uppercase tracking-wider"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/search')}
                        className="mt-4 text-gray-400 text-sm hover:text-accent underline"
                    >
                        Public Search
                    </button>
                </div>

                {/* Police Card */}
                <div className="bg-white w-80 h-80 rounded-[30px] flex flex-col items-center justify-center p-8 shadow-2xl transition-transform hover:scale-105">
                    <Shield className="w-24 h-24 text-accent mb-6" fill="currentColor" />
                    <h2 className="text-header text-xl font-bold uppercase tracking-wide mb-8">Police Login</h2>
                    <button
                        onClick={() => navigate('/login/police')}
                        className="bg-accent text-white w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors uppercase tracking-wider"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
