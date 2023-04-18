import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {roundListReducer} from './reducers/roundReducer';
import {guessListReducer} from './reducers/guessListReducer';
import rootSaga from './saga';

const sagaMiddleWare = createSagaMiddleware();
const reducer = combineReducers({
  rounds: roundListReducer,
  guesses: guessListReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export const appDispatch = (type: string, payload: any) =>
  store.dispatch({type, payload});
export default store;
