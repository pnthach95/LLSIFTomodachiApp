import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import reducer from './reducer';
import sagas from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(thunkMiddleware, sagaMiddleware, logger));

sagaMiddleware.run(sagas);
export default store;
