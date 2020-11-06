import { create } from 'apisauce';
import { flattenDeep } from 'lodash';
import { Config } from '../Config';
import type {
  CardObject,
  CardSearchParams,
  EventObject,
  IdolObject,
  LLSIFCacheData,
  SongObject
} from '~/Utils/types';

const LLSIFApiClient = create({
  baseURL: Config.API_URL
});

/**
 * [Fetch cached data](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cached-data)
 */
const fetchCachedData = async (): Promise<LLSIFCacheData | null> => {
  const response = await LLSIFApiClient.get<LLSIFCacheData>(Config.CACHED_DATA);
  if (response.ok && response.data) {
    return response.data;
  }
  return null;
};

/**
 * [Fetch card list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards)
 */
const fetchCardList = async (
  filter: CardSearchParams
): Promise<number | CardObject[] | null> => {
  const response = await LLSIFApiClient.get<{ results: CardObject[] }>(
    Config.CARDS,
    filter
  );
  if (response.ok && response.data) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
};

const getIdols = async (school): Promise<IdolObject[]> => {
  const response = await LLSIFApiClient.get<{ results: IdolObject[] }>(
    Config.IDOLS,
    { school }
  );
  if (response.ok && response.data) {
    return response.data.results;
  }
  return [];
};

const fetchIdolListBySchool = async (schools: any[]): Promise<IdolObject[]> => {
  const data = [];
  for (let i = 0; i < schools.length; i += 1) {
    const school = schools[i];
    const response = getIdols(school);
    data.push(response);
  }
  const result = await Promise.all(data);
  const final = flattenDeep(result);
  return final;
};

const fetchIdolListByPageSize = async () => {
  const response1 = await LLSIFApiClient.get<{ results: IdolObject[] }>(
    Config.IDOLS,
    { page_size: 100 }
  );
  const response2 = await LLSIFApiClient.get<{ results: IdolObject[] }>(
    Config.IDOLS,
    {
      page_size: 100,
      page: 2
    }
  );
  let data1 = [];
  let data2 = [];
  if (response1.ok && response1.data) {
    data1 = response1.data.results;
  } else return null;
  if (response2.ok && response2.data) {
    data2 = response2.data.results;
  } else return null;
  return [...data1, ...data2];
};

/**
 * [Fetch idol list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#get-the-list-of-idols)
 */
const fetchIdolList = (schools = null) => {
  return new Promise((resolve, reject) => {
    if (schools === null) {
      fetchIdolListByPageSize().then((res) => {
        if (res.length === 0) reject(Error('Failed to get idol list'));
        resolve(res);
      });
    } else {
      fetchIdolListBySchool(schools).then((res) => {
        if (res.length === 0) reject(Error('Failed to get idol list'));
        resolve(res);
      });
    }
  });
};

/**
 * [Fetch idol](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#get-an-idol-by-name)
 */
const fetchIdol = async (name: string): Promise<IdolObject | null> => {
  const response = await LLSIFApiClient.get<IdolObject>(Config.IDOLS + name);
  if (response.ok && response.data) {
    return response.data;
  }
  return null;
};

/**
 * [Fetch song list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 */
const fetchSongList = async (filter): Promise<SongObject[] | number | null> => {
  const newFilter = { ...filter, expand_event: '' };
  const response = await LLSIFApiClient.get<{ results: SongObject[] }>(
    Config.SONGS,
    newFilter
  );
  if (response.ok && response.data) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
};

/**
 * [Fetch event list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events)
 */
const fetchEventList = async (
  filter
): Promise<EventObject[] | number | null> => {
  const response = await LLSIFApiClient.get<{ results: EventObject[] }>(
    Config.EVENTS,
    filter
  );
  if (response.ok && response.data) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
};

/**
 * [Fetch event information](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-an-event-by-japanese-name)
 */
const fetchEventData = async (name: string): Promise<EventObject | null> => {
  const response = await LLSIFApiClient.get<EventObject>(Config.EVENTS + name);
  if (response.ok && response.data) {
    return response.data;
  }
  return null;
};

export default {
  fetchCachedData,
  fetchCardList,
  fetchIdolList,
  fetchIdol,
  fetchSongList,
  fetchEventList,
  fetchEventData
};
