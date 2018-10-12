import { takeLatest, fork } from 'redux-saga/effects'
import { networkEventsListenerSaga } from 'react-native-offline'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { CachedDataTypes } from 'App/Stores/CachedData/Actions'
import { fetchCachedData } from './CachedDataSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield [
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(CachedDataTypes.FETCH_CACHED_DATA, fetchCachedData),
    fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 }),
  ]
}
