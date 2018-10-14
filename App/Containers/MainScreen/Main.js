import React from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import CachedDataActions from 'App/Stores/CachedData/Actions'
import { AddHTTPS } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme'
import styles from './styles'

class MainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgWidth: 0,
      imgHeight: 0
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='home' size={25} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  parseEventData(data) {
    return {
      image: AddHTTPS(data.get('image')),
      name: data.get('japanese_name')
    }
  }

  componentDidMount() {
    this.props.fetchCachedData()
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  render() {
    if (this.props.cachedDataIsLoading) return <SplashScreen bgColor={Colors.pink} />
    else {
      let data = this.props.cachedData
      let currentContests = data.get('current_contests')
      let eventEN = this.parseEventData(data.get('current_event_en'))
      let eventJP = this.parseEventData(data.get('current_event_jp'))

      return (
        <View style={styles.container}>
          <View style={ApplicationStyles.header}>
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          </View>

          <View style={styles.body}>
            <Text style={styles.text}>{eventEN.name}</Text>
            <FastImage
              source={{ uri: eventEN.image }}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }}
              onLoad={e => this.onLoadFastImage(e)} />

            <Text style={styles.text}>{eventJP.name}</Text>
            <FastImage
              source={{ uri: eventJP.image }}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }}
              onLoad={e => this.onLoadFastImage(e)} />

            {currentContests.map((item, id) => (
              <View key={'contest' + id}>
                <Text style={styles.text}>{item.get('name')}</Text>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: AddHTTPS(item.get('image')) }}
                  style={{
                    width: Metrics.widthBanner,
                    height: Metrics.widthBanner / 3
                  }} />
              </View>
            ))}
          </View>
        </View>)
    }
  }
}

const mapStateToProps = (state) => ({
  cachedData: state.cachedData.get('cachedData'),
  cachedDataErrorMessage: state.cachedData.get('cachedDataErrorMessage'),
  cachedDataIsLoading: state.cachedData.get('cachedDataIsLoading'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCachedData: () => dispatch(CachedDataActions.fetchCachedData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
