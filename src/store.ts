import create from 'zustand/vanilla';
import { Scenes } from './scenes/scenes';
import { CompanionMessage, CompanionState } from './ui/companion';
import project from '../metadata/project.json';
import { InfoMessageType } from './ui/info';
import { RevealableInterface, RevealableTypes } from './sketchObjects/Revealable';
import { getRevealablesforSubproject } from './helpers';

export interface State {
  currentIntroStep: number;
  currentScene: Scenes;
  currentSubproject?: string;
  companionState: CompanionState;
  infoMessageShown: boolean;
  infoMessages: InfoMessageType[];
  addInfoMessage: (newMessage: InfoMessageType) => void;
  userMessages: CompanionMessage[];
  addUserMessage: (newMessage: CompanionMessage) => void;
  revealables: RevealableInterface[];
  finishedSubProjects: string[];
  setProjectMetadata: (projectName: string) => void;
  participantAnonymous: boolean;
  finishedGame: boolean;
  revealablesFinished: number;
  showScore: boolean;
  showOvScore: boolean;
  uid: string;
}

const store = create<State>((set) => ({
  uid: null,
  showScore: false,
  showOvScore: true,
  currentIntroStep: 1,
  revealablesFinished: 0,
  currentScene: Scenes.OVERVIEW,
  currentSubproject: null,
  participantAnonymous: false,
  companionState: CompanionState.IDLE,
  infoMessageShown: false,
  infoMessages: [],
  finishedGame: false,
  addInfoMessage: (newMessage) =>
    set((state) => ({ ...state, infoMessages: [...state.infoMessages, newMessage] })),
  userMessages: [],
  addUserMessage: (newMessage) =>
    set((state) => ({
      userMessages: [...state.userMessages, newMessage],
    })),
  revealables: [],
  finishedSubProjects: [],
  setProjectMetadata: (projectName) =>
    set((state) => ({
      ...state,
      revealables: getRevealablesforSubproject(projectName, project.subprojects),
    })),
}));
export default store;
