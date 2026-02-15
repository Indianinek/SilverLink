import { useApp } from '../context/AppContext';

export default function Toast() {
    const { toast } = useApp();

    if (!toast) return null;

    return (
        <div className="fixed top-6 right-6 z-[100] animate-slide-in">
            <div className="bg-accent-green text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {toast}
            </div>

            <style>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
