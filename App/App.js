import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Sentry } from 'react-native-sentry';
import SplashScreen from 'react-native-splash-screen';
import createStore from './Stores';
import RootScreen from './Containers/Root/RootScreen';
import SplashScreen1 from './Containers/SplashScreen/SplashScreen';
import { Colors } from './Theme';

Sentry.config('https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276').install();
const { store, persistor } = createStore();

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={<SplashScreen1 bgColor={Colors.pink} />} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    )
  }
}
