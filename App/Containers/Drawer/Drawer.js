import React, { Component } from 'react'
import { View, Text, Linking, ImageBackground, TouchableHighlight, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import VersionNumber from 'react-native-version-number'

import Fade from '../../Components/Fade/Fade'
import styles from './styles'
import { Images, ApplicationStyles } from '../../Theme'
import { Config } from '../../Config'
import { AddHTTPS } from '../../Utils'
import { getRandomCard } from '../../Stores/CachedData/Selectors'

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
      visible: true,
      random: -1
    }
  }

  _visibleToggle = () => this.setState({ visible: !this.state.visible })

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof Drawer
   */
  navigateToCardDetail = (item) => () => this.props.navigation.navigate('CardDetailScreen', { item: item })

  render() {
    return (
      <SafeAreaView>
        <ImageBackground style={styles.fullscreen}
          source={{ uri: AddHTTPS(this.props.bgImage) }}>
          <Fade visible={this.state.visible} style={styles.container}>
            <View style={[ApplicationStyles.center, styles.header]}>
              <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            <View style={styles.body}>
              <Text>This app is open-source.</Text>
            </View>
            <View style={[ApplicationStyles.center, styles.footer]}>
              <Text style={styles.versionText}>Powered by School Idol Tomodachi</Text>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Icon name={'logo-github'} size={50}
                  onPress={() => Linking.openURL(Config.GITHUB_PROJECT)} />
              </View>
            </View>
          </Fade>

          {!this.state.visible && <TouchableHighlight onPress={this.navigateToCardDetail(this.props.randomCard)}
            underlayColor={'#fff'}
            style={[ApplicationStyles.center, styles.viewMore]}>
            <Text style={styles.versionText}>View card info</Text>
          </TouchableHighlight>}

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
  bgImage: state.cachedData.get('cachedData').get('bgImage')
})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
