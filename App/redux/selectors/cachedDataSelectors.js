export const getCachedData = state => state.cachedData;

export const getMaxStats = state => state.cachedData.cards_info.max_stats;

export const getIdols = (state) => {
  const x = state.cachedData.cards_info.idols;
  const y = x.map((item) => {
    const { name } = item;
    return { label: name, value: name };
  });
  return y;
};

export const getSubunits = (state) => {
  const y = state.cachedData.cards_info.sub_units;
  const z = y.map(item => ({ label: item, value: item }));
  return z;
};

export const getSchools = (state) => {
  const y = state.cachedData.cards_info.schools;
  const z = y.map(item => ({ label: item, value: item }));
  return z;
};

export const getSkills = (state) => {
  const x = state.cachedData.cards_info.skills;
  const y = x.map((item) => {
    const { skill } = item;
    return { label: skill, value: skill };
  });
  return y;
};

export const getSongMaxStat = state => state.cachedData.cards_info.songs_max_stats;

export const getRandomCard = (state) => {
  try {
    const x = state.cachedData.randomCard.idol;
    return x;
  } catch (error) {
    return null;
  }
};

export const getBGImage = (state) => {
  try {
    return state.cachedData.bgImage;
  } catch (error) {
    return null;
  }
};

export const getWWEventInfo = (state) => {
  try {
    return state.cachedData.eventInfo.ww;
  } catch (error) {
    return null;
  }
};

export const getJPEventInfo = (state) => {
  try {
    return state.cachedData.eventInfo.jp;
  } catch (error) {
    return null;
  }
};
