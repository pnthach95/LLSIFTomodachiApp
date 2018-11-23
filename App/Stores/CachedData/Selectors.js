export const getCachedData = (state) => {
  return state.cachedData.get('cachedData')
}

export const getMaxStats = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('max_stats')
}

export const getIdols = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('idols')
  let y = x.map((item) => item.get('name'))
  var z = []
  for (let i = 0; i < y.length; i++) {
    z.push({ label: y[i], value: y[i] })
  }
  return z
}

export const getSubunits = (state) => {
  let y = state.cachedData.get('cachedData').get('cards_info').get('sub_units')
  var z = []
  for (let i = 0; i < y.length; i++) {
    z.push({ label: y[i], value: y[i] })
  }
  return z
}

export const getSchools = (state) => {
  let y = state.cachedData.get('cachedData').get('cards_info').get('schools')
  var z = []
  for (let i = 0; i < y.length; i++) {
    z.push({ label: y[i], value: y[i] })
  }
  return z
}

export const getSkills = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('skills')
  let y = x.map((item) => {
    let z = item.get('skill')
    return { label: z, value: z }
  })
  return y
}

export const getSongMaxStat = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('songs_max_stats')
}

export const getRandomCard = (state) => {
  try {
    let x = state.cachedData.get('cachedData').get('randomCard').toObject()
    x.idol = x.idol.toObject()
    return x
  } catch (error) {
    return null
  }
}

export const getBGImage = (state) => {
  try {
    return state.cachedData.get('cachedData').get('bgImage')
  } catch (error) {
    return null
  }
}
