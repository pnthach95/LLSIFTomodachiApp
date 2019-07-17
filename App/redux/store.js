import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  reducer as network,
  createNetworkMiddleware,
} from 'react-native-offline';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducer';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const networkMiddleware = createNetworkMiddleware();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  reducer,
  network,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [networkMiddleware, thunkMiddleware, sagaMiddleware, logger];
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
export default store;
export const persistor = persistStore(store);
