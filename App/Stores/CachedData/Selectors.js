export const getCachedData = (state) => {
  return state.cachedData.get('cachedData');
}

export const getMaxStats = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('max_stats');
}

export const getIdols = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('idols').toArray();
  let y = x.map(item => {
    let name = item.get('name');
    return { label: name, value: name };
  })
  return y;
}

export const getSubunits = (state) => {
  let y = state.cachedData.get('cachedData').get('cards_info').get('sub_units').toArray();
  var z = y.map(item => ({ label: item, value: item }));
  return z;
}

export const getSchools = (state) => {
  let y = state.cachedData.get('cachedData').get('cards_info').get('schools').toArray();
  var z = y.map(item => ({ label: item, value: item }));
  return z;
}

export const getSkills = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('skills').toArray();
  let y = x.map(item => {
    let skill = item.get('skill');
    return { label: skill, value: skill };
  })
  return y;
}

export const getSongMaxStat = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('songs_max_stats');
}

export const getRandomCard = (state) => {
  try {
    let x = state.cachedData.get('cachedData').get('randomCard').toObject();
    x.idol = x.idol.toObject();
    return x;
  } catch (error) {
    return null;
  }
}

export const getBGImage = (state) => {
  try {
    return state.cachedData.get('cachedData').get('bgImage');
  } catch (error) {
    return null;
  }
}
