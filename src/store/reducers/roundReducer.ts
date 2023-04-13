import {PayloadAction} from '../../@type/PayloadAction';
import {RoundListType, initialRoundList} from '../../@type/RoundListType';
import {RoundType} from '../../@type/RoundType';
import {ROUND_ACTION} from '../actions/roundAction.constant';

export const roundListReducer = (
  state: RoundListType = initialRoundList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case ROUND_ACTION.newGame:
      let arrTemp = state.roundList;
      arrTemp.push(action.payload);
      return {...state, roundList: arrTemp};
    case ROUND_ACTION.endGame:
      let roundTemp: RoundType[] = state.roundList;
      roundTemp[roundTemp.length - 1].result = action.payload;
      return {...state, roundList: roundTemp};
    default:
      return state;
  }
};
