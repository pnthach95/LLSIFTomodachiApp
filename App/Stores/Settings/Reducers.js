import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { SettingTypes } from './Actions';

export const saveSettings = (state, { settings }) => state.merge({ settings });

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [SettingTypes.SAVE_SETTINGS]: saveSettings,
});
