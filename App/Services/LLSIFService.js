import { create } from 'apisauce';
import { Config } from '../Config';

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

/**
 * [Fetch cached data](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cached-data)
 *
 * @returns
 */
async function fetchCachedData() {
  const response = await LLSIFApiClient.get(Config.CACHED_DATA);
  if (response.ok) {
    return response.data;
  }
  return null;
}

/**
 * [Fetch card list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards)
 *
 * @param {Object} filter [Filter](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * @returns
 */
async function fetchCardList(filter) {
  const response = await LLSIFApiClient.get(Config.CARDS, filter);
  if (response.ok) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
}

async function fetchIdolListBySchool(schools) {
  let data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < schools.length; i++) {
    const school = schools[i];
    const response = LLSIFApiClient.get(Config.IDOLS, { school });
    if (response.ok) {
      data = [...data, ...response.data.results];
    }
  }
  const result = await Promise.all(data);
  return result;
}

async function fetchIdolListByPageSize() {
  const response1 = await LLSIFApiClient.get(Config.IDOLS, { page_size: 100 });
  const response2 = await LLSIFApiClient.get(Config.IDOLS, { page_size: 100, page: 2 });
  let data1 = [];
  let data2 = [];
  if (response1.ok) {
    data1 = response1.data.results;
  } else return null;
  if (response2.ok) {
    data2 = response2.data.results;
  } else return null;
  return [...data1, ...data2];
}

/**
 * [Fetch idol list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#get-the-list-of-idols)
 *
 * @returns
 */
function fetchIdolList(schools = null) {
  return new Promise((resolve, reject) => {
    if (schools === null) {
      fetchIdolListByPageSize()
        .then((res) => {
          if (res.length === 0) reject(Error('Failed to get idol list'));
          resolve(res);
        });
    } else {
      fetchIdolListBySchool(schools)
        .then((res) => {
          if (res.length === 0) reject(Error('Failed to get idol list'));
          resolve(res);
        });
    }
  });
}

/**
 * [Fetch idol](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#get-an-idol-by-name)
 *
 * @param {String} name English idol name
 * @returns
 */
async function fetchIdol(name) {
  const response = await LLSIFApiClient.get(Config.IDOLS + name);
  if (response.ok) {
    return response.data;
  }
  return null;
}

/**
 * [Fetch song list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 *
 * @param {Object} filter
 * @returns
 */
async function fetchSongList(filter) {
  // eslint-disable-next-line no-param-reassign
  filter.expand_event = '';
  const response = await LLSIFApiClient.get(Config.SONGS, filter);
  if (response.ok) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
}

/**
 * [Fetch event list](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events)
 *
 * @param {Object} filter
 * @returns
 */
async function fetchEventList(filter) {
  const response = await LLSIFApiClient.get(Config.EVENTS, filter);
  if (response.ok) {
    return response.data.results;
  }
  if (response.status === 404) {
    return 404;
  }
  return null;
}

/**
 * [Fetch event information](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-an-event-by-japanese-name)
 *
 * @param {*} name Japanese event name
 * @returns
 */
async function fetchEventData(name) {
  const response = await LLSIFApiClient.get(Config.EVENTS + name);
  if (response.ok) {
    return response.data;
  }
  return null;
}

async function fetchRandomCard() {
  const filter = {
    ordering: 'random',
    page_size: 1,
    rarity: 'SSR,UR',
    idol_main_unit: 'μ\'s,Aqours',
  };
  const response = await LLSIFApiClient.get(Config.CARDS, filter);
  if (response.ok) {
    return response.data.results[0];
  }
  return null;
}

export default {
  fetchCachedData,
  fetchCardList,
  fetchIdolList,
  fetchIdol,
  fetchSongList,
  fetchEventList,
  fetchEventData,
  fetchRandomCard,
};
