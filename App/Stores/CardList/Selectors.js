export const getCachedData = state => state.cachedData.get('cachedData');

export const getMaxStats = state => state.cachedData.get('cachedData').get('cards_info').get('max_stats');

export const getIdols = (state) => {
  const x = state.cachedData.get('cachedData').get('cards_info').get('idols');
  const y = x.map(item => item.get('name'));
  const z = ['All', ...y];
  return z;
};

export const getSubunits = state => ['All', ...state.cachedData.get('cachedData').get('cards_info').get('sub_units')];

export const getSchools = state => ['All', ...state.cachedData.get('cachedData').get('cards_info').get('schools')];

export const getSkills = (state) => {
  const x = state.cachedData.get('cachedData').get('cards_info').get('skills');
  const y = x.map(item => item.get('skill'));
  const z = ['All', ...y];
  return z;
};

export const getSongMaxStat = state => state.cachedData.get('cachedData').get('cards_info').get('songs_max_stats');
