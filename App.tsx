import React, { useState } from 'react';
import { Character, ViewState } from './types';
import ArchiveModal from './components/ArchiveModal';
import CharacterDossier from './components/CharacterDossier';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.CHARACTER_SELECTION);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setViewState(ViewState.DOSSIER_VIEW);
    setIsModalOpen(false);
  };

  const handleBackToArchive = () => {
    // When back is pressed in Dossier, go back to Selection View but keep modal open effectively
    // To achieve "Return to Archive", we reset char and open modal
    setSelectedCharacter(null);
    setViewState(ViewState.CHARACTER_SELECTION);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 selection:bg-red-900 selection:text-white font-serif overflow-x-hidden">
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none crt-overlay opacity-30"></div>

      {viewState === ViewState.CHARACTER_SELECTION ? (
        <main className="relative w-full h-screen flex flex-col">
          
          {/* Main Hero Section */}
          <section className="relative flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
            
            <div className="z-20 w-full max-w-7xl space-y-16 animate-fade-in flex flex-col items-center">
              
              {/* Titles */}
              <div className="space-y-6 select-none">
                <h2 className="font-gothic text-3xl md:text-4xl text-red-800 tracking-[0.8em] uppercase font-black drop-shadow-[0_0_15px_rgba(153,27,27,0.6)]">
                  AETERNUS ABYSSUS
                </h2>
                <h1 className="font-black text-6xl md:text-9xl text-white tracking-tighter drop-shadow-2xl leading-[0.9]">
                  STIGMA<br/>
                  <span className="text-red-900">ACADEMY</span>
                </h1>
              </div>

              {/* Description & Warnings */}
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="border border-red-900/30 bg-black/50 backdrop-blur-sm p-8 relative overflow-hidden group select-none">
                   <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                   <div className="absolute top-0 right-0 w-1 h-full bg-red-600"></div>
                   
                   <p className="text-2xl md:text-3xl font-bold text-neutral-200 leading-normal font-serif">
                     "이곳은 신이 버린 땅, <span className="text-red-600">아나테마</span>의 심연."
                   </p>
                   <p className="mt-4 text-xl text-neutral-400 font-light">
                     지하 미궁에서 썩어가는 낙인들의 비명소리가 들리는가?
                   </p>
                </div>

                <div className="flex flex-col items-center gap-2 select-none">
                    <p className="font-mono-tech text-sm text-red-600 animate-pulse tracking-widest">
                        // WARNING: BIO-HAZARD DETECTED
                    </p>
                    <p className="font-mono-tech text-sm text-red-800 tracking-widest">
                        // UNAUTHORIZED ACCESS WILL BE TERMINATED
                    </p>
                </div>
              </div>

              {/* Action Button - High Z-index to prevent footer overlap issues */}
              <div className="pt-4 pb-20 z-30 relative">
                 <button 
                   onClick={() => setIsModalOpen(true)}
                   className="group relative inline-block px-16 py-6 bg-transparent border-2 border-neutral-800 text-neutral-300 font-mono-tech text-xl tracking-[0.2em] uppercase hover:border-red-600 hover:text-red-500 hover:bg-red-950/10 transition-all duration-500 cursor-pointer"
                 >
                   <span className="relative z-10 pointer-events-none">[ ACCESS DATABASE ]</span>
                   {/* Glitch effect lines */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                   <div className="absolute bottom-0 right-0 w-full h-[1px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-75"></div>
                   {/* Extended Hit Area */}
                   <div className="absolute inset-[-20px] z-0 bg-transparent"></div>
                 </button>
              </div>
            </div>
          </section>

          {/* Footer Info */}
          <footer className="absolute bottom-0 w-full py-6 bg-transparent text-center text-[10px] font-mono-tech text-neutral-700 z-0 border-t border-red-900/10 select-none">
            <p>STIGMA ACADEMY_SYSTEM_V.9.0.2 // CONNECTION_SECURE</p>
            <p className="mt-1 opacity-50">ALL RECORDS ARE PROPERTY OF BASILICA KINGDOM</p>
          </footer>

          {/* Unique Modal Component */}
          <ArchiveModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSelectCharacter={handleCharacterSelect} 
          />

        </main>
      ) : (
        selectedCharacter && (
          <CharacterDossier 
            character={selectedCharacter} 
            onBack={handleBackToArchive} 
          />
        )
      )}
    </div>
  );
};

export default App;