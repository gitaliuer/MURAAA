export default function InputArea({ prompt, setPrompt, selectedStyle, setSelectedStyle, onGenerate, isGenerating }) {
    const styles = [
        { id: 'nomad', label: 'Номад' },
        { id: 'ornament', label: 'Орнамент' },
        { id: 'tengri', label: 'Тенгри' },
        { id: 'gold', label: 'Скифское Золото' },
        { id: 'cyber', label: 'Кибер-Степь' },
    ];

    return (
        <div className="w-full max-w-3xl mx-auto my-12 px-4 flex flex-col items-center gap-8 z-10 relative">
            <div className="flex flex-wrap items-center justify-center gap-3 w-full animate-[fadeIn_0.5s_ease-out]">
                {styles.map(style => (
                    <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md ${selectedStyle === style.id
                                ? 'bg-white/20 border-white/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                                : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {style.label}
                    </button>
                ))}
            </div>

            <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Опишите вашу историю... (например: Киберпанк-детектив и светящийся кот расследуют тайну Нео-Токио)"
                    className="relative w-full h-32 p-5 bg-dark-800/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-neon-purple resize-none shadow-2xl transition-all"
                />
            </div>

            <button
                onClick={onGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="relative inline-flex h-14 w-full sm:w-auto min-w-[200px] overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-neon-pink disabled:opacity-50 disabled:cursor-not-allowed group transition-transform hover:scale-105 active:scale-95"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-dark-900 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl relative z-10 transition-colors group-hover:bg-dark-900/50">
                    {isGenerating ? (
                        <span className="flex items-center gap-3">
                            <svg className="animate-spin h-5 w-5 text-neon-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Магия в процессе...
                        </span>
                    ) : (
                        <span className="text-lg tracking-wide font-semibold text-white/90 group-hover:text-white drop-shadow-md">
                            Сгенерировать магию
                        </span>
                    )}
                </span>
            </button>
        </div>
    );
}
