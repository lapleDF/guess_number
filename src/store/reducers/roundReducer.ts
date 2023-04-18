import {PayloadAction} from '../../interface/PayloadAction';
import {RoundListType} from '../../interface/RoundListType';
import {ROUND_ACTION} from '../actions/roundAction.constant';

export const initialRoundList: RoundListType = {
  roundList: [],
};

export const roundListReducer = (
  state: RoundListType = initialRoundList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case ROUND_ACTION.NEW_GAME:
      return {
        ...state,
        roundList: [...state.roundList, action.payload],
      };
    case ROUND_ACTION.END_GAME:
      return {...state, roundList: action.payload};

    case ROUND_ACTION.STORE_GUESS_LIST:
      return {...state, roundList: action.payload};

    case ROUND_ACTION.RESET_EXPECTED_NUMBER:
      return {...state, roundList: action.payload};

    default:
      return state;
  }
};
