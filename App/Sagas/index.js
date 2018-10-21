import { takeLatest, fork } from 'redux-saga/effects'
import { networkEventsListenerSaga } from 'react-native-offline'
import { CachedDataTypes } from '../Stores/CachedData/Actions'
import { CardListTypes } from '../Stores/CardList/Actions'
import { fetchCachedData } from './CachedDataSaga'
import { fetchCardList } from './CardListSaga'

export default function* root() {
  yield [
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(CachedDataTypes.FETCH_CACHED_DATA, fetchCachedData),
    takeLatest(CardListTypes.FETCH_CARD_LIST, fetchCardList),
    fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 }),
  ]
}
