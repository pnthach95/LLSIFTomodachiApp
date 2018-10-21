import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas'
import { reducer as network } from 'react-native-offline'
import { reducer as CachedDataReducer } from './CachedData/Reducers'
import { reducer as CardListReducer } from './CardList/Reducers'

export default () => {
  const rootReducer = combineReducers({
    cachedData: CachedDataReducer,
    cardList: CardListReducer,
    network
  })

  return configureStore(rootReducer, rootSaga)
}
