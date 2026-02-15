import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Toast from './Toast';
import {
    LayoutDashboard, Pill, Newspaper, MessageCircle,
    UserCircle, AlertTriangle, ClipboardList, LogOut, Users, Heart, Shield, Stethoscope
} from 'lucide-react';

const navConfig = {
    caregiver: {
        label: 'Opiekun',
        icon: Stethoscope,
        gradient: 'from-primary to-primary-light',
        links: [
            { to: '/caregiver', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/caregiver/emar', label: 'eMAR Leki', icon: Pill }
        ]
    },
    family: {
        label: 'Rodzina',
        icon: Heart,
        gradient: 'from-secondary to-secondary-light',
        links: [
            { to: '/family', label: 'Aktualności', icon: Newspaper },
            { to: '/family/chat', label: 'Czat', icon: MessageCircle }
        ]
    },
    admin: {
        label: 'Administrator',
        icon: Shield,
        gradient: 'from-[#7C5CBF] to-[#A78BDA]',
        links: [
            { to: '/admin', label: 'Profile', icon: UserCircle },
            { to: '/admin/incidents', label: 'Incydenty', icon: AlertTriangle },
            { to: '/admin/reports', label: 'Raporty', icon: ClipboardList }
        ]
    }
};

export default function Layout() {
    const { role, setRole, loading } = useApp();
    const navigate = useNavigate();
    const config = navConfig[role];

    const handleLogout = () => {
        setRole(null);
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!config) return null;

    const RoleIcon = config.icon;

    return (
        <div className="min-h-screen bg-bg md:flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-bg-card border-r border-border shadow-sm z-30 sticky top-0 h-screen shrink-0">
                {/* Brand */}
                <div className="p-5 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-text">Silver<span className="text-primary">Link</span></h1>
                        </div>
                    </div>
                </div>

                {/* Role Badge */}
                <div className="px-5 py-4">
                    <div className={`flex items-center gap-2.5 rounded-xl bg-gradient-to-r ${config.gradient} px-4 py-2.5 text-white`}>
                        <RoleIcon className="w-5 h-5" />
                        <span className="font-medium text-sm">{config.label}</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 space-y-1">
                    {config.links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === `/${role}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'text-text-secondary hover:bg-bg hover:text-text'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-accent-red/10 hover:text-accent-red transition-all duration-200 w-full cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        Wyloguj się
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pb-24 md:pb-8 min-h-screen min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-30 bg-bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-text">Silver<span className="text-primary">Link</span></span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-9 h-9 rounded-xl bg-bg flex items-center justify-center text-text-secondary hover:text-accent-red transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </header>

                <div className="p-5 sm:p-8 lg:p-10">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-card/90 backdrop-blur-xl border-t border-border z-50 px-2 pb-[env(safe-area-inset-bottom)]">
                <div className="flex justify-around items-center h-16">
                    {config.links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === `/${role}`}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${isActive
                                        ? 'text-primary'
                                        : 'text-text-light'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10' : ''}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-medium">{link.label}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            <Toast />
        </div>
    );
}
