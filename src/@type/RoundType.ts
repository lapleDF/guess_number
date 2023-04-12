import uuid from 'react-uuid';
import {GuessListType, initialGuessList} from './GuessListType';

export interface RoundType {
  id: string;
  guessList: GuessListType;
  numNumber: number;
  expectedNumber: number[];
  result: boolean;
}

export const initialRound: RoundType = {
  id: uuid(),
  guessList: initialGuessList,
  numNumber: 4,
  expectedNumber: [],
  result: false,
};
