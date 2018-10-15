import { create } from 'apisauce'
import { Config } from 'App/Config'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 10000
})

async function fetchCachedData() {
  const response = await LLSIFApiClient.get(Config.CACHED_DATA)
  if (response.ok) {
    return response.data
  }
  return null
}

async function fetchCardList(filter) {
  const response = await LLSIFApiClient.get(Config.CARDS, filter)
  if (response.ok) {
    return response.data.results
  }
  return null
}

export const LLSIFService = {
  fetchCachedData, fetchCardList
}
