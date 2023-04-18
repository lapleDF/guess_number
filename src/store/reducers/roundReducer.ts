import {PayloadAction} from '../../interface/PayloadAction';
import {RoundListType, initialRoundList} from '../../interface/RoundListType';
import {ROUND_ACTION} from '../actions/roundAction.constant';

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
      const roundArr = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 1) {
          const roundItem = item;
          roundItem.result = action.payload;
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArr};
    case ROUND_ACTION.STORE_GUESS_LIST:
      const roundArrTemp = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 2) {
          const roundItem = item;
          roundItem.guessList = action.payload;
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArrTemp};
    case ROUND_ACTION.SET_LEVEL:
      const roundArrForSetLevel = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 1) {
          const roundItem = item;
          roundItem.numNumber = action.payload;
          roundItem.guessList = [];
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArrForSetLevel};
    case ROUND_ACTION.RESET_EXPECTED_NUMBER:
      const roundArrForReSetExpNumber = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 1) {
          const roundItem = item;
          roundItem.expectedNumber = action.payload;
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArrForReSetExpNumber};
    default:
      return state;
  }
};
