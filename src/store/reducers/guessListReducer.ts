import {GuessListType, initialGuessList} from '../../@type/GuessListType';
import {PayloadAction} from '../../@type/PayloadAction';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';

export const guessListReducer = (
  state: GuessListType = initialGuessList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case GUESS_LIST_ACTION.addRecord:
      return {...state, guessList: state.guessList.push(action.payload)};
    case GUESS_LIST_ACTION.deleteAll:
      return {...state, guessList: []};
    default:
      return state;
  }
};
