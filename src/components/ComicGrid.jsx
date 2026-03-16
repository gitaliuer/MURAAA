import ComicCard from './ComicCard';

export default function ComicGrid({ panels }) {
    if (!panels || panels.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-20 relative z-10">
            <div className="flex flex-col mb-10 items-center justify-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple inline-block drop-shadow-lg">
                    Твоя история (Async)
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mt-3 shadow-[0_0_10px_rgba(0,210,255,0.6)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {panels.map((panel, index) => (
                    <div
                        key={panel.id}
                        className="opacity-0 drop-shadow-2xl"
                        style={{ animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.2}s forwards` }}
                    >
                        <ComicCard panel={panel} />
                    </div>
                ))}
            </div>

            <style jsx="true">{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </div>
    );
}
