import { Download, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ComicCard({ panel }) {
    const { id, status, progress, img, error } = panel;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
    }, [img]);

    // Array of distinct gradients to give each panel a unique glowing look
    const gradients = [
        "from-neon-purple to-neon-blue",
        "from-neon-pink to-neon-purple",
        "from-neon-blue to-teal-400",
        "from-neon-purple to-neon-pink",
    ];

    const currentGradient = gradients[(id - 1) % gradients.length];

    const handleDownload = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!img) return;
        try {
            const response = await fetch(img);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `mura_comic_panel_${id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up to avoid memory leaks
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (err) {
            console.error('Failed to download image:', err);
            // Fallback opening in new tab
            window.open(img, '_blank');
        }
    };

    return (
        <div className="glass-card flex flex-col items-center text-left relative group w-full max-w-sm mx-auto overflow-hidden">
            {/* Image Container with 3/4 aspect ratio */}
            <div className={`relative w-full aspect-[3/4] bg-gradient-to-br ${currentGradient} overflow-hidden rounded-lg flex flex-col items-center justify-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]`}>
                
                {img && status === 'success' && (
                    <img
                        src={img}
                        alt={`Generated Comic Panel ${id}`}
                        onLoad={() => setIsLoaded(true)}
                        className={`absolute inset-0 z-20 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}

                {/* Loading / Error state placeholder */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-opacity duration-1000 ${status === 'success' && isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>

                    <div className="z-10 flex flex-col items-center justify-center gap-4 transform transition-transform duration-500 group-hover:scale-110">
                        {status === 'failed' ? (
                            <>
                                <div className="w-16 h-16 rounded-full border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] text-red-400">
                                    <AlertCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-red-400 drop-shadow-md mt-2">
                                    Ошибка
                                </h3>
                                <p className="text-xs font-medium text-white/60 max-w-[90%] leading-relaxed">
                                    {error || "Не удалось сгенерировать"}
                                </p>
                            </>
                        ) : (
                            <>
                                {/* Spinner */}
                                <div className="w-16 h-16 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-neon-purple animate-spin shadow-[0_0_30px_rgba(176,38,255,0.4)]"></div>
                                </div>
                                
                                <h3 className="text-xl font-bold tracking-widest text-white drop-shadow-md uppercase mt-4 animate-pulse">
                                    Кадр {id}
                                </h3>
                                
                                <p className="text-xs font-medium text-neon-blue/80 max-w-[80%] leading-relaxed">
                                    Генерация...
                                </p>
                            </>
                        )}
                    </div>

                    {/* Cyberpunk grid overlay lines */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wLjUgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none mix-blend-overlay"></div>
                </div>
            </div>

            {/* Hover Action overlay - active only when loaded and successful */}
            {status === 'success' && isLoaded && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none group-hover:pointer-events-auto backdrop-blur-sm">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        <Download className="w-5 h-5" />
                        <span className="font-medium">Скачать кадр</span>
                    </button>
                </div>
            )}
        </div>
    );
}
