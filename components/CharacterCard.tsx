import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 hover:border-red-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-900/20"
      onClick={() => onSelect(character)}
    >
      <div className="aspect-square w-full overflow-hidden bg-slate-900">
        <img 
          src={character.avatarUrl} 
          alt={character.name} 
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 w-full p-4">
        <div className="mb-1 text-xs font-bold text-red-500 uppercase tracking-widest">
          {character.role}
        </div>
        <h3 className="font-gothic text-xl font-bold text-slate-100 group-hover:text-red-400 transition-colors">
          {character.name}
        </h3>
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">
          {character.description}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;