import { put } from 'redux-saga/effects'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import NavigationService from 'App/Services/NavigationService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CachedDataActions.fetchCachedData())
  NavigationService.navigateAndReset('LLSIFScreen')
}
