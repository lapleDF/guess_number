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
import Config from 'react-native-config';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare var window: Window & typeof globalThis;
const sagaMiddleWare = createSagaMiddleware();
const reducer = combineReducers({
  rounds: roundReducer,
  guesses: guessListReducer,
});

const composeEnhancers =
  (Config.REACT_APP_NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
