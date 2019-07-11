export const getCachedData = state => state.cachedData.get('cachedData');

export const getMaxStats = state => state.cachedData.get('cachedData').get('cards_info').get('max_stats');

export const getIdols = (state) => {
  const x = state.cachedData.get('cachedData').get('cards_info').get('idols').toArray();
  const y = x.map((item) => {
    const name = item.get('name');
    return { label: name, value: name };
  });
  return y;
};

export const getSubunits = (state) => {
  const y = state.cachedData.get('cachedData').get('cards_info').get('sub_units').toArray();
  const z = y.map(item => ({ label: item, value: item }));
  return z;
};

export const getSchools = (state) => {
  const y = state.cachedData.get('cachedData').get('cards_info').get('schools').toArray();
  const z = y.map(item => ({ label: item, value: item }));
  return z;
};

export const getSkills = (state) => {
  const x = state.cachedData.get('cachedData').get('cards_info').get('skills').toArray();
  const y = x.map((item) => {
    const skill = item.get('skill');
    return { label: skill, value: skill };
  });
  return y;
};

export const getSongMaxStat = state => state.cachedData.get('cachedData').get('cards_info').get('songs_max_stats');

export const getRandomCard = (state) => {
  try {
    const x = state.cachedData.get('cachedData').get('randomCard').toObject();
    x.idol = x.idol.toObject();
    return x;
  } catch (error) {
    return null;
  }
};

export const getBGImage = (state) => {
  try {
    return state.cachedData.get('cachedData').get('bgImage');
  } catch (error) {
    return null;
  }
};

export const getWWEventInfo = (state) => {
  try {
    return state.cachedData.get('cachedData').get('eventInfo').get('ww').toArray();
  } catch (error) {
    return null;
  }
};

export const getJPEventInfo = (state) => {
  try {
    return state.cachedData.get('cachedData').get('eventInfo').get('jp').toArray();
  } catch (error) {
    return null;
  }
};
