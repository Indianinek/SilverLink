import { Link } from 'react-router-dom';
import { Users, Heart, Shield, CheckCircle, ArrowRight, Activity, Clock, MessageCircle } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-bg font-sans text-text">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Silver<span className="text-primary">Link</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2">
                                Zaloguj się <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Nowoczesna opieka senioralna
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text to-text-secondary max-w-4xl mx-auto leading-tight">
                    Opieka, która łączy <br /><span className="text-primary">pokolenia i technologię</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    SilverLink to kompleksowa platforma łącząca domyopieki, rodziny i personel w jednym miejscu. Bezpieczeństwo, transparentność i spokój ducha.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/login" className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Rozpocznij teraz
                    </Link>
                    <button className="px-8 py-4 rounded-2xl bg-white border border-border text-text font-semibold text-lg hover:bg-bg-card transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                        Dowiedz się więcej
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text mb-4">Wszystko, czego potrzebujesz</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Zintegrowane narzędzia dla każdej roli w procesie opieki.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Caregiver Feature */}
                        <div className="p-8 rounded-3xl bg-bg hover:bg-primary/5 transition-colors border border-border hover:border-primary/20 group">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Activity className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dla Opiekunów</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> eMAR - Elektroniczne podawanie leków
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Raportowanie ADL jednym kliknięciem
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Monitorowanie posiłków i higieny
                                </li>
                            </ul>
                        </div>

                        {/* Family Feature */}
                        <div className="p-8 rounded-3xl bg-bg hover:bg-secondary/5 transition-colors border border-border hover:border-secondary/20 group">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-7 h-7 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dla Rodzin</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Aktualności i zdjęcia z życia seniora
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Bezpośredni czat z opiekunami
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Spokój ducha 24/7
                                </li>
                            </ul>
                        </div>

                        {/* Admin Feature */}
                        <div className="p-8 rounded-3xl bg-bg hover:bg-[#7C5CBF]/5 transition-colors border border-border hover:border-[#7C5CBF]/20 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#7C5CBF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7 text-[#7C5CBF]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dla Zarządzających</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Profil Seniora 360°
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Rejestr incydentów i raporty
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary text-sm">
                                    <CheckCircle className="w-4 h-4 text-accent-green" /> Zarządzanie personelem
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Zadowolonych rodzin', value: '100+' },
                            { label: 'Obsłużonych placówek', value: '15' },
                            { label: 'Zarejestrowanych zdarzeń', value: '50k+' },
                            { label: 'Uptime systemu', value: '99.9%' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-text-secondary uppercase tracking-wider font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-border py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-text">Silver<span className="text-primary">Link</span></span>
                    </div>
                    <div className="text-sm text-text-secondary">
                        © 2024 SilverLink. Wszelkie prawa zastrzeżone.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Polityka Prywatności</a>
                        <a href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Regulamin</a>
                        <a href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Kontakt</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
