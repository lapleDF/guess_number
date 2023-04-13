import {put, takeEvery} from 'redux-saga/effects';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {PayloadAction} from '../../@type/PayloadAction';
import {ROUND_ACTION} from '../actions/roundAction.constant';

function* addNewRecord(action: PayloadAction) {
  if (
    action.payload.correctNumber === 4 &&
    action.payload.correctPosition === 4
  ) {
    yield put({type: ROUND_ACTION.endGame, payload: true});
  }
}

export default function* guessSaga() {
  yield takeEvery(GUESS_LIST_ACTION.addRecord, addNewRecord);
}
