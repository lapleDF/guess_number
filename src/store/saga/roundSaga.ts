import {put, takeEvery, select} from 'redux-saga/effects';
import {ROUND_ACTION} from '../actions/roundAction.constant';
import {GUESS_LIST_ACTION} from '../actions/guessListAction.constant';
import {RootState} from '../store';
import {GuessRecord} from '../../interface/GuessRecord';
import {PayloadAction} from '../../interface/PayloadAction';
import {getRandomNumbers} from '../../shared/getRandomNumber';

function* resetGuessList() {
  const guessList: GuessRecord[] = yield select(
    (state: RootState) => state.guesses.guessList,
  );
  yield put({type: GUESS_LIST_ACTION.CLEAR});
  yield put({type: ROUND_ACTION.STORE_GUESS_LIST, payload: guessList});
}

function* resetExpectedNumber(action: PayloadAction) {
  yield put({
    type: ROUND_ACTION.RESET_EXPECTED_NUMBER,
    payload: getRandomNumbers(action.payload),
  });
  yield put({type: GUESS_LIST_ACTION.CLEAR});
}

export default function* roundSaga() {
  yield takeEvery(ROUND_ACTION.NEW_GAME, resetGuessList);
  yield takeEvery(ROUND_ACTION.SET_LEVEL, resetExpectedNumber);
}
