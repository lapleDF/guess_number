import {GuessRecord} from './GuessRecord';

export interface GuessListType {
  guessList: GuessRecord[];
}

export const initialGuessList: GuessListType = {
  guessList: [],
};
