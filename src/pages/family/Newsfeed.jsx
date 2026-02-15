import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Heart, MessageCircle, Clock, Plus } from 'lucide-react';

export default function Newsfeed() {
    const { residents, familyFeed, addFeedItem } = useApp();
    const [selectedSeniorId, setSelectedSeniorId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newContent, setNewContent] = useState('');

    const filteredFeed = selectedSeniorId
        ? familyFeed.filter(f => f.seniorId === selectedSeniorId)
        : familyFeed;

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now - d;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor(diff / 60000);

        if (minutes < 60) return `${minutes} min temu`;
        if (hours < 24) return `${hours} godz. temu`;
        return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    };

    const handleAddPost = () => {
        if (!newContent.trim()) return;
        const seniorId = selectedSeniorId || residents[0].id;
        addFeedItem({
            seniorId,
            content: newContent,
            type: 'status',
            date: new Date().toISOString(),
            author: 'Rodzina'
        });
        setNewContent('');
        setShowAddForm(false);
    };

    return (
        <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">Aktualności</h2>
                <p className="text-sm text-text-secondary mt-1">
                    Codzienne wiadomości o bliskiej osobie
                </p>
            </div>

            {/* Senior Filter */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                    onClick={() => setSelectedSeniorId(null)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${!selectedSeniorId
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-bg-card border border-border text-text-secondary hover:border-primary/30'
                        }`}
                >
                    Wszyscy
                </button>
                {residents.map(r => (
                    <button
                        key={r.id}
                        onClick={() => setSelectedSeniorId(r.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${selectedSeniorId === r.id
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-bg-card border border-border text-text-secondary hover:border-primary/30'
                            }`}
                    >
                        {r.photo} {r.firstName}
                    </button>
                ))}
            </div>

            {/* Add Post Button */}
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full mb-4 bg-bg-card border border-border rounded-2xl p-4 flex items-center gap-3 text-text-secondary hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
            >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Dodaj wpis...</span>
            </button>

            {/* Add Form */}
            {showAddForm && (
                <div className="mb-6 bg-bg-card border border-primary/20 rounded-2xl p-5 shadow-sm">
                    <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Napisz wiadomość..."
                        className="w-full h-24 bg-bg rounded-xl p-4 text-sm text-text placeholder:text-text-light border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-text transition-colors cursor-pointer"
                        >
                            Anuluj
                        </button>
                        <button
                            onClick={handleAddPost}
                            disabled={!newContent.trim()}
                            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer"
                        >
                            Opublikuj
                        </button>
                    </div>
                </div>
            )}

            {/* Feed */}
            <div className="space-y-4">
                {filteredFeed.map(item => {
                    const senior = residents.find(r => r.id === item.seniorId);
                    return (
                        <article
                            key={item.id}
                            className="bg-bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Post Header */}
                            <div className="p-5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-lg">
                                    {senior?.photo || '👤'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-text">{item.author}</h4>
                                    <div className="flex items-center gap-1 text-[11px] text-text-light">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(item.date)}
                                        {senior && (
                                            <span className="ml-1">• {senior.firstName} {senior.lastName}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Photo placeholder */}
                            {item.type === 'photo' && (
                                <div className="mx-5 mb-4 h-56 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl flex items-center justify-center">
                                    <span className="text-6xl">{item.photoUrl}</span>
                                </div>
                            )}

                            {/* Content */}
                            <div className="px-5 pb-4">
                                <p className="text-sm text-text leading-relaxed">{item.content}</p>
                            </div>

                            {/* Actions */}
                            <div className="px-5 pb-4 flex items-center gap-5 border-t border-border/50 pt-4">
                                <button className="flex items-center gap-1.5 text-text-light hover:text-secondary transition-colors text-xs cursor-pointer">
                                    <Heart className="w-4 h-4" />
                                    Lubię to
                                </button>
                                <button className="flex items-center gap-1.5 text-text-light hover:text-primary transition-colors text-xs cursor-pointer">
                                    <MessageCircle className="w-4 h-4" />
                                    Komentarz
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
