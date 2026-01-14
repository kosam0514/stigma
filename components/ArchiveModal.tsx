import React from 'react';
import { Character } from '../types';
import { CHARACTERS as ALL_CHARS } from '../constants';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (character: Character) => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose, onSelectCharacter }) => {
  if (!isOpen) return null;

  const faculty = ALL_CHARS.filter(c => c.group === 'faculty');
  const students = ALL_CHARS.filter(c => c.group === 'student');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with red vignette */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        style={{
          boxShadow: 'inset 0 0 150px rgba(100, 0, 0, 0.5)'
        }}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-6xl h-[85vh] flex flex-col border-2 border-red-900 bg-black text-red-500 shadow-[0_0_50px_rgba(220,38,38,0.2)] animate-fade-in-up overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-red-900 bg-red-950/20 p-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-red-600 animate-pulse" />
            <h2 className="font-mono-tech text-2xl tracking-widest text-red-500 font-bold">
              CLASSIFIED ARCHIVES // RESTRICTED ACCESS
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="font-mono-tech border border-red-900 px-4 py-1 text-sm hover:bg-red-600 hover:text-black transition-colors"
          >
            [CLOSE TERMINAL]
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 custom-scrollbar">
          
          {/* Faculty Section */}
          <div>
            <div className="mb-6 flex items-center gap-4 border-b border-red-900/50 pb-2">
              <span className="font-gothic text-3xl text-red-500 font-bold">FACULTY</span>
              <span className="font-mono-tech text-xs text-red-800">AUTH_LEVEL_5</span>
            </div>
            <div className="space-y-4">
              {faculty.map(char => (
                <div 
                  key={char.id}
                  onClick={() => onSelectCharacter(char)}
                  className="group relative cursor-pointer border border-neutral-900 bg-neutral-950 p-4 transition-all hover:border-red-600 hover:bg-red-950/10 flex gap-4 items-center"
                >
                  <div className="h-16 w-16 overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-neutral-800 group-hover:border-red-500">
                    <img src={char.avatarUrl} alt={char.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-mono-tech text-xs text-red-700 mb-1">ID: {char.id.toUpperCase()}</div>
                    <div className="font-gothic text-xl text-neutral-300 group-hover:text-red-500">{char.name}</div>
                    <div className="text-sm text-neutral-600 group-hover:text-red-400/70">{char.role}</div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 font-mono-tech text-xs text-red-500 tracking-widest">
                    [ACCESS]
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Section */}
          <div>
            <div className="mb-6 flex items-center gap-4 border-b border-red-900/50 pb-2">
              <span className="font-gothic text-3xl text-red-500 font-bold">SUBJECTS</span>
              <span className="font-mono-tech text-xs text-red-800">RISK_LEVEL_EXTREME</span>
            </div>
            <div className="space-y-4">
              {students.map(char => (
                <div 
                  key={char.id}
                  onClick={() => onSelectCharacter(char)}
                  className="group relative cursor-pointer border border-neutral-900 bg-neutral-950 p-4 transition-all hover:border-red-600 hover:bg-red-950/10 flex gap-4 items-center"
                >
                  <div className="h-16 w-16 overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-neutral-800 group-hover:border-red-500">
                    <img src={char.avatarUrl} alt={char.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-mono-tech text-xs text-red-700 mb-1">ID: {char.id.toUpperCase()}</div>
                    <div className="font-gothic text-xl text-neutral-300 group-hover:text-red-500">{char.name}</div>
                    <div className="text-sm text-neutral-600 group-hover:text-red-400/70">{char.role}</div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 font-mono-tech text-xs text-red-500 tracking-widest">
                    [ACCESS]
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Status */}
        <div className="border-t border-red-900 bg-black p-2 font-mono-tech text-xs text-red-800 flex justify-between">
          <span>STATUS: ONLINE</span>
          <span>ENCRYPTION: MAX</span>
          <span>LOCATION: DEEP_LAYER_4</span>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;