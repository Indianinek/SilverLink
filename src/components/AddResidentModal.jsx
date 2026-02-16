import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Phone, AlertTriangle, Activity, X } from 'lucide-react';

export default function AddResidentModal({ onClose }) {
    const { addResident } = useApp();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        age: '',
        room: '',
        photo: '👤', // Default emoji
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        allergies: '',
        diagnoses: ''
    });

    const emojis = ['👤', '👵', '👴', '👱‍♂️', '👱‍♀️', '🤕', '🤒'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addResident({
            firstName: form.firstName,
            lastName: form.lastName,
            age: parseInt(form.age),
            room: form.room,
            photo: form.photo,
            emergencyContact: {
                name: form.emergencyContactName,
                phone: form.emergencyContactPhone,
                relation: form.emergencyContactRelation
            },
            allergies: form.allergies ? form.allergies.split(',').map(s => s.trim()) : [],
            diagnoses: form.diagnoses ? form.diagnoses.split(',').map(s => s.trim()) : []
        });

        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-bg-card rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
                <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-bg-card z-10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" /> Dodaj Rezydenta
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-bg rounded-xl transition-colors">
                        <X className="w-5 h-5 text-text-secondary" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Imię</label>
                            <input required type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Jan" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Nazwisko</label>
                            <input required type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Kowalski" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Wiek</label>
                            <input required type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="80" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-1">Pokój</label>
                            <input required type="text" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="101" />
                        </div>
                    </div>

                    {/* Emoji Picker */}
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-2">Avatar</label>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {emojis.map(emoji => (
                                <button key={emoji} type="button" onClick={() => setForm({ ...form, photo: emoji })}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${form.photo === emoji ? 'bg-primary text-white scale-110 shadow-md' : 'bg-bg hover:bg-bg-card border border-border'}`}>
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="border-t border-border pt-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Phone className="w-4 h-4 text-secondary" /> Kontakt Alarmowy</h3>
                        <div className="space-y-3">
                            <input required type="text" value={form.emergencyContactName} onChange={e => setForm({ ...form, emergencyContactName: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="Imię i Nazwisko opiekuna" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="tel" value={form.emergencyContactPhone} onChange={e => setForm({ ...form, emergencyContactPhone: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="Telefon" />
                                <input required type="text" value={form.emergencyContactRelation} onChange={e => setForm({ ...form, emergencyContactRelation: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="Relacja (np. Córka)" />
                            </div>
                        </div>
                    </div>

                    {/* Medical Info */}
                    <div className="border-t border-border pt-4">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-[#7C5CBF]" /> Informacje Medyczne</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">Alergie (po przecinku)</label>
                                <input type="text" value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7C5CBF]/20 outline-none" placeholder="Orzechy, Penicylina" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">Diagnozy (po przecinku)</label>
                                <input type="text" value={form.diagnoses} onChange={e => setForm({ ...form, diagnoses: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7C5CBF]/20 outline-none" placeholder="Cukrzyca, Nadciśnienie" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-border text-text font-medium hover:bg-bg transition-colors">Anuluj</button>
                        <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-md transition-all">Dodaj Rezydenta</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
