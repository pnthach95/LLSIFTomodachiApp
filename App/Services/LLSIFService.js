import { create } from 'apisauce'
import { Config } from 'App/Config'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 5000
})

function fetchCachedData() {
  return LLSIFApiClient.get(Config.CACHED_DATA).then((response) => {
    if (response.ok) {
      return response.data
    }
    return null
  })
}

export const LLSIFService = {
  fetchCachedData,
}
