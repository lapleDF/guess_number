import {RoundType, initialRound} from './RoundType';

export interface RoundListType {
  roundList: RoundType[];
}

export const initialRoundList: RoundListType = {
  roundList: [initialRound],
};
