import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ArrowLeft, UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { registerVictim } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        full_name: '', email: '', phone_number: '', address: '', password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerVictim(formData);
        if (res.success) navigate('/victim-dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <button onClick={() => navigate('/login/citizen')} className="flex items-center text-gray-500 hover:text-police-blue mb-6">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                        </button>
                        <div className="uppercase tracking-wide text-sm text-police-blue font-semibold mb-1">New Registration</div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Citizen Account Setup</h1>

                        <form className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" onSubmit={handleSubmit}>
                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" required className="mt-1 focus:ring-police-blue focus:border-police-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" required className="mt-1 focus:ring-police-blue focus:border-police-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" required className="mt-1 focus:ring-police-blue focus:border-police-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    onChange={e => setFormData({ ...formData, phone_number: e.target.value })} />
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea required rows="3" className="mt-1 focus:ring-police-blue focus:border-police-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" required className="mt-1 focus:ring-police-blue focus:border-police-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                                    onChange={e => setFormData({ ...formData, password: e.target.value })} />
                            </div>

                            <div className="sm:col-span-6">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-police-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-police-blue">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
