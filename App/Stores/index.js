import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';
import { reducer as CachedDataReducer } from './CachedData/Reducers';
import { reducer as CardListReducer } from './CardList/Reducers';
import { reducer as SettingReducer } from './Settings/Reducers';

export default () => {
  const rootReducer = combineReducers({
    cachedData: CachedDataReducer,
    cardList: CardListReducer,
    settings: SettingReducer,
    network,
  });

  return configureStore(rootReducer, rootSaga);
};
