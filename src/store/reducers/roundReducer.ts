import {PayloadAction} from '../../@type/PayloadAction';
import {RoundListType, initialRoundList} from '../../@type/RoundListType';
import {ROUND_ACTION} from '../actions/roundAction.constant';

export const roundListReducer = (
  state: RoundListType = initialRoundList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case ROUND_ACTION.newGame:
      return {
        ...state,
        roundList: [...state.roundList, action.payload],
      };
    case ROUND_ACTION.endGame:
      const roundArr = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 1) {
          const roundItem = item;
          roundItem.result = action.payload;
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArr};
    case ROUND_ACTION.storeGuessList:
      const roundArrTemp = state.roundList.map((item, index) => {
        if (index === state.roundList.length - 2) {
          const roundItem = item;
          roundItem.guessList = action.payload;
          return roundItem;
        }
        return item;
      });
      return {...state, roundList: roundArrTemp};
    case ROUND_ACTION.setLevel:
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
    case ROUND_ACTION.resetExpectedNumber:
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
