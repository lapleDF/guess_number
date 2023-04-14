import {put, takeEvery, select} from 'redux-saga/effects';
import {ROUND_ACTION} from '../actions/roundAction.constant';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {RootState} from '../store';
import {GuessRecord} from '../../@type/GuessRecord';
import {PayloadAction} from '../../@type/PayloadAction';
import {getRandomNumbers} from '../../shared/getRandomNumber';

function* resetGuessList() {
  const guessList: GuessRecord[] = yield select(
    (state: RootState) => state.guesses.guessList,
  );
  yield put({type: GUESS_LIST_ACTION.clear});
  yield put({type: ROUND_ACTION.storeGuessList, payload: guessList});
}

function* resetExpectedNumber(action: PayloadAction) {
  yield put({
    type: ROUND_ACTION.resetExpectedNumber,
    payload: getRandomNumbers(action.payload),
  });
  yield put({type: GUESS_LIST_ACTION.clear});
}

export default function* roundSaga() {
  yield takeEvery(ROUND_ACTION.newGame, resetGuessList);
  yield takeEvery(ROUND_ACTION.setLevel, resetExpectedNumber);
}
