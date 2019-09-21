export const getIdols = (state) => {
  const x = state.reducer.cachedData.cards_info.idols;
  const y = x.map((item) => {
    const { name } = item;
    return { label: name, value: name };
  });
  return y;
};

export const getSubunits = (state) => {
  const y = state.reducer.cachedData.cards_info.sub_units;
  const z = y.map((item) => ({ label: item, value: item }));
  return z;
};

export const getSchools = (state) => {
  const y = state.reducer.cachedData.cards_info.schools;
  const z = y.map((item) => ({ label: item, value: item }));
  return z;
};

export const getSkills = (state) => {
  const x = state.reducer.cachedData.cards_info.skills;
  const y = x.map((item) => {
    const { skill } = item;
    return { label: skill, value: skill };
  });
  return y;
};
