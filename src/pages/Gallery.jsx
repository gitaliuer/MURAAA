import ComicCard from '../components/ComicCard';

export default function Gallery() {
    const galleryItems = [
        { img: "https://image.pollinations.ai/prompt/scythian_gold_warrior_princess_kazakh_steppe_cinematic_masterpiece?width=1024&height=1024&nologo=true", title: "Скифское Золото" },
        { img: "https://image.pollinations.ai/prompt/tengrism_mythology_shaman_blue_sky_god_ancient_turkic_ethereal?width=1024&height=1024&nologo=true", title: "Тенгри" },
        { img: "https://image.pollinations.ai/prompt/cyberpunk_almaty_kok_tobe_neon_yurt_futuristic_nomad?width=1024&height=1024&nologo=true", title: "Нео-Алматы" },
        { img: "https://image.pollinations.ai/prompt/traditional_kazakh_ornament_pattern_vector_symmetrical_gold_and_blue_glowing?width=1024&height=1024&nologo=true", title: "Сияние Орнамента" }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 relative z-10 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-teal-400 to-neon-purple inline-block mb-4 drop-shadow-lg">
                    Галерея Наследия
                </h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    Коллекция лучших работ нейросети, объединяющая традиционные мотивы Казахстана с технологиями будущего.
                </p>
                <div className="h-1 w-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mt-6 mx-auto shadow-[0_0_15px_rgba(0,210,255,0.5)]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {galleryItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}>
                        <ComicCard panel={{ id: index + 1, status: 'success', img: item.img, progress: 'Готово', error: null }} />
                        <h3 className="text-center text-lg font-bold text-white/90 drop-shadow-md">
                            {item.title}
                        </h3>
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
