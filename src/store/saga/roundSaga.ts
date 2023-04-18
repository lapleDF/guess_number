import {put, takeEvery, select} from 'redux-saga/effects';

import {ROUND_ACTION} from '../actions/roundAction.constant';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {RootState} from '../store';
import {PayloadAction} from '../../interface/PayloadAction';
import {getRandomNumbers} from '../../utils/getRandomNumber';
import {RoundType} from '../../interface/RoundType';

function* resetGuessList() {
  const rootState: RootState = yield select((state: RootState) => state);
  yield put({type: GUESS_LIST_ACTION.CLEAR});
  const roundArrTemp = rootState.rounds.roundList.map(
    (item: any, index: number) => {
      if (index === rootState.rounds.roundList.length - 2) {
        item.guessList = rootState.guesses.guessList;
        return item;
      }
      return item;
    },
  );
  yield put({
    type: ROUND_ACTION.STORE_GUESS_LIST,
    payload: roundArrTemp,
  });
}

/**
 * when reset level (param numNumber) mean we need to reset random number array (expectedNumber) and reset guess list to empty
 */
function* resetLevel(action: PayloadAction) {
  const roundList: RoundType[] = yield select(
    (state: RootState) => state.rounds.roundList,
  );
  const roundArrForReSetExpNumber = roundList.map((item, index) => {
    if (index === roundList.length - 1) {
      item.expectedNumber = getRandomNumbers(action.payload);
      item.numNumber = action.payload;
      item.guessList = [];
      return item;
    }
    return item;
  });
  yield put({
    type: ROUND_ACTION.RESET_EXPECTED_NUMBER,
    payload: roundArrForReSetExpNumber,
  });
  yield put({type: GUESS_LIST_ACTION.CLEAR});
}

export default function* roundSaga() {
  yield takeEvery(ROUND_ACTION.NEW_GAME, resetGuessList);
  yield takeEvery(ROUND_ACTION.SET_LEVEL, resetLevel);
}
