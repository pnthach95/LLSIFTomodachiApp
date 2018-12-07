import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { SettingTypes } from './Actions';

export const saveSettings = (state, { settings }) =>
  state.merge({ settings: settings });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SettingTypes.SAVE_SETTINGS]: saveSettings
})
