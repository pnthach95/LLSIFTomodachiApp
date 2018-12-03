import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableHighlight, TouchableOpacity, Image, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';

import Fade from '../../Components/Fade/Fade';
import styles from './styles';
import { Images, ApplicationStyles } from '../../Theme';
import { Config, RELEASE_NOTE } from '../../Config';
import { AddHTTPS, loadSettings, saveSettings, openLink } from '../../Utils';
import { getRandomCard, getBGImage } from '../../Stores/CachedData/Selectors';

/**
 * Left Drawer show some information
 *
 * @export
 * @class Drawer
 * @extends {Component}
 */
class Drawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true,
      visible: true,
      ww_event: true,
      jp_event: true,
      worldwide_only: true
    }
  }

  componentDidMount() {
    loadSettings().then(res => {
      this.setState({
        ww_event: res.ww_event,
        jp_event: res.jp_event,
        worldwide_only: res.worldwide_only
      })
    });
  }

  _visibleToggle = () => this.setState({ visible: !this.state.visible })

  _worldwideToggle = () => {
    let settings = {
      ww_event: this.state.ww_event,
      jp_event: this.state.jp_event,
      worldwide_only: !this.state.worldwide_only
    }
    this.setState({ worldwide_only: !this.state.worldwide_only });
    saveSettings(settings);
  }

  _wwEventToggle = () => {
    let settings = {
      ww_event: !this.state.ww_event,
      jp_event: this.state.jp_event,
      worldwide_only: this.state.worldwide_only
    }
    if (!this.state.ww_event) {
      firebase.messaging().subscribeToTopic('ww_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('ww_event');
    }
    this.setState({ ww_event: !this.state.ww_event });
    saveSettings(settings);
  }

  _groupToggle = () => this.setState({ isCollapsed: !this.state.isCollapsed });

  _jpEventToggle = () => {
    let settings = {
      ww_event: this.state.ww_event,
      jp_event: !this.state.jp_event,
      worldwide_only: this.state.worldwide_only
    }
    if (!this.state.jp_event) {
      firebase.messaging().subscribeToTopic('jp_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('jp_event');
    }
    this.setState({ jp_event: !this.state.jp_event });
    saveSettings(settings);
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof Drawer
   */
  _navigateToCardDetail = (item) => () => {
    this.setState({ visible: true });
    this.props.navigation.navigate('CardDetailScreen', { item: item });
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <SafeAreaView>
        <ImageBackground style={styles.fullscreen}
          source={{ uri: AddHTTPS(this.props.bgImage) }}>
          <View style={{ flex: 1 }}>
            <Fade visible={this.state.visible} style={styles.container}>
              <View style={[ApplicationStyles.center, styles.header]}>
                <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this._groupToggle}>
                  <View style={styles.group}>
                    <Text>OPTIONS</Text>
                    <Icon name={this.state.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'} size={20} />
                  </View>
                </TouchableOpacity>
                {this.state.isCollapsed && <View style={styles.body}>
                  <ScrollView bounces={false}>
                    <View style={styles.settingRow}>
                      <Text>Search Worldwide only</Text>
                      <Switch value={this.state.worldwide_only}
                        onValueChange={this._worldwideToggle} />
                    </View>
                    <View style={styles.settingRow}>
                      <Text>Notify WW event</Text>
                      <Switch value={this.state.ww_event}
                        onValueChange={this._wwEventToggle} />
                    </View>
                    <View style={styles.settingRow}>
                      <Text>Notify JP event</Text>
                      <Switch value={this.state.jp_event}
                        onValueChange={this._jpEventToggle} />
                    </View>
                  </ScrollView>
                </View>}
                <TouchableOpacity onPress={this._groupToggle}>
                  <View style={styles.group}>
                    <Text>ABOUT ME</Text>
                    <Icon name={!this.state.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'} size={20}/>
                  </View>
                </TouchableOpacity>
                {!this.state.isCollapsed && <View style={{ flex: 1 }}>
                  <ScrollView bounces={false}
                    style={styles.textBlock}>
                    <Text>{RELEASE_NOTE}</Text>
                  </ScrollView>
                </View>}
              </View>
              <View style={[ApplicationStyles.center, styles.footer]}>
                <View style={styles.footerBlock}>
                  <Text style={styles.versionText}>Powered by </Text>
                  <Text onPress={() => openLink(Config.SCHOOLIDO)}
                    style={[styles.versionText, { textDecorationLine: 'underline' }]}>
                    {`School Idol Tomodachi`}
                  </Text>
                </View>
                <View style={styles.footerBlock}>
                  <TouchableHighlight onPress={() => openLink(Config.GITHUB_PROJECT)}
                    underlayColor={'#fff0'}
                    style={ApplicationStyles.center}>
                    <View style={ApplicationStyles.center}>
                      <Icon name={'logo-github'} size={50} />
                      <Text>Project</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Fade>

            {!this.state.visible &&
              <Fade visible={!this.state.visible}
                style={[styles.container, { backgroundColor: '#0000' }]}>
                <TouchableHighlight onPress={this._navigateToCardDetail(this.props.randomCard)}
                  underlayColor={'#fffa'}
                  style={[ApplicationStyles.center, styles.viewMore]}>
                  <Text style={styles.versionText}>View card info</Text>
                </TouchableHighlight>
              </Fade>}

            <TouchableHighlight onPress={this._visibleToggle}
              underlayColor={'#fff'}
              style={[ApplicationStyles.center, styles.versionContainer]}>
              <Text style={styles.versionText}>Version {VersionNumber.appVersion}</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  randomCard: getRandomCard(state),
  bgImage: getBGImage(state)
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
