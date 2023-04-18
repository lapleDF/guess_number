import {GuessListType} from '../../interface/GuessListType';
import {PayloadAction} from '../../interface/PayloadAction';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';

export const initialGuessList: GuessListType = {
  guessList: [],
};

export const guessListReducer = (
  state: GuessListType = initialGuessList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case GUESS_LIST_ACTION.ADD_NEW_RECORD:
      return {...state, guessList: [...state.guessList, action.payload]};
    case GUESS_LIST_ACTION.CLEAR:
      return {...state, guessList: []};
    default:
      return state;
  }
};
