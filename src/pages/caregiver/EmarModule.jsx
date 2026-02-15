import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Clock, AlertCircle } from 'lucide-react';

export default function EmarModule() {
    const { residents, administerMed } = useApp();
    const [selectedId, setSelectedId] = useState(null);

    // Auto-select first resident when loaded
    useEffect(() => {
        if (!selectedId && residents.length > 0) {
            setSelectedId(residents[0].id);
        }
    }, [residents, selectedId]);

    const resident = residents.find(r => r.id === selectedId);

    if (!resident && residents.length > 0) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatTime = (iso) => {
        if (!iso) return null;
        const d = new Date(iso);
        return d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">eMAR — Podawanie Leków</h2>
                <p className="text-sm text-text-secondary mt-1">
                    Elektroniczna karta podawania leków
                </p>
            </div>

            {/* Resident Selector */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-text-secondary mb-2">Wybierz podopiecznego</label>
                <select
                    value={selectedId || ''}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    className="w-full sm:max-w-sm bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                >
                    {residents.map(r => (
                        <option key={r.id} value={r.id}>
                            {r.photo} {r.firstName} {r.lastName} — Pokój {r.room}
                        </option>
                    ))}
                </select>
            </div>

            {resident && (
                <>
                    {/* Info Banner */}
                    {resident.allergies.length > 0 && (
                        <div className="mb-4 p-3 bg-accent-red/10 border border-accent-red/20 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                            <p className="text-xs text-accent-red font-medium">
                                Alergie: {resident.allergies.join(', ')}
                            </p>
                        </div>
                    )}

                    {/* Medication Table */}
                    <div className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-bg">
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Lek</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Dawka</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Harmonogram</th>
                                        <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                                        <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Akcja</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resident.medications.map(med => (
                                        <tr key={med.id} className="border-b border-border/50 last:border-0 hover:bg-bg/50 transition-colors">
                                            <td className="px-5 py-4">
                                                <span className="font-medium text-sm text-text">{med.name}</span>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-text-secondary">{med.dose}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {med.schedule}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                {med.administeredAt ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-medium">
                                                        <Check className="w-3 h-3" />
                                                        Podano {formatTime(med.administeredAt)}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-amber/10 text-accent-amber text-xs font-medium">
                                                        <Clock className="w-3 h-3" />
                                                        Oczekuje
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    onClick={() => administerMed(resident.id, med.id)}
                                                    disabled={med.administeredAt !== null}
                                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${med.administeredAt
                                                        ? 'bg-bg text-text-light cursor-not-allowed'
                                                        : 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow'
                                                        }`}
                                                >
                                                    {med.administeredAt ? 'Podano' : 'Podaj'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="sm:hidden divide-y divide-border">
                            {resident.medications.map(med => (
                                <div key={med.id} className="p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-sm text-text">{med.name}</h4>
                                            <p className="text-xs text-text-secondary mt-0.5">{med.dose} • {med.schedule}</p>
                                        </div>
                                        {med.administeredAt ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-medium">
                                                <Check className="w-3 h-3" />
                                                {formatTime(med.administeredAt)}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => administerMed(resident.id, med.id)}
                                                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-dark shadow-sm transition-all cursor-pointer"
                                            >
                                                Podaj
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
