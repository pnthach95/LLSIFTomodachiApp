import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Sentry } from 'react-native-sentry';
import createStore from './redux/Stores';
import RootScreen from './Containers';
import SplashScreen from './Containers/SplashScreen/SplashScreen';
import { Colors } from './Theme';

Sentry.config('https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276').install();
const { store, persistor } = createStore();

export default class App extends Component {
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
       */
      <Provider store={store}>
        <PersistGate loading={<SplashScreen bgColor={Colors.pink} />} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }
}
