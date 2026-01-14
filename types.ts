export interface Character {
  id: string;
  name: string;
  age: string;
  gender: string;
  role: string; // Role or Alias (이명)
  group: 'faculty' | 'student'; // Grouping for UI separation
  appearance: string;
  personality: string;
  dialogueStyle: string;
  description: string;
  avatarUrl: string;
  quote: string; // Representative dialogue
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WorldInfo {
  name: string;
  description: string;
  location: string;
  year: string;
}

export enum ViewState {
  CHARACTER_SELECTION,
  DOSSIER_VIEW,
  CHAT_SESSION
}