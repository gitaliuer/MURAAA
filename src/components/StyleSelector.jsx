import React from 'react';

const styles = [
  { id: 'comic', label: '🦸 Комикс', prompt: 'classic American comic book style, high contrast, bold lines, Marvel DC aesthetic' },
  { id: 'anime', label: '⛩️ Аниме', prompt: 'anime style, Studio Ghibli, Makoto Shinkai, highly detailed, vibrant colors, cel-shaded' },
  { id: 'noir', label: '🕶️ Нуар', prompt: 'film noir, black and white, dramatic lighting, high contrast shadows, gritty vintage style' },
  { id: 'cyberpunk', label: '✨ Киберпанк', prompt: 'cyberpunk, neon lights, high tech low life, futuristic dystopian city, dark and moody' },
];

export default function StyleSelector({ selectedStyle, onSelectStyle }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 px-4 z-10 relative flex justify-center gap-3 flex-wrap">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelectStyle(style)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            ${selectedStyle?.id === style.id 
              ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.5)] border border-neon-purple scale-105' 
              : 'bg-dark-800/80 text-white/70 border border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md hover:bg-white/5'}
          `}
        >
          {style.label}
        </button>
      ))}
    </div>
  );
}
