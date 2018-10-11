import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as CachedDataReducer } from './CachedData/Reducers'

export default () => {
  const rootReducer = combineReducers({
    cachedData: CachedDataReducer
  })

  return configureStore(rootReducer, rootSaga)
}
