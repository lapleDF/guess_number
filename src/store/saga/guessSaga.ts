import {takeEvery} from 'redux-saga/effects';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';

function* addNewRecord() {
  console.log('object');
}

export default function* guessSaga() {
  yield takeEvery(GUESS_LIST_ACTION.addRecord, addNewRecord);
}
