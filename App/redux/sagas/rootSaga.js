import { takeLatest } from 'redux-saga/effects';
import { login, refreshToken, getUserProfile } from '../../../../react-native-reddit/src/redux/sagas/userSagas';
import * as ActionTypes from '../../../../react-native-reddit/src/redux/actions/ActionTypes';

export default function* rootSaga() {
  yield [
    yield takeLatest(ActionTypes.USER_LOGIN, login),
    yield takeLatest(ActionTypes.USER_REFRESH_TOKEN, refreshToken),
    yield takeLatest(ActionTypes.GET_USER_PROFILE, getUserProfile),
  ];
}
