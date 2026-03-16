import { useState } from 'react'
import InputArea from '../components/InputArea'
import ComicGrid from '../components/ComicGrid'
import { generateImageHF, generateImageHorde } from '../utils/api'

export default function Home({ onOpenSettings }) {
    const [prompt, setPrompt] = useState('')
    const [selectedStyle, setSelectedStyle] = useState('nomad')
    const [provider, setProvider] = useState('huggingface') // 'huggingface' | 'aihorde'
    const [isGenerating, setIsGenerating] = useState(false)
    const [panels, setPanels] = useState(null)

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        
        // Initialize 3 empty panels
        const initialPanels = Array(3).fill(null).map((_, index) => ({
            id: index + 1,
            status: 'queued',
            progress: 'В очереди...',
            img: null,
            error: null
        }));
        
        setPanels(initialPanels);

        // Global Style Wrapper: every style lives inside the Kazakh Comic Book aesthetic
        const stylePrompts = {
            nomad: "background of vast golden steppe, warm sunlight, nomadic camp far away in distance",
            ornament: "framed by intricate traditional patterns, shyrdak textures, decorative border",
            tengri: "mystical ethereal blue atmosphere, cosmic sky, ancient shamanic energy",
            gold: "rich metallic textures, glowing golden dust, ancient artifacts aesthetic",
            cyber: "neon steppe landscape, futuristic architecture, holographic elements"
        };

        // --- Translation Layer ---
        // Maps common Kazakh / Russian words → precise English descriptions for SDXL
        const dictionary = {
            // People / Characters
            'девушка': 'young woman',
            'женщина': 'woman',
            'мужчина': 'man',
            'воин': 'warrior',
            'батыр': 'Kazakh hero batyr',
            'баксы': 'Kazakh shaman baqsy',
            'аксакал': 'wise elder man',
            // Animals
            'конь': 'horse',
            'лошадь': 'horse',
            'орёл': 'eagle',
            'беркут': 'golden eagle berkut',
            'верблюд': 'camel',
            'барс': 'snow leopard',
            // Objects & Culture
            'домбра': 'traditional Kazakh musical instrument dombra',
            'юрта': 'traditional Kazakh yurt',
            'кобыз': 'Kazakh string instrument kobyz',
            'тюбетейка': 'embroidered Kazakh skullcap tubeteika',
            // Nature / Places
            'степь': 'vast steppe',
            'горы': 'mountains',
            'закат': 'sunset',
            'рассвет': 'dawn',
            'небо': 'sky',
            // Descriptors
            'красивый': 'beautiful',
            'мощный': 'powerful',
            'древний': 'ancient',
            'золотой': 'golden',
        };

        const translateToEnglish = (text) => {
            let result = text.toLowerCase();
            Object.entries(dictionary).forEach(([ru, en]) => {
                result = result.replace(new RegExp(`\\b${ru}\\b`, 'gi'), en);
            });
            return result;
        };

        const translatedPrompt = translateToEnglish(prompt.trim());
        const richStyle = stylePrompts[selectedStyle] || stylePrompts.nomad;

        // ((subject)):1.6 gives SDXL strong focus on what the user described
        const fullPrompt = `((${translatedPrompt})):1.6, ${richStyle}, Kazakh comic book art style, bold dynamic lines, cel-shaded, vibrant cinematic colors, golden hour lighting, dramatic shadows, masterpiece, 8k, sharp focus, highly detailed, trending on ArtStation`;

        // Update a specific panel's state without mutating others
        const updatePanel = (id, data) => {
            setPanels(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
        };

        // Provider-aware dispatch
        if (provider === 'aihorde') {
            // AI Horde: sequential with delay to avoid 429 rate-limiting
            (async () => {
                for (let i = 0; i < initialPanels.length; i++) {
                    const panel = initialPanels[i];

                    // Show user that this panel is being queued
                    updatePanel(panel.id, { status: 'processing', progress: `Кадр ${panel.id}: отправка...` });

                    // 1.5s stagger between submissions (except for the first panel)
                    if (i > 0) await new Promise(r => setTimeout(r, 1500));

                    try {
                        const imageUrl = await generateImageHorde(fullPrompt, (progressText) => {
                            updatePanel(panel.id, { status: 'processing', progress: `Кадр ${panel.id}: ${progressText}` });
                        });
                        updatePanel(panel.id, { status: 'success', img: imageUrl, progress: 'Готово' });
                    } catch (err) {
                        updatePanel(panel.id, { status: 'failed', error: err.message, progress: 'Ошибка' });
                    }
                }
                setIsGenerating(false);
            })();
        } else {
            // Hugging Face: fire all 3 in parallel (no rate limit concern)
            const generationPromises = initialPanels.map(panel =>
                generateImageHF(fullPrompt)
                    .then(imageUrl => {
                        updatePanel(panel.id, { status: 'success', img: imageUrl, progress: 'Готово' });
                    })
                    .catch(err => {
                        const isWarmingUp = err.message === 'WARMING_UP';
                        updatePanel(panel.id, {
                            status: 'failed',
                            error: isWarmingUp ? 'Модель загружается, подождите...' : err.message,
                            progress: 'Ошибка'
                        });
                    })
            );
            Promise.allSettled(generationPromises).then(() => setIsGenerating(false));
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center w-full mt-8">
            <InputArea
                prompt={prompt}
                setPrompt={setPrompt}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
            />

            {/* Provider Toggle */}
            <div className="flex items-center gap-3 mt-4 mb-2">
                <span className="text-white/40 text-xs uppercase tracking-widest">Provider</span>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1">
                    {[['huggingface', '🤗 Hugging Face'], ['aihorde', '🖧 AI Horde']].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setProvider(val)}
                            disabled={isGenerating}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                provider === val
                                    ? 'bg-neon-purple/30 text-white shadow-[0_0_12px_rgba(176,38,255,0.5)]'
                                    : 'text-white/50 hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {provider === 'aihorde' && (
                    <span className="text-yellow-400/70 text-xs">⚠️ Очередь — может быть долго</span>
                )}
            </div>

            {panels && <ComicGrid panels={panels} />}
        </div>
    )
}
