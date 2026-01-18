import React, { useState } from 'react';
import { Character } from '../types';
import GalleryInterface from './GalleryInterface';

interface CharacterDossierProps {
  character: Character;
  onBack: () => void;
}

const CharacterDossier: React.FC<CharacterDossierProps> = ({ character, onBack }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const isFaculty = character.group === 'faculty';
  const isCreature = character.group === 'creature';
  const isBoss = character.group === 'boss';
  
  // Theme Logic
  let themeColor = 'text-red-600';
  let borderColor = 'border-red-900';
  let bgColor = 'bg-red-950/10';
  let hoverColor = 'hover:text-red-500 hover:border-red-900';
  let barColor = 'bg-red-800';

  if (isFaculty) {
    themeColor = 'text-amber-600';
    borderColor = 'border-amber-900';
    bgColor = 'bg-amber-950/10';
    hoverColor = 'hover:text-amber-500 hover:border-amber-900';
    barColor = 'bg-amber-800';
  } else if (isCreature) {
    themeColor = 'text-purple-600';
    borderColor = 'border-purple-900';
    bgColor = 'bg-purple-950/10';
    hoverColor = 'hover:text-purple-500 hover:border-purple-900';
    barColor = 'bg-purple-800';
  } else if (isBoss) {
    themeColor = 'text-rose-600';
    borderColor = 'border-rose-900';
    bgColor = 'bg-rose-950/20';
    hoverColor = 'hover:text-rose-500 hover:border-rose-800';
    barColor = 'bg-rose-700';
  }

  if (showGallery) {
    return <GalleryInterface character={character} onBack={() => setShowGallery(false)} />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-transparent text-neutral-300 font-serif overflow-hidden relative">
      {/* Subtle Red Gradient Overlay for this specific view */}
      <div className={`absolute inset-0 bg-gradient-to-b ${isBoss ? 'from-rose-950/30' : 'from-red-950/10'} via-black/50 to-black z-0 pointer-events-none`}></div>
      <div className="fixed inset-0 z-0 pointer-events-none crt-overlay opacity-20"></div>

      {/* Image Zoom Modal (Profile Pic) */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
        >
            <div className="relative max-w-full max-h-full">
                <img 
                    src={character.avatarUrl} 
                    alt={character.name} 
                    className={`max-w-full max-h-[90vh] object-contain border-2 ${borderColor} shadow-[0_0_100px_rgba(220,38,38,0.3)]`}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-500 font-mono-tech text-xs tracking-widest bg-black/80 px-4 py-1 border border-neutral-800">
                    [ CLICK TO CLOSE ]
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 flex items-center justify-between border-b bg-neutral-950/80 p-4 ${borderColor} backdrop-blur-sm`}>
        <button 
            onClick={onBack}
            className={`group flex items-center gap-3 transition-all duration-300 border ${borderColor} bg-black/50 px-4 py-2 hover:bg-neutral-900`}
        >
            <span className="font-mono-tech text-xl group-hover:-translate-x-1 transition-transform">{'<'}</span>
            <div className="flex flex-col items-start">
                <span className="font-mono-tech text-xs tracking-[0.2em] font-bold text-neutral-400 group-hover:text-white">
                    RETURN TO ARCHIVE
                </span>
                <span className="text-[10px] text-neutral-600 tracking-widest opacity-70 group-hover:opacity-100">
                    DISCONNECT_LINK
                </span>
            </div>
        </button>
        <div className="flex items-center gap-3">
             <div className={`h-2 w-2 rounded-full ${isCreature ? 'bg-purple-600' : isBoss ? 'bg-rose-600 shadow-[0_0_10px_red]' : 'bg-red-600'} animate-pulse`}></div>
             <span className={`font-mono-tech text-xs ${isCreature ? 'text-purple-600' : isBoss ? 'text-rose-600 font-bold' : 'text-red-600'} tracking-widest hidden sm:inline`}>SECURE_CONNECTION_ESTABLISHED</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 lg:p-12 custom-scrollbar">
        <div className="mx-auto w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:h-full">
            
            {/* Left Column: Image - Adjusted for Mobile Visibility */}
            <div className="w-full lg:w-[45%] lg:h-full flex items-center justify-center shrink-0">
                <div 
                    className={`relative w-full h-[50vh] lg:h-full max-h-[80vh] overflow-hidden border-2 ${borderColor} shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in group`}
                    onClick={() => setIsZoomed(true)}
                >
                    <img 
                        src={character.avatarUrl} 
                        alt={character.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Role Tag overlay on image */}
                    <div className={`absolute bottom-6 left-6 border-l-4 ${isCreature ? 'border-purple-600' : isBoss ? 'border-rose-600' : 'border-red-600'} pl-4 bg-black/60 backdrop-blur-md py-2 pr-4 pointer-events-none`}>
                        <span className={`block font-mono-tech text-xs tracking-widest uppercase text-neutral-400 mb-1`}>
                            CLASSIFICATION
                        </span>
                        <span className={`font-gothic text-xl tracking-wider uppercase ${themeColor} font-black`}>
                            {character.role}
                        </span>
                    </div>
                    
                    {/* Zoom Hint */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Right Column: Data & Quote */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center space-y-10 animate-fade-in-up py-4 lg:py-0">
                
                {/* Header Section */}
                <div>
                    <div className="flex items-center gap-4 font-mono-tech text-sm text-neutral-500 mb-2">
                        <span className="text-neutral-600">ID: {character.id.toUpperCase()}_8X2</span>
                        <span>//</span>
                        <span className={themeColor}>CLASS: {character.group.toUpperCase()}</span>
                    </div>
                    <h1 className={`text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-[0_0_15px_rgba(255,0,0,0.15)] ${isBoss ? 'text-red-600 text-shadow-glow' : ''}`}>
                        {character.name}
                    </h1>
                </div>

                {/* Vital Stats Grid */}
                <div className="grid grid-cols-3 gap-0 border border-neutral-800 bg-black/40">
                    <div className="p-4 border-r border-neutral-800 text-center">
                        <span className="block font-mono-tech text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Age</span>
                        <span className="font-bold text-xl text-neutral-200">{character.age}</span>
                    </div>
                    <div className="p-4 border-r border-neutral-800 text-center">
                        <span className="block font-mono-tech text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Gender</span>
                        <span className="font-bold text-xl text-neutral-200">{character.gender}</span>
                    </div>
                    <div className={`p-4 text-center ${bgColor}`}>
                        <span className="block font-mono-tech text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Risk Level</span>
                        <span className={`font-bold text-sm sm:text-xl ${themeColor}`}>
                             {isFaculty ? 'AUTHORITY' : isCreature ? 'OMEGA' : isBoss ? 'ABSOLUTE' : 'EXTREME'}
                        </span>
                    </div>
                </div>

                {/* Quote Section */}
                <div className="py-6 border-y border-neutral-800 relative">
                     <span className="absolute top-4 left-0 text-4xl text-neutral-800 font-serif opacity-50">"</span>
                     <p className={`text-2xl md:text-3xl font-bold italic leading-tight text-center px-8 ${isFaculty ? 'text-neutral-300' : isBoss ? 'text-rose-200' : 'text-neutral-200'}`}>
                        {character.quote}
                    </p>
                    <span className="absolute bottom-4 right-0 text-4xl text-neutral-800 font-serif opacity-50">"</span>
                </div>

                {/* Intelligence Report */}
                <div>
                    <h3 className={`font-mono-tech ${isCreature ? 'text-purple-800' : isBoss ? 'text-rose-700' : 'text-red-800'} mb-4 text-xs tracking-[0.3em] uppercase flex items-center gap-2`}>
                        <span className={`w-2 h-2 ${isCreature ? 'bg-purple-900' : isBoss ? 'bg-rose-900' : 'bg-red-900'}`}></span>
                        Intelligence Report
                    </h3>
                    <p className={`text-lg md:text-xl leading-relaxed text-neutral-400 font-light text-justify border-l-2 pl-6 ${isCreature ? 'border-purple-900/30' : isBoss ? 'border-rose-900/50' : 'border-red-900/30'}`}>
                        {character.description}
                    </p>
                </div>

                {/* Action Buttons - Initiate Neural Link now opens Gallery - HIDDEN FOR CREATURES */}
                {!isCreature && (
                <div className="pt-4 pb-8 lg:pb-0">
                    <button 
                        onClick={() => setShowGallery(true)}
                        className={`w-full py-5 border border-neutral-800 font-mono-tech text-xl tracking-[0.2em] uppercase transition-all duration-300 hover:bg-neutral-900/80 ${hoverColor} relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                    >
                        <span className="relative z-10">[ INITIATE NEURAL LINK ]</span>
                        <div className={`absolute top-0 left-0 w-1 h-full ${barColor} transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300`}></div>
                    </button>
                    <div className="flex justify-between mt-2 font-mono-tech text-[10px] text-neutral-700">
                        <span>DATABASE_ACCESS: GRANTED</span>
                        <span>IMAGES: {character.gallery.length} FOUND</span>
                    </div>
                </div>
                )}
                
                {/* Fallback for Creatures */}
                {isCreature && (
                    <div className="pt-4 pb-8 lg:pb-0 border-t border-purple-900/30 mt-4">
                        <div className="font-mono-tech text-xs text-purple-800 tracking-widest text-center py-4 animate-pulse">
                            // NO NEURAL LINK AVAILABLE //
                            <br/>
                            Subject lacks cognitive functions for interface.
                        </div>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDossier;