import {put, takeEvery} from 'redux-saga/effects';
import {ROUND_ACTION} from '../actions/roundAction.constant';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';

function* resetGuessList() {
  yield put({type: GUESS_LIST_ACTION.clear});
}

export default function* roundSaga() {
  yield takeEvery(ROUND_ACTION.newGame, resetGuessList);
}
