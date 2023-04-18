import {put, takeEvery, select} from 'redux-saga/effects';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {PayloadAction} from '../../interface/PayloadAction';
import {ROUND_ACTION} from '../actions/roundAction.constant';
import {RootState} from '../store';
import {RoundListType} from '../../interface/RoundListType';

function* addNewRecord(action: PayloadAction) {
  const rounds: RoundListType = yield select(
    (state: RootState) => state.rounds,
  );
  if (
    action.payload.correctNumber ===
      rounds.roundList[rounds.roundList.length - 1].numNumber &&
    action.payload.correctPosition ===
      rounds.roundList[rounds.roundList.length - 1].numNumber
  ) {
    yield put({type: ROUND_ACTION.END_GAME, payload: true});
  }
}

export default function* guessSaga() {
  yield takeEvery(GUESS_LIST_ACTION.ADD_NEW_RECORD, addNewRecord);
}
