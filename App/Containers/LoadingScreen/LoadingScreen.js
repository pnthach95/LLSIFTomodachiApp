import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Fonts } from '~/Theme';

/**
 * Loading Screen
 *
 * @export
 * @class LoadingScreen
 * @extends {React.Component}
 */
export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static propTypes = {
    fetchCachedData: PropTypes.func,
  }

  componentDidMount() {
    this.loadCachedData();
  }

  loadCachedData = () => {
    this.setState({ error: false });
    this.props.fetchCachedData()
      .then(() => {
        this.props.navigation.navigate('AppStack');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        this.setState({ error: true });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <View style={[
          ApplicationStyles.screen,
          ApplicationStyles.center,
          styles.bg,
        ]}>
          <View style={styles.textBox}>
            <Text style={styles.text}>
              {'Can\'t get data.\nCheck internet connection and retry.'}
            </Text>
          </View>
          <TouchableOpacity onPress={this.loadCachedData}>
            <View style={styles.button}>
              <Text style={Fonts.style.normal}>Retry</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return <SplashScreen bgColor={Colors.pink} />;
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.pink,
  },
  button: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 10,
  },
  text: {
    ...Fonts.style.normal,
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
  textBox: {
    marginHorizontal: 10,
  },
});
