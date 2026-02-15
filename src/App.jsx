import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';
import Dashboard from './pages/caregiver/Dashboard';
import EmarModule from './pages/caregiver/EmarModule';
import Newsfeed from './pages/family/Newsfeed';
import Chat from './pages/family/Chat';
import SeniorProfile from './pages/admin/SeniorProfile';
import IncidentLog from './pages/admin/IncidentLog';
import StaffReports from './pages/admin/StaffReports';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          {/* Caregiver routes */}
          <Route element={<Layout />}>
            <Route path="/caregiver" element={<Dashboard />} />
            <Route path="/caregiver/emar" element={<EmarModule />} />

            {/* Family routes */}
            <Route path="/family" element={<Newsfeed />} />
            <Route path="/family/chat" element={<Chat />} />

            {/* Admin routes */}
            <Route path="/admin" element={<SeniorProfile />} />
            <Route path="/admin/incidents" element={<IncidentLog />} />
            <Route path="/admin/reports" element={<StaffReports />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
