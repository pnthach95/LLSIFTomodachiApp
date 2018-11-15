import { AsyncStorage } from 'react-native'
import { put, call } from 'redux-saga/effects'
import SettingActions from '../Stores/Settings/Actions'

export function* setSettings(action) {
  let j = JSON.stringify(action.settings)
  AsyncStorage.setItem('settings', j)
  yield put(SettingActions.saveSettings(action.settings))
}

export function* getSettings() {
  let data = yield call(loadSettings)
  if (data == null) {
    data = {
      worldwide_only: false
    }
  } else {
    data = JSON.parse(data)
  }
  yield put(SettingActions.saveSettings(data))
}

async function loadSettings() {
  return await AsyncStorage.getItem('settings')
}
