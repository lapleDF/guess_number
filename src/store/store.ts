import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {roundReducer} from './reducers/roundReducer';
import {guessListReducer} from './reducers/guessListReducer';
import rootSaga from './saga';
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleWare = createSagaMiddleware();
const reducer = combineReducers({
  rounds: roundReducer,
  guesses: guessListReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
