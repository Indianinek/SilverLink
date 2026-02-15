import { useApp } from '../../context/AppContext';
import { ClipboardList, Clock, User } from 'lucide-react';

export default function StaffReports() {
    const { staffReports } = useApp();

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">Raporty Zmian</h2>
                <p className="text-sm text-text-secondary mt-1">Przegląd raportów z dyżurów personelu</p>
            </div>

            <div className="space-y-5">
                {staffReports.map(report => (
                    <article key={report.id} className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5 border-b border-border bg-bg/50 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-text">{report.author}</h4>
                                    <p className="text-[11px] text-text-secondary">{report.shift}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-text-light">
                                <Clock className="w-3 h-3" />
                                {formatDate(report.timestamp)}
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-text leading-relaxed">{report.content}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
