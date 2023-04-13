import {GuessListType, initialGuessList} from '../../@type/GuessListType';
import {PayloadAction} from '../../@type/PayloadAction';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';

export const guessListReducer = (
  state: GuessListType = initialGuessList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case GUESS_LIST_ACTION.addRecord:
      let arrTemp = state.guessList;
      arrTemp.push(action.payload);
      return {...state, guessList: arrTemp};
    case GUESS_LIST_ACTION.deleteAll:
      return {...state, guessList: []};
    default:
      return state;
  }
};
