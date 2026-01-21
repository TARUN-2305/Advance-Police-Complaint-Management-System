import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleSelection from './pages/RoleSelection';
import LoginUnified from './pages/LoginUnified';
import RegisterPage from './pages/RegisterPage';
import VictimDashboard from './pages/VictimDashboard';
import PoliceDashboard from './pages/PoliceDashboard';
import PublicSearch from './pages/PublicSearch';
import TimelinePage from './pages/TimelinePage';
import CaseManagement from './pages/CaseManagement';
import LodgeComplaint from './pages/LodgeComplaint';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                    <Routes>
                        <Route path="/" element={<RoleSelection />} />
                        <Route path="/login/citizen" element={<LoginUnified role="citizen" />} />
                        <Route path="/login/police" element={<LoginUnified role="police" />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/search" element={<PublicSearch />} />

                        {/* Protected Victim Routes */}
                        <Route
                            path="/victim-dashboard"
                            element={
                                <ProtectedRoute role="VICTIM">
                                    <VictimDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/lodge-complaint"
                            element={
                                <ProtectedRoute role="VICTIM">
                                    <LodgeComplaint />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/track/:id"
                            element={
                                <ProtectedRoute role="VICTIM">
                                    <TimelinePage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Protected Police Routes */}
                        <Route
                            path="/police-dashboard"
                            element={
                                <ProtectedRoute role="OFFICER">
                                    <PoliceDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/manage-complaint/:id"
                            element={
                                <ProtectedRoute role="OFFICER">
                                    <CaseManagement />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
