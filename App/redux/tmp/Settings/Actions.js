import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setSettings: ['settings'],
  getSettings: null,
  saveSettings: ['settings'],
});

export const SettingTypes = Types;
export default Creators;
