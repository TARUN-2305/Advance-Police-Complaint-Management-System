import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { User, Lock, ArrowLeft } from 'lucide-react';

const LoginPage = ({ role }) => {
    const isOfficer = role === 'police';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [req2FA, setReq2FA] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const apiRole = isOfficer ? 'OFFICER' : 'VICTIM';
        const res = await login(email, password, apiRole, req2FA ? otp : undefined);

        if (res.success) {
            navigate(isOfficer ? '/police-dashboard' : '/victim-dashboard');
        } else {
            if (res.message === '2FA_REQUIRED') {
                setReq2FA(true);
                setError('');
            } else {
                setError(res.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-police-blue mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <h2 className="text-center text-3xl font-extrabold text-police-navy">
                    {isOfficer ? 'Officer Portal' : 'Citizen Portal'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {req2FA ? 'Enter your 2FA Security Code' : 'Sign in to access the system'}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-police-navy">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && <div className="bg-red-50 text-red-700 p-3 rounded text-sm text-center">{error}</div>}

                        {!req2FA ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {isOfficer ? 'Badge ID / Email' : 'Email Address'}
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={isOfficer ? "text" : "email"}
                                            required
                                            className="focus:ring-police-blue focus:border-police-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                            placeholder={isOfficer ? "Enter Badge ID or Email" : "Enter your email"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="focus:ring-police-blue focus:border-police-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Authenticator Code (6-Digit)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        className="focus:ring-police-blue focus:border-police-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 tracking-widest font-mono text-center text-lg"
                                        placeholder="000 000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            {!req2FA && (
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-police-blue hover:text-police-navy">
                                        Forgot password?
                                    </a>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isOfficer ? 'bg-police-navy hover:bg-black' : 'bg-police-blue hover:bg-blue-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-police-blue transition-colors`}
                            >
                                {req2FA ? 'Verify 2FA Code' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    {!isOfficer && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">New User?</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    to="/register"
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Register New Account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
