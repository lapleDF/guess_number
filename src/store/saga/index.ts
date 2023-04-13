import guessSaga from './guessSaga';
import roundSaga from './roundSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([roundSaga(), guessSaga()]);
}
