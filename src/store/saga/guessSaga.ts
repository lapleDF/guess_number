import {put, takeEvery, select} from 'redux-saga/effects';
import uuid from 'react-uuid';

import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {ROUND_ACTION} from '../actions/roundAction.constant';
import {PayloadAction} from '../../interface/PayloadAction';
import {RoundType} from '../../interface/RoundType';
import {RootState} from '../store';
import {GuessRecord} from '../../interface/GuessRecord';

function* receiveNumber(action: PayloadAction) {
  const initialGuessRecord: GuessRecord = {
    id: uuid(),
    yourGuess: [],
    correctNumber: 0,
    correctPosition: 0,
  };

  const rounds: RoundType[] = yield select(
    (state: RootState) => state.rounds.roundList,
  );

  const expectedNumber: number[] = rounds[rounds.length - 1].expectedNumber;

  action.payload.forEach((element: number, index: number) => {
    if (expectedNumber.includes(element)) {
      initialGuessRecord.correctNumber += 1;
      if (expectedNumber?.indexOf(element, index) === index) {
        initialGuessRecord.correctPosition += 1;
      }
    }
  });

  initialGuessRecord.yourGuess = action.payload;

  yield put({
    type: GUESS_LIST_ACTION.ADD_NEW_RECORD,
    payload: initialGuessRecord,
  });

  if (
    initialGuessRecord.correctNumber === rounds[rounds.length - 1].numNumber &&
    initialGuessRecord.correctPosition === rounds[rounds.length - 1].numNumber
  ) {
    const replacedRound = rounds.map((item, index) => {
      if (index === rounds.length - 1) {
        item.result = true;
        return item;
      }
      return item;
    });
    yield put({type: ROUND_ACTION.END_GAME, payload: replacedRound});
  }
}

export default function* guessSaga() {
  yield takeEvery(GUESS_LIST_ACTION.RECEIVE_NUMBER, receiveNumber);
}
