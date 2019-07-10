import { put, call } from 'redux-saga/effects';
import CachedDataActions from '../Stores/CachedData/Actions';
import { LLSIFService } from '../Services/LLSIFService';
import { LLSIFdotnetService } from '../Services/LLSIFdotnetService';

/**
 * [Fetch cached data](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cached-data)
 *
 * @export
 */
export function* fetchCachedData() {
  yield put(CachedDataActions.fetchCachedDataLoading());
  const data = yield call(LLSIFService.fetchCachedData);
  const eventEN = yield call(LLSIFService.fetchEventList,
    { ordering: '-english_beginning', page_size: 1 });
  const eventJP = yield call(LLSIFService.fetchEventList,
    { ordering: '-beginning', page_size: 1 });
  data.eventEN = eventEN[0];
  data.eventJP = eventJP[0];
  const randomCard = yield call(LLSIFService.fetchRandomCard);
  const r = Math.floor(Math.random() * 10);
  let bgImage = '';
  if (randomCard.clean_ur !== null && r < 6) {
    bgImage = randomCard.clean_ur;
  } else {
    bgImage = randomCard.clean_ur_idolized;
  }
  data.randomCard = randomCard;
  data.bgImage = bgImage;
  const eventInfo = yield call(LLSIFdotnetService.fetchEventInfo);
  data.eventInfo = eventInfo;
  if (data) {
    yield put(CachedDataActions.fetchCachedDataSuccess(data));
  } else {
    yield put(CachedDataActions.fetchCachedDataFailure('There was an error while fetching cached data.'));
  }
}
