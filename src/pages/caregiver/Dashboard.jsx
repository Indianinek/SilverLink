import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, CloudSun, Moon, Droplets, Footprints, Pill, ChevronDown, ChevronUp } from 'lucide-react';

function MealDropdown({ resident, toggleMeal }) {
    const [open, setOpen] = useState(false);
    const meals = [
        { key: 'breakfast', label: 'Śniadanie', icon: Sun, emoji: '☀️' },
        { key: 'lunch', label: 'Obiad', icon: CloudSun, emoji: '🌤' },
        { key: 'dinner', label: 'Kolacja', icon: Moon, emoji: '🌙' }
    ];

    const allDone = Object.values(resident.meals).every(Boolean);
    const someDone = Object.values(resident.meals).some(Boolean);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[56px] cursor-pointer ${allDone ? 'bg-accent-green/10 text-accent-green' :
                    someDone ? 'bg-accent-amber/10 text-accent-amber' :
                        'bg-bg text-text-secondary hover:bg-primary/5'
                    }`}
            >
                <span className="text-xl">🍽</span>
                <span className="text-[10px] font-medium">Posiłki</span>
                {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-bg-card rounded-xl shadow-lg border border-border p-2 z-50 min-w-[140px]">
                    {meals.map(meal => (
                        <button
                            key={meal.key}
                            onClick={() => toggleMeal(resident.id, meal.key)}
                            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${resident.meals[meal.key]
                                ? 'bg-accent-green/10 text-accent-green'
                                : 'hover:bg-bg text-text-secondary'
                                }`}
                        >
                            <span>{meal.emoji}</span>
                            <span>{meal.label}</span>
                            {resident.meals[meal.key] && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function ADLButton({ active, icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[56px] cursor-pointer ${active
                ? 'bg-accent-green/10 text-accent-green'
                : 'bg-bg text-text-secondary hover:bg-primary/5'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
}

function ResidentCard({ resident, toggleMeal, toggleADL }) {
    const allMeals = Object.values(resident.meals).every(Boolean);
    const medsAdministered = resident.medications.every(m => m.administeredAt !== null);

    return (
        <div className="bg-bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {/* Header */}
            <div className="p-5 flex items-center gap-3 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {resident.photo}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-text text-sm">
                        {resident.firstName} {resident.lastName}
                    </h3>
                    <p className="text-xs text-text-secondary">
                        Wiek: {resident.age} • Pokój {resident.room}
                    </p>
                </div>

                {/* Status Badges */}
                <div className="flex gap-1">
                    {allMeals && (
                        <span className="w-2 h-2 rounded-full bg-accent-green" title="Posiłki OK" />
                    )}
                    {resident.hygiene && (
                        <span className="w-2 h-2 rounded-full bg-primary" title="Higiena OK" />
                    )}
                    {medsAdministered && (
                        <span className="w-2 h-2 rounded-full bg-[#7C5CBF]" title="Leki OK" />
                    )}
                </div>
            </div>

            {/* ADL Icons */}
            <div className="p-4 flex justify-around">
                <MealDropdown resident={resident} toggleMeal={toggleMeal} />

                <ADLButton
                    active={resident.hygiene}
                    icon="🚿"
                    label="Higiena"
                    onClick={() => toggleADL(resident.id, 'hygiene')}
                />

                <ADLButton
                    active={resident.walk}
                    icon="🚶"
                    label="Spacer"
                    onClick={() => toggleADL(resident.id, 'walk')}
                />

                <ADLButton
                    active={medsAdministered}
                    icon="💊"
                    label="Leki"
                    onClick={() => { }}
                />
            </div>

            {/* Diagnoses */}
            <div className="px-5 pb-4">
                <div className="flex flex-wrap gap-1">
                    {resident.diagnoses.map((d, i) => (
                        <span key={i} className="text-[10px] bg-primary/8 text-primary-dark px-2 py-0.5 rounded-full font-medium">
                            {d}
                        </span>
                    ))}
                    {resident.allergies.length > 0 && resident.allergies.map((a, i) => (
                        <span key={`a-${i}`} className="text-[10px] bg-accent-red/10 text-accent-red px-2 py-0.5 rounded-full font-medium">
                            ⚠ {a}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { residents, toggleMeal, toggleADL } = useApp();

    const completedCount = residents.filter(r => {
        const allMeals = Object.values(r.meals).every(Boolean);
        return allMeals && r.hygiene && r.walk;
    }).length;

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">Dashboard Opiekuna</h2>
                <p className="text-sm text-text-secondary mt-1">
                    Status podopiecznych • {completedCount}/{residents.length} kompletne
                </p>

                {/* Progress bar */}
                <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-accent-green rounded-full transition-all duration-500"
                        style={{ width: `${(completedCount / residents.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Resident Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {residents.map(resident => (
                    <ResidentCard
                        key={resident.id}
                        resident={resident}
                        toggleMeal={toggleMeal}
                        toggleADL={toggleADL}
                    />
                ))}
            </div>
        </div>
    );
}
