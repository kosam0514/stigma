import React, { useState } from 'react';
import { Character, GalleryItem } from '../types';

interface GalleryInterfaceProps {
  character: Character;
  onBack: () => void;
}

const GalleryInterface: React.FC<GalleryInterfaceProps> = ({ character, onBack }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const isFaculty = character.group === 'faculty';
  const themeColor = isFaculty ? 'text-amber-600' : 'text-red-600';
  const borderColor = isFaculty ? 'border-amber-900' : 'border-red-900';
  const bgHover = isFaculty ? 'hover:bg-amber-900/20' : 'hover:bg-red-900/20';

  // Keywords that trigger the blur effect
  const sensitiveKeywords = ['섹스', '정상위', '펠라', '파이즈리', '후배위', '뒷치기', '혼욕'];

  return (
    <div className="flex h-screen flex-col bg-black text-neutral-300 font-serif">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none crt-overlay opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-black to-black z-0"></div>

      {/* Header */}
      <header className={`relative z-10 flex items-center justify-between border-b bg-neutral-950/90 p-4 shadow-lg ${borderColor}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-mono-tech text-xs tracking-widest border border-neutral-800 px-4 py-2 hover:border-neutral-500"
          >
            <span>{'<'} BACK</span>
          </button>
          <div className="h-6 w-[1px] bg-neutral-800"></div>
          <div>
            <span className="font-mono-tech text-[10px] text-neutral-500 tracking-[0.2em] block">DATABASE_VIEWER // V.2.0</span>
            <span className={`font-gothic text-lg font-bold ${themeColor} tracking-widest uppercase`}>
              VISUAL RECORDS: {character.name}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono-tech text-[10px] text-neutral-600">
           <span className="animate-pulse">●</span>
           <span>SECURE_LINK</span>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {character.gallery.map((item, index) => {
                    const isSensitive = sensitiveKeywords.some(keyword => item.description.includes(keyword));

                    return (
                        <div 
                            key={index}
                            onClick={() => setSelectedItem(item)}
                            className={`group relative aspect-[3/4] cursor-pointer overflow-hidden border border-neutral-900 bg-neutral-950 ${bgHover} transition-all duration-300 hover:scale-[1.02] hover:border-opacity-100 ${isFaculty ? 'hover:border-amber-600' : 'hover:border-red-600'}`}
                        >
                            <img 
                                src={item.url} 
                                alt={`${character.name} ${index}`} 
                                className={`h-full w-full object-cover transition-all duration-500 ${
                                    isSensitive 
                                        ? 'blur-xl scale-110 opacity-50 group-hover:opacity-80' 
                                        : 'opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0'
                                }`}
                            />
                            
                            {/* Sensitive Content Warning Overlay */}
                            {isSensitive && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <div className="border border-red-600/50 bg-black/80 px-3 py-1 backdrop-blur-sm">
                                        <span className="font-mono-tech text-xs text-red-500 font-bold tracking-widest">
                                            RESTRICTED
                                        </span>
                                    </div>
                                </div>
                            )}
                            
                            {/* Overlay with Description (Bottom Left) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <span className="font-mono-tech text-[10px] text-neutral-400 tracking-widest mb-1 opacity-50 group-hover:opacity-100">
                                    IMG_SEQ_{String(index + 1).padStart(3, '0')}
                                </span>
                                 <p className={`text-white font-serif text-sm font-light leading-snug drop-shadow-md ${isSensitive ? 'text-red-400' : ''}`}>
                                    {item.description}
                                </p>
                            </div>

                            {/* Corner Accents */}
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isFaculty ? 'border-amber-600' : 'border-red-600'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isFaculty ? 'border-amber-600' : 'border-red-600'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-8 text-center font-mono-tech text-xs text-neutral-600 tracking-widest">
                // END OF RECORDS
            </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in p-4 sm:p-8"
            onClick={() => setSelectedItem(null)}
        >
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                <img 
                    src={selectedItem.url} 
                    alt="Full View" 
                    className={`max-w-full max-h-full object-contain border ${borderColor} shadow-[0_0_50px_rgba(0,0,0,0.5)]`}
                />

                {/* Description Overlay (Top Left) */}
                <div className="absolute top-0 left-0 m-4 sm:m-0 sm:top-4 sm:left-4 max-w-xs sm:max-w-md bg-black/80 border border-neutral-800 p-4 backdrop-blur-md pointer-events-none">
                     <span className={`block font-mono-tech text-[10px] ${themeColor} tracking-widest mb-2`}>
                        // ANALYSIS
                     </span>
                     <p className="text-white font-serif text-base sm:text-lg leading-relaxed">
                        {selectedItem.description}
                     </p>
                </div>
                
                {/* Close Hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-neutral-800 px-6 py-2 backdrop-blur-sm cursor-pointer hover:bg-neutral-900 transition-colors">
                    <span className="font-mono-tech text-xs text-neutral-400 tracking-[0.2em]">[ CLICK ANYWHERE TO CLOSE ]</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GalleryInterface;