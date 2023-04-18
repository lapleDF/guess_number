import {all} from 'redux-saga/effects';

import guessSaga from './guessSaga';
import roundSaga from './roundSaga';

export default function* rootSaga() {
  yield all([roundSaga(), guessSaga()]);
}
