import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, AlertTriangle, Pill, Activity, Heart, Plus } from 'lucide-react';
import AddResidentModal from '../../components/AddResidentModal';

export default function SeniorProfile() {
    const { residents, loading } = useApp();
    const [selectedId, setSelectedId] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Auto-select first resident when loaded
    useEffect(() => {
        if (!selectedId && residents.length > 0) {
            setSelectedId(residents[0].id);
        }
    }, [residents, selectedId]);

    const resident = residents.find(r => r.id === selectedId);

    // Render loading state if residents are loading or if we have residents but none selected yet
    if (loading || (residents.length > 0 && !resident)) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Render empty state if no residents exist (and not adding one)
    if (!resident && residents.length === 0 && !isAddModalOpen) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all">
                    <Plus className="w-4 h-4" /> Dodaj pierwszego rezydenta
                </button>
                {isAddModalOpen && <AddResidentModal onClose={() => setIsAddModalOpen(false)} />}
            </div>
        );
    }

    if (!resident && isAddModalOpen) {
        return <AddResidentModal onClose={() => setIsAddModalOpen(false)} />;
    }

    // Safety check for resident data structure
    const meals = resident?.meals || { breakfast: false, lunch: false, dinner: false };
    const medications = resident?.medications || [];

    const allMeals = Object.values(meals).every(Boolean);
    const medsGiven = medications.filter(m => m.administeredAt).length;
    const medsTotal = medications.length;

    return (
        <div>
            {isAddModalOpen && <AddResidentModal onClose={() => setIsAddModalOpen(false)} />}

            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text">Profil Seniora 360°</h2>
                    <p className="text-sm text-text-secondary mt-1">Kompletny widok danych podopiecznego</p>
                </div>
                <button onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all shadow-sm hover:translate-y-px">
                    <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Dodaj Rezydenta</span>
                </button>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {residents.map(r => (
                    <button key={r.id} onClick={() => setSelectedId(r.id)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedId === r.id ? 'bg-primary text-white shadow-md' : 'bg-bg-card border border-border text-text-secondary hover:border-primary/30'
                            }`}>
                        <span>{r.photo}</span>
                        {r.firstName} {r.lastName}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Personal Info */}
                <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4"><User className="w-5 h-5 text-primary" /><h3 className="font-semibold text-text">Dane Osobowe</h3></div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">{resident.photo}</div>
                        <div>
                            <h4 className="text-lg font-bold text-text">{resident.firstName} {resident.lastName}</h4>
                            <p className="text-sm text-text-secondary">Wiek: {resident.age} lat • Pokój {resident.room}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            ['Posiłki dzisiaj', `${Object.values(resident.meals).filter(Boolean).length}/3`, allMeals],
                            ['Higiena', resident.hygiene ? '✓ Wykonana' : '○ Oczekuje', resident.hygiene],
                            ['Spacer', resident.walk ? '✓ Odbyty' : '○ Oczekuje', resident.walk],
                            ['Leki podane', `${medsGiven}/${medsTotal}`, medsGiven === medsTotal],
                        ].map(([label, val, ok], i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                <span className="text-xs text-text-secondary">{label}</span>
                                <span className={`text-xs font-medium ${ok ? 'text-accent-green' : 'text-accent-amber'}`}>{val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Emergency Contact + Allergies */}
                <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4"><Phone className="w-5 h-5 text-secondary" /><h3 className="font-semibold text-text">Kontakt Alarmowy</h3></div>
                    <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10">
                        <p className="font-semibold text-text text-sm">{resident.emergencyContact.name}</p>
                        <p className="text-xs text-text-secondary mt-1">{resident.emergencyContact.relation}</p>
                        <a href={`tel:${resident.emergencyContact.phone}`}
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-secondary text-white text-xs font-semibold">
                            <Phone className="w-3.5 h-3.5" />{resident.emergencyContact.phone}
                        </a>
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-accent-red" /><h4 className="font-semibold text-text text-sm">Alergie</h4></div>
                        {resident.allergies.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {resident.allergies.map((a, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-accent-red/10 text-accent-red text-xs font-medium">⚠ {a}</span>
                                ))}
                            </div>
                        ) : <p className="text-xs text-text-light">Brak znanych alergii</p>}
                    </div>
                </div>

                {/* Diagnoses */}
                <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-[#7C5CBF]" /><h3 className="font-semibold text-text">Kluczowe Diagnozy</h3></div>
                    <div className="space-y-2">
                        {resident.diagnoses.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#7C5CBF]/5 border border-[#7C5CBF]/10">
                                <Heart className="w-4 h-4 text-[#7C5CBF]" />
                                <span className="text-sm font-medium text-text">{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Medications */}
                <div className="bg-bg-card rounded-2xl border border-border shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4"><Pill className="w-5 h-5 text-primary" /><h3 className="font-semibold text-text">Lista Leków</h3></div>
                    <div className="space-y-2">
                        {resident.medications.map(med => (
                            <div key={med.id} className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border/50">
                                <div>
                                    <p className="text-sm font-medium text-text">{med.name}</p>
                                    <p className="text-xs text-text-secondary">{med.dose} • {med.schedule}</p>
                                </div>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${med.administeredAt ? 'bg-accent-green/10' : 'bg-accent-amber/10'}`}>
                                    {med.administeredAt ? '✓' : '○'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
