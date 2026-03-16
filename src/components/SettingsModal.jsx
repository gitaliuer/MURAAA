import { X, Key } from 'lucide-react';
import { useState } from 'react';

export default function SettingsModal({ isOpen, onClose }) {
    const [hfToken, setHfToken] = useState(localStorage.getItem('hf_token') || '');
    const [hordeKey, setHordeKey] = useState(localStorage.getItem('horde_key') || '');

    if (!isOpen) return null;

    const handleSave = () => {
        localStorage.setItem('hf_token', hfToken.trim());
        localStorage.setItem('horde_key', hordeKey.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative glass-card border border-white/20 p-6 md:p-8 w-full max-w-md shadow-[0_0_40px_rgba(176,38,255,0.15)] animate-[scaleIn_0.2s_ease-out]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_10px_rgba(176,38,255,0.4)]">
                        <Key className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">API Settings</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Hugging Face Token
                        </label>
                        <input
                            type="password"
                            value={hfToken}
                            onChange={(e) => setHfToken(e.target.value)}
                            placeholder="hf_..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-white/40 mt-2">huggingface.co/settings/tokens</p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            AI Horde Key <span className="text-white/30">(опционально)</span>
                        </label>
                        <input
                            type="password"
                            value={hordeKey}
                            onChange={(e) => setHordeKey(e.target.value)}
                            placeholder="0000000000 (анонимный по умолчанию)"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-white/40 mt-2">
                            Без ключа используется анонимный режим (медленнее). <a href="https://stablehorde.net/register" target="_blank" rel="noopener noreferrer" className="text-neon-blue/60 hover:text-neon-blue underline">Получить ключ</a>
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-blue rounded-xl font-medium text-white shadow-lg shadow-neon-purple/25 hover:shadow-neon-purple/40 transition-all hover:-translate-y-0.5"
                    >
                        Сохранить
                    </button>
                    <p className="text-xs text-center text-white/40 mt-4">
                        Приятного пользования!
                    </p>
                </div>
            </div>
            <style jsx="true">{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
