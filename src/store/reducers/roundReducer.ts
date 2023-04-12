import {PayloadAction} from '../../@type/PayloadAction';
import {RoundType, initialRound} from '../../@type/RoundType';
import {ROUND_ACTION} from '../actions/roundAction.constant';

export const roundReducer = (
  state: RoundType = initialRound,
  action: PayloadAction,
) => {
  switch (action.type) {
    case ROUND_ACTION.newGame:
      return {...state, expectedNumber: action.payload};
    case ROUND_ACTION.endGame:
      return {...state, result: action.payload};
    default:
      return state;
  }
};
