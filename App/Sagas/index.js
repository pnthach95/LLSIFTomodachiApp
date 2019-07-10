import { takeLatest, fork } from 'redux-saga/effects';
import { networkEventsListenerSaga } from 'react-native-offline';
import { CachedDataTypes } from '../Stores/CachedData/Actions';
import { CardListTypes } from '../Stores/CardList/Actions';
import { SettingTypes } from '../Stores/Settings/Actions';
import { fetchCachedData } from './CachedDataSaga';
import { fetchCardList } from './CardListSaga';
import { setSettings, getSettings } from './SettingSaga';

export default function* root() {
  yield [
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(CachedDataTypes.FETCH_CACHED_DATA, fetchCachedData),
    takeLatest(CardListTypes.FETCH_CARD_LIST, fetchCardList),
    takeLatest(SettingTypes.SET_SETTINGS, setSettings),
    takeLatest(SettingTypes.GET_SETTINGS, getSettings),
    fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 }),
  ];
}
