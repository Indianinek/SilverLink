import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Calendar, FileText, AlertCircle } from 'lucide-react';

const severityOptions = [
    { value: 'low', label: 'Niski', color: 'text-accent-amber bg-accent-amber/10' },
    { value: 'medium', label: 'Średni', color: 'text-[#F57C00] bg-[#F57C00]/10' },
    { value: 'high', label: 'Wysoki', color: 'text-accent-red bg-accent-red/10' }
];

export default function IncidentLog() {
    const { residents, incidents, addIncident } = useApp();
    const [form, setForm] = useState({ residentId: residents[0]?.id || '', date: new Date().toISOString().slice(0, 16), description: '', severity: 'low' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.description.trim()) return;
        const res = residents.find(r => r.id === Number(form.residentId));
        addIncident({
            residentId: Number(form.residentId),
            residentName: res ? `${res.firstName} ${res.lastName}` : 'Nieznany',
            date: form.date,
            description: form.description,
            severity: form.severity
        });
        setForm(f => ({ ...f, description: '' }));
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">Logowanie Incydentów</h2>
                <p className="text-sm text-text-secondary mt-1">Szybkie raportowanie zdarzeń</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">Podopieczny</label>
                        <select value={form.residentId} onChange={e => setForm(f => ({ ...f, residentId: e.target.value }))}
                            className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                            {residents.map(r => <option key={r.id} value={r.id}>{r.photo} {r.firstName} {r.lastName}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">Data i godzina</label>
                        <input type="datetime-local" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Stopień pilności</label>
                    <div className="flex gap-2">
                        {severityOptions.map(opt => (
                            <button key={opt.value} type="button" onClick={() => setForm(f => ({ ...f, severity: opt.value }))}
                                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${form.severity === opt.value ? `${opt.color} ring-2 ring-current/20` : 'bg-bg text-text-secondary'
                                    }`}>{opt.label}</button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Opis zdarzenia</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Opisz szczegóły incydentu..."
                        className="w-full h-28 bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>

                <button type="submit" disabled={!form.description.trim()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer shadow-sm">
                    <span className="flex items-center justify-center gap-2"><FileText className="w-4 h-4" />Zapisz incydent</span>
                </button>
            </form>

            {/* Incidents Table */}
            {incidents.length > 0 && (
                <div className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-text text-sm">Zalogowane incydenty ({incidents.length})</h3>
                    </div>
                    <div className="divide-y divide-border">
                        {incidents.map(inc => {
                            const sev = severityOptions.find(s => s.value === inc.severity);
                            return (
                                <div key={inc.id} className="p-4 hover:bg-bg/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-text-secondary" />
                                            <span className="text-sm font-medium text-text">{inc.residentName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${sev?.color || ''}`}>{sev?.label}</span>
                                            <span className="text-[10px] text-text-light">{new Date(inc.date).toLocaleString('pl-PL')}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-secondary">{inc.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {incidents.length === 0 && (
                <div className="text-center py-12 text-text-light">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Brak zalogowanych incydentów</p>
                </div>
            )}
        </div>
    );
}
