import { takeLatest } from 'redux-saga/effects'
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
  ]
}
