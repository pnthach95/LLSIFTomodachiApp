import React, { Component } from 'react'
import { ImageBackground, Image } from 'react-native'
import { connect } from 'react-redux'
import VersionNumber from 'react-native-version-number'
import { Container, Header, Content, Footer, Button, Body, Icon, Text, CheckBox, ListItem } from 'native-base'

import styles from './styles'
import { Images } from '../../Theme'
import { Config } from '../../Config'
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
      visible: true,
      worldwide_only: true
    }
  }

  componentDidMount() {
    loadSettings().then(res => this.setState({ worldwide_only: res.worldwide_only }))
  }

  _visibleToggle = () => this.setState({ visible: !this.state.visible })

  _worldwideToggle = () => {
    let settings = { worldwide_only: !this.state.worldwide_only }
    this.setState(settings)
    saveSettings(settings)
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof Drawer
   */
  _navigateToCardDetail = (item) => () => {
    this.setState({ visible: true })
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  render() {
    return (
      <Container>
        <ImageBackground source={{ uri: AddHTTPS(this.props.bgImage) }}
          style={styles.fullscreen}>
          <Header style={styles.header}>
            <Body>
              {this.state.visible ?
                <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} /> :
                <Button light full onPress={this._navigateToCardDetail(this.props.randomCard)}>
                  <Text uppercase={false} style={styles.versionText}>View card info</Text>
                </Button>}
            </Body>
          </Header>

          <Container style={styles.transparent}>
            {this.state.visible && <Container style={styles.container}>
              <Content style={styles.textBlock}>
                <Text>{Config.DRAWER}</Text>
              </Content>
              <ListItem noIndent onPress={this._worldwideToggle} style={styles.settingRow}>
                <CheckBox checked={this.state.worldwide_only} color={'green'} />
                <Text style={styles.textButton}>Worldwide only</Text>
              </ListItem>
              <Text style={styles.versionText}>
                Powered by <Text onPress={() => openLink(Config.SCHOOLIDO)}
                  style={{ textDecorationLine: 'underline' }}>
                  {`School Idol Tomodachi`}
                </Text>
              </Text>
              <Button full light iconRight onPress={() => openLink(Config.GITHUB_PROJECT)}>
                <Text uppercase={false}>Project on</Text>
                <Icon name={'logo-github'} />
              </Button>
            </Container>}
          </Container>

          <Footer style={styles.footer}>
            <Text uppercase={false} onPress={this._visibleToggle}
              style={styles.versionText}>
              {`Version ${VersionNumber.appVersion}`}
            </Text>
          </Footer>
        </ImageBackground>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  randomCard: getRandomCard(state),
  bgImage: getBGImage(state)
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
