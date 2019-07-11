import { put, call } from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import { LLSIFService } from '~/Services/LLSIFService';
import { LLSIFdotnetService } from '~/Services/LLSIFdotnetService';

/**
 * [Fetch cached data](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cached-data)
 *
 * @export
 */
export default function* fetchCachedData(action) {
  const { meta } = action;
  try {
    const data = yield call(LLSIFService.fetchCachedData);
    const eventEN = yield call(LLSIFService.fetchEventList,
      { ordering: '-english_beginning', page_size: 1 });
    const eventJP = yield call(LLSIFService.fetchEventList,
      { ordering: '-beginning', page_size: 1 });
    const [eventEN0] = eventEN;
    const [eventJP0] = eventJP;
    data.eventEN = eventEN0;
    data.eventJP = eventJP0;
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
    yield put({
      type: ActionTypes.CACHED_DATA_SUCCESS,
      cachedData: data,
      meta,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.CACHED_DATA_FAILED,
      error: 'There was an error while fetching cached data.',
      meta,
    });
  }
}
