import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import reducer from './reducer';
import rootSaga from './sagas/rootSaga';

const networkMiddleware = createNetworkMiddleware();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  reducer,
  network,
});
const middlewares = [networkMiddleware, thunkMiddleware, sagaMiddleware, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
export default store;
