import uuid from 'react-uuid';
import {getRandomNumbers} from '../shared/getRandomNumber';
import {GuessRecord} from './GuessRecord';

export interface RoundType {
  id: string;
  guessList: GuessRecord[];
  numNumber: number;
  expectedNumber: number[];
  result: boolean;
}

export const initialRound: RoundType = {
  id: uuid(),
  guessList: [],
  numNumber: 4,
  expectedNumber: getRandomNumbers(4), //todo: start new game with level
  result: false,
};
