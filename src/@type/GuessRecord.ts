import uuid from 'react-uuid';

export interface GuessRecord {
  id: string;
  yourGuess: number[];
  correctNumber: number;
  correctPosition: number;
}
export const initialGuessRecord: GuessRecord = {
  id: uuid(),
  yourGuess: [],
  correctNumber: 0,
  correctPosition: 0,
};
