import { Settings } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, onOpenSettings }) {
    const navItems = [
        { id: 'home', label: 'Генератор' },
        { id: 'gallery', label: 'Галерея' },
        { id: 'about', label: 'Проект MURA' }
    ];

    return (
        <header className="flex flex-col md:flex-row items-center justify-between p-6 w-full max-w-7xl mx-auto gap-4 relative z-20">
            <h1 
                className="text-3xl font-bold tracking-tighter cursor-pointer"
                onClick={() => setCurrentPage('home')}
            >
                <span className="text-neon-gradient drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]">MURA AI</span>
            </h1>

            <div className="flex items-center gap-4">
                <nav className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                currentPage === item.id 
                                ? 'bg-neon-purple/20 text-white shadow-[0_0_15px_rgba(176,38,255,0.4)]'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-full glass-panel hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                    aria-label="Settings"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
