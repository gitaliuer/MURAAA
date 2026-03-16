export default function About() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 relative z-10 animate-[fadeIn_0.5s_ease-out]">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple rounded-full mix-blend-screen filter blur-[100px] opacity-20 transition-transform duration-1000 group-hover:scale-150"></div>
                
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple inline-block mb-8 drop-shadow-lg relative z-10">
                    О проекте MURA
                </h1>
                
                <div className="space-y-6 text-white/80 text-lg leading-relaxed relative z-10">
                    <p>
                        <strong className="text-white">MURA (от каз. "Наследие")</strong> — это инновационный проект, созданный на стыке глубоких культурных традиций Казахстана и передовых технологий искусственного интеллекта.
                    </p>
                    <p>
                        Наша цель — дать возможность каждому прикоснуться к богатому визуальному языку степи: от загадочного Скифского золота и философии Тенгри до современной кибер-адаптации кочевых мотивов.
                    </p>
                    <div className="my-10 p-6 border-l-4 border-neon-blue bg-white/5 backdrop-blur-sm rounded-r-xl shadow-lg">
                        <p className="italic text-white/90 font-medium">
                            «Будущее невозможно построить, не понимая, на каком фундаменте оно возводится. Нейросети — это лишь новая кисть, а краски мы берем из тысячелетней истории.»
                        </p>
                    </div>
                    <p>
                        Используя мощь Pollinations.ai, этот генератор преобразует ваши идеи в уникальные арты, пропуская их через призму традиционного казахского орнамента, эпоса и футуризма. Создавайте свои легенды Нео-Степи прямо сейчас.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-white/50 text-sm">
                    <span>Разработано с ❤️ для сохранения культуры</span>
                    <span>Версия 2.0 (AI Edition)</span>
                </div>
            </div>

            <style jsx="true">{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
