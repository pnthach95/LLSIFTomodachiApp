import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableHighlight, Image, Switch, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Accordion from 'react-native-collapsible/Accordion'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import VersionNumber from 'react-native-version-number'

import Fade from '../../Components/Fade/Fade'
import styles from './styles'
import { Images, ApplicationStyles } from '../../Theme'
import { Config, RELEASE_NOTE } from '../../Config'
import { AddHTTPS, loadSettings, saveSettings, openLink } from '../../Utils'
import { getRandomCard, getBGImage } from '../../Stores/CachedData/Selectors'

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
      activeSections: [0],
      visible: true,
      worldwide_only: true
    }
  }

  componentDidMount() {
    loadSettings().then(res => {
      this.setState({ worldwide_only: res.worldwide_only })
    })
  }

  _visibleToggle = () => this.setState({ visible: !this.state.visible })

  _worldwideToggle = () => {
    let settings = {
      worldwide_only: !this.state.worldwide_only
    }
    this.setState({ worldwide_only: !this.state.worldwide_only })
    saveSettings(settings)
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof Drawer
   */
  navigateToCardDetail = (item) => () => {
    this.setState({ visible: true })
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View>
        <Text>{section}</Text>
      </View>
    );
  };

  _renderContent = section => {
    if (section === 'About app')
      return (
        <View style={styles.body}>
          <ScrollView alwaysBounceVertical={false}
            contentContainerStyle={styles.textBlock}>
            <Text>{RELEASE_NOTE}</Text>
          </ScrollView>
          <View style={styles.settingRow}>
            <Text>Worldwide only</Text>
            <Switch value={this.state.worldwide_only}
              onValueChange={this._worldwideToggle} />
          </View>
        </View>
      );
    return (
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
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <SafeAreaView>
        <ImageBackground style={styles.fullscreen}
          source={{ uri: AddHTTPS(this.props.bgImage) }}>
          <Fade visible={this.state.visible} style={styles.container}>
            <View style={[ApplicationStyles.center, styles.header]}>
              <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} />
            </View>

            <Accordion
              activeSections={[0]}
              sections={['About app', 'Options']}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections} />
          </Fade>

          {!this.state.visible && <Fade visible={!this.state.visible}>
            <TouchableHighlight onPress={this.navigateToCardDetail(this.props.randomCard)}
              underlayColor={'#fff'}
              style={[ApplicationStyles.center, styles.viewMore]}>
              <Text style={styles.versionText}>View card info</Text>
            </TouchableHighlight>
          </Fade>}

          <TouchableHighlight onPress={this._visibleToggle}
            underlayColor={'#fff'}
            style={[ApplicationStyles.center, styles.versionContainer]}>
            <Text style={styles.versionText}>Version {VersionNumber.appVersion}</Text>
          </TouchableHighlight>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  randomCard: getRandomCard(state),
  bgImage: getBGImage(state)
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
