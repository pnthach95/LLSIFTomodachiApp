export const getCachedData = (state) => {
  return state.cachedData.get('cachedData');
}

export const getMaxStats = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('max_stats');
}

export const getIdols = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('idols');
  let y = x.map((item) => item.get('name'));
  let z = ['All', ...y];
  return z;
}

export const getSubunits = (state) => {
  return ['All', ...state.cachedData.get('cachedData').get('cards_info').get('sub_units')];
}

export const getSchools = (state) => {
  return ['All', ...state.cachedData.get('cachedData').get('cards_info').get('schools')];
}

export const getSkills = (state) => {
  let x = state.cachedData.get('cachedData').get('cards_info').get('skills');
  let y = x.map((item) => item.get('skill'));
  let z = ['All', ...y];
  return z;
}

export const getSongMaxStat = (state) => {
  return state.cachedData.get('cachedData').get('cards_info').get('songs_max_stats');
}
