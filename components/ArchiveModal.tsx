import React, { useRef, useLayoutEffect } from 'react';
import { Character } from '../types';
import { CHARACTERS as ALL_CHARS } from '../constants';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (character: Character) => void;
  savedScrollTop: number;
  onRecordScroll: (scrollTop: number) => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectCharacter, 
  savedScrollTop, 
  onRecordScroll 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Restore scroll position immediately after render but before paint
  useLayoutEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = savedScrollTop;
    }
  }, [isOpen, savedScrollTop]);

  if (!isOpen) return null;

  const faculty = ALL_CHARS.filter(c => c.group === 'faculty');
  const students = ALL_CHARS.filter(c => c.group === 'student');
  const creatures = ALL_CHARS.filter(c => c.group === 'creature');
  const bosses = ALL_CHARS.filter(c => c.group === 'boss');

  const handleSelect = (char: Character) => {
    if (scrollContainerRef.current) {
      onRecordScroll(scrollContainerRef.current.scrollTop);
    }
    onSelectCharacter(char);
  };

  const CharacterCard: React.FC<{ char: Character; colorClass: string }> = ({ char, colorClass }) => (
    <div 
      onClick={() => handleSelect(char)}
      className={`group relative aspect-[3/4] w-full overflow-hidden border border-neutral-900 bg-black cursor-pointer transition-all duration-500 hover:border-${colorClass}-600 hover:shadow-[0_0_30px_rgba(${colorClass === 'purple' ? '147,51,234' : '220,38,38'},0.4)] hover:z-10`}
    >
      {/* Background Image */}
      <img 
        src={char.avatarUrl} 
        alt={char.name} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Content Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className={`font-mono-tech text-[10px] text-${colorClass}-500 tracking-[0.2em] mb-1 bg-black/50 px-2 py-0.5 border border-${colorClass}-900/30 backdrop-blur-sm`}>
          ID: {char.id.toUpperCase()}
        </div>
        <h3 className={`font-gothic text-3xl font-bold text-white leading-none mb-1 group-hover:text-${colorClass}-500 transition-colors drop-shadow-lg`}>
          {char.name}
        </h3>
        <p className={`font-serif text-sm text-neutral-400 italic border-l-2 border-${colorClass}-800 pl-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity`}>
          {char.role}
        </p>
      </div>

      {/* Hover Access Indicator */}
      <div className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono-tech text-[10px] text-${colorClass}-500 border border-${colorClass}-500 px-2 py-1 tracking-widest bg-black/80`}>
        [ ACCESS GRANTED ]
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop with red vignette */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        style={{
          boxShadow: 'inset 0 0 200px rgba(100, 0, 0, 0.4)'
        }}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-7xl h-full sm:h-[90vh] flex flex-col border-x sm:border border-red-900/50 bg-black/95 text-red-500 shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in-up overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-red-900/50 bg-red-950/20 p-4 sm:p-6 shrink-0 backdrop-blur-sm z-20">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
                <h2 className="font-mono-tech text-lg sm:text-2xl tracking-[0.2em] text-red-500 font-bold">
                CLASSIFIED ARCHIVES
                </h2>
             </div>
             <p className="font-mono-tech text-[10px] text-red-800/80 pl-5">
                ACCESS_LEVEL: RESTRICTED // EYES ONLY
             </p>
          </div>
          <button 
            onClick={onClose}
            className="group font-mono-tech border border-red-900/50 px-6 py-2 text-sm hover:bg-red-600 hover:text-black transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:font-bold">[ CLOSE ]</span>
            <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
          </button>
        </div>

        {/* Modal Content - Vertical Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black"
        >
          <div className="p-4 sm:p-8 space-y-12 max-w-6xl mx-auto">
            
            {/* FACULTY Section */}
            <section className="animate-fade-in">
              <div className="mb-6 flex items-end gap-4 border-b border-red-900/50 pb-4 sticky top-0 z-10 bg-black/80 backdrop-blur-sm pt-4">
                <span className="font-gothic text-4xl sm:text-5xl text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tighter">
                    FACULTY
                </span>
                <span className="font-mono-tech text-xs text-amber-500 bg-amber-950/30 px-3 py-1 border border-amber-900/30 tracking-widest mb-2">
                    AUTHORITY_LEVEL_5
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {faculty.map(char => (
                  <CharacterCard key={char.id} char={char} colorClass="red" />
                ))}
              </div>
            </section>

            {/* Student Section */}
            <section className="animate-fade-in delay-100">
              <div className="mb-6 flex items-end gap-4 border-b border-red-900/50 pb-4 sticky top-0 z-10 bg-black/80 backdrop-blur-sm pt-4">
                <span className="font-gothic text-4xl sm:text-5xl text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tighter">
                    SUBJECTS
                </span>
                <span className="font-mono-tech text-xs text-red-500 bg-red-950/30 px-3 py-1 border border-red-900/30 tracking-widest mb-2">
                    RISK_EXTREME
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {students.map(char => (
                  <CharacterCard key={char.id} char={char} colorClass="red" />
                ))}
              </div>
            </section>

            {/* Creature Section */}
            <section className="animate-fade-in delay-200">
              <div className="mb-6 flex items-end gap-4 border-b border-purple-900/50 pb-4 sticky top-0 z-10 bg-black/80 backdrop-blur-sm pt-4">
                <span className="font-gothic text-4xl sm:text-5xl text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tighter">
                    CREATURES
                </span>
                <span className="font-mono-tech text-xs text-purple-500 bg-purple-950/30 px-3 py-1 border border-purple-900/30 tracking-widest mb-2">
                    RISK_OMEGA // NON-HUMAN
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {creatures.map(char => (
                  <CharacterCard key={char.id} char={char} colorClass="purple" />
                ))}
              </div>
            </section>

            {/* FINAL BOSS Section */}
             {bosses.length > 0 && (
              <section className="animate-fade-in delay-300 pb-12 mt-16">
                 <div className="mb-8 flex items-end justify-center gap-4 border-b-2 border-red-600 pb-6 sticky top-0 z-10 bg-black/80 backdrop-blur-sm pt-4">
                    <span className="font-gothic text-5xl sm:text-7xl text-red-600 font-black drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] tracking-widest animate-pulse">
                        APOCALYPSE
                    </span>
                 </div>
                 <div className="w-full max-w-4xl mx-auto">
                    {bosses.map(char => (
                        <div 
                           key={char.id}
                           onClick={() => handleSelect(char)}
                           className="group relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden border-2 border-red-900 bg-black cursor-pointer transition-all duration-700 hover:border-red-500 hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]"
                        >
                            <img 
                                src={char.avatarUrl} 
                                alt={char.name} 
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                                style={{ objectPosition: 'top' }}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent opacity-90"></div>
                             
                             <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center justify-end text-center">
                                 <span className="font-mono-tech text-xs text-red-500 tracking-[0.5em] mb-2 bg-black/80 px-4 py-1 border border-red-800">
                                     THREAT LEVEL: ABSOLUTE
                                 </span>
                                 <h3 className="font-gothic text-4xl sm:text-6xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)] tracking-tighter group-hover:text-red-500 transition-colors">
                                     {char.name}
                                 </h3>
                                 <p className="font-serif text-lg text-neutral-300 italic mt-2 opacity-80 group-hover:opacity-100 max-w-2xl drop-shadow-md">
                                     "{char.role}"
                                 </p>
                             </div>
                        </div>
                    ))}
                 </div>
              </section>
             )}
            
          </div>
        </div>

        {/* Footer Status */}
        <div className="border-t border-red-900/50 bg-black z-20 p-3 font-mono-tech text-[10px] sm:text-xs text-red-800 flex justify-between shrink-0 uppercase tracking-wider">
          <span className="animate-pulse">System: Stable</span>
          <span className="hidden sm:inline">Encryption: AES-4096-GCM</span>
          <span>Node: Deep_Layer_4</span>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;