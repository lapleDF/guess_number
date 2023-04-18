import {GuessRecord} from './GuessRecord';

export interface RoundType {
  id: string;
  guessList: GuessRecord[];
  numNumber: number;
  expectedNumber: number[];
  result: boolean;
}
