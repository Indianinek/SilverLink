import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Bot, User } from 'lucide-react';

export default function Chat() {
    const { chatMessages, addChatMessage } = useApp();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const autoResponses = [
        "Dziękujemy za wiadomość! Odpowiemy tak szybko jak to możliwe.",
        "Pani mama/tata ma się dobrze. Prosimy o kontakt telefoniczny w razie pilnych pytań.",
        "Oczywiście, przekażemy informację opiekunowi. Pozdrawiamy!",
        "Zapraszamy na wizytę w godzinach 10:00-18:00. Czekamy!",
        "Rozumiemy Państwa troskę. Zapewniamy, że podopieczny jest pod najlepszą opieką."
    ];

    const handleSend = () => {
        if (!input.trim()) return;

        addChatMessage({
            sender: 'family',
            senderName: 'Ja',
            content: input.trim(),
            timestamp: new Date().toISOString()
        });

        setInput('');

        // Auto response after delay
        setTimeout(() => {
            const response = autoResponses[Math.floor(Math.random() * autoResponses.length)];
            addChatMessage({
                sender: 'director',
                senderName: 'Dyrektor Małgorzata',
                content: response,
                timestamp: new Date().toISOString()
            });
        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (iso) => {
        return new Date(iso).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text">Czat z Dyrekcją</h2>
                <p className="text-sm text-text-secondary mt-1">
                    Bezpośredni kontakt z placówką
                </p>
            </div>

            {/* Chat Info */}
            <div className="bg-bg-card rounded-2xl border border-border p-5 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7C5CBF]/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#7C5CBF]" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-text">Dyrektor Małgorzata</h4>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-green" />
                        <span className="text-xs text-accent-green font-medium">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-bg-card rounded-2xl border border-border p-5 space-y-4 mb-6">
                {chatMessages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'family' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] ${msg.sender === 'family' ? 'order-1' : 'order-1'}`}>
                            <div
                                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'family'
                                    ? 'bg-primary text-white rounded-br-md'
                                    : 'bg-bg text-text rounded-bl-md'
                                    }`}
                            >
                                {msg.content}
                            </div>
                            <p className={`text-[10px] text-text-light mt-1 ${msg.sender === 'family' ? 'text-right' : 'text-left'}`}>
                                {msg.senderName} • {formatTime(msg.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-bg-card rounded-2xl border border-border p-3 flex items-center gap-2">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Napisz wiadomość..."
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-40 cursor-pointer flex-shrink-0"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
