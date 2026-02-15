import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Shield, Users, Stethoscope } from 'lucide-react';

const roles = [
    {
        id: 'caregiver',
        label: 'Opiekun',
        sublabel: 'Dashboard opieki',
        icon: Stethoscope,
        path: '/caregiver',
        gradient: 'from-primary to-primary-light',
        description: 'Zarządzaj posiłkami, lekami i aktywnością podopiecznych'
    },
    {
        id: 'family',
        label: 'Rodzina',
        sublabel: 'Portal rodzicielski',
        icon: Heart,
        path: '/family',
        gradient: 'from-secondary to-secondary-light',
        description: 'Śledź aktywność bliskiej osoby i kontaktuj się z opiekunami'
    },
    {
        id: 'admin',
        label: 'Administrator',
        sublabel: 'Panel zarządzania',
        icon: Shield,
        path: '/admin',
        gradient: 'from-[#7C5CBF] to-[#A78BDA]',
        description: 'Profile seniorów, incydenty i raporty zmian'
    }
];

export default function LoginScreen() {
    const navigate = useNavigate();
    const { setRole } = useApp();

    const handleLogin = (role) => {
        setRole(role.id);
        navigate(role.path);
    };

    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 sm:p-8">
            {/* Logo & Header */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg">
                        <Users className="w-7 h-7 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text">
                    Silver<span className="text-primary">Link</span>
                </h1>
                <p className="text-text-secondary mt-2 text-sm sm:text-base">
                    Nowoczesna platforma opieki senioralnej
                </p>
            </div>

            {/* Role Cards */}
            <div className="w-full max-w-md space-y-4">
                <p className="text-center text-text-secondary text-sm font-medium mb-6">
                    Wybierz swoją rolę, aby kontynuować
                </p>

                {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                        <button
                            key={role.id}
                            onClick={() => handleLogin(role)}
                            className="w-full group relative overflow-hidden rounded-2xl bg-bg-card p-5 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-left cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-text">{role.label}</h3>
                                    <p className="text-xs text-text-secondary mt-0.5">{role.description}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-light group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <p className="mt-12 text-xs text-text-light">
                SilverLink v1.0 MVP — Demo
            </p>
        </div>
    );
}
