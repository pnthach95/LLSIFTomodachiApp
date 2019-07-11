import React from 'react';
import PropTypes from 'prop-types';
import SplashScreen from '../SplashScreen/SplashScreen';

/**
 * Loading Screen
 *
 * @export
 * @class LoadingScreen
 * @extends {React.Component}
 */
export default class LoadingScreen extends React.Component {
  static propTypes = {
    fetchCachedData: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchCachedData()
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('fetchCachedData', res);
        this.props.navigation.navigate('AppStack');
      });
  }

  render() {
    return (
      <SplashScreen />
    );
  }
}
