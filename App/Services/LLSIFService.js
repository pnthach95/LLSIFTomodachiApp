import { create } from 'apisauce'
import { Config } from '../Config'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 10000
})

/**
 * Lấy cache data
 * 
 * https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cached-data
 */
async function fetchCachedData() {
  const response = await LLSIFApiClient.get(Config.CACHED_DATA)
  console.log('fetchCachedData', response)
  if (response.ok) {
    return response.data
  }
  return null
}

/**
 * Lấy danh sách card
 * 
 * https://github.com/SchoolIdolTomodachi/SchoolIdolAPI/wiki/API-Cards
 * - filter: bộ lọc tìm kiếm (https://github.com/SchoolIdolTomodachi/SchoolIdolAPI/wiki/API-Cards#objects)
 */
async function fetchCardList(filter) {
  const response = await LLSIFApiClient.get(Config.CARDS, filter)
  console.log('fetchCardList filter', filter)
  console.log('fetchCardList response', response)
  if (response.ok) {
    return response.data.results
  }
  return null
}

/**
 * Lấy danh sách idol
 * 
 * https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols
 */
async function fetchIdolList() {
  const response1 = await LLSIFApiClient.get(Config.IDOLS, { page_size: 100 })
  const response2 = await LLSIFApiClient.get(Config.IDOLS, { page_size: 100, page: 2 })
  var data1 = []
  var data2 = []
  if (response1.ok) {
    data1 = response1.data.results
  } else return null
  if (response2.ok) {
    data2 = response2.data.results
  }
  return [...data1, ...data2]
}

/**
 *Lấy thông tin idol
 *
 * @param {String} name tên tiếng Anh của idol
 * @returns
 */
async function fetchIdol(name) {
  const response = await LLSIFApiClient.get(Config.IDOLS + name)
  console.log('fetchIdol name', name)
  console.log('fetchIdol response', response)
  if (response.ok) {
    return response.data
  }
  return null
}

/**
 * Lấy danh sách bài hát
 * 
 * https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs
 */
async function fetchSongList(filter) {
  filter.expand_event = ''
  const response = await LLSIFApiClient.get(Config.SONGS, filter)
  console.log('fetchSongList filter', filter)
  console.log('fetchSongList response', response)
  if (response.ok) {
    return response.data.results
  }
  return null
}

/**
 * Lấy danh sách sự kiện
 * 
 * https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events
 */
async function fetchEventList(filter) {
  const response = await LLSIFApiClient.get(Config.EVENTS, filter)
  console.log('fetchEventList filter', filter)
  console.log('fetchEventList response', response)
  if (response.ok) {
    return response.data.results
  }
  return null
}

/**
 * Lấy thông tin sự kiện
 * 
 * https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-an-event-by-japanese-name
 * - name: tên sự kiện (japanese_name)
 */
async function fetchEventData(name) {
  const response = await LLSIFApiClient.get(Config.EVENTS + name)
  console.log('fetchEventData name', name)
  console.log('fetchEventData response', response)
  if (response.ok) {
    return response.data
  }
  return null
}

export const LLSIFService = {
  fetchCachedData,
  fetchCardList,
  fetchIdolList,
  fetchIdol,
  fetchSongList,
  fetchEventList,
  fetchEventData
}
