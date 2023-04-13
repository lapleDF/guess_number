import uuid from 'react-uuid';
import {GuessListType, initialGuessList} from './GuessListType';
import {getRandomNumbers} from '../shared/getRandomNumber';

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
  expectedNumber: getRandomNumbers(4),
  result: false,
};
