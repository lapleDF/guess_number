import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {PayloadAction} from '../@type/PayloadAction';
import {roundReducer} from './reducers/roundReducer';
import {guessListReducer} from './reducers/guessListReducer';
import rootSaga from './saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const sagaMiddleWare = createSagaMiddleware();
const reducer = combineReducers({
  rounds: roundReducer,
  guesses: guessListReducer,
});

// const composeEnhancers =
//   (process.env.REACT_APP_NODE_ENV !== 'production' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
