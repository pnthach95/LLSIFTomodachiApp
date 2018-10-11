import React from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import { AddHTTPS } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import styles from './styles'

const widthBanner = Metrics.screenWidth - 40

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContests: null,
      eventEN: null,
      eventJP: null,
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
    var data = this.props.cachedData
    var dataEN = data.get('current_event_en')
    var dataContests = data.get('current_contests')
    var dataJP = data.get('current_event_jp')
    this.setState({
      currentContests: dataContests,
      eventEN: this.parseEventData(dataEN),
      eventJP: this.parseEventData(dataJP)
    })
  }

  render() {
    if (this.props.cachedDataIsLoading) return (<SplashScreen bgColor={Colors.pink} />)
    else {
      return (
        <View style={styles.container}>
          <View style={ApplicationStyles.header}>
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>{this.state.eventEN.name}</Text>
            <FastImage
              source={{ uri: this.state.eventEN.image }}
              style={{ width: widthBanner, height: widthBanner * this.state.imgHeight / this.state.imgWidth }}
              onLoad={(e) => {
                console.log(e.nativeEvent.width, e.nativeEvent.height);
                const { width, height } = e.nativeEvent
                this.setState({ imgWidth: width, imgHeight: height })
              }} />
            <Text style={styles.text}>{this.state.eventJP.name}</Text>
            <FastImage
              source={{ uri: this.state.eventJP.image }}
              style={{ width: widthBanner, height: widthBanner * this.state.imgHeight / this.state.imgWidth }}
              onLoad={(e) => {
                console.log(e.nativeEvent.width, e.nativeEvent.height);
                const { width, height } = e.nativeEvent
                this.setState({ imgWidth: width, imgHeight: height })
              }} />
            {this.state.currentContests.map((item, id) => (
              <View key={'contest' + id}>
                <Text style={styles.text}>{item.get('name')}</Text>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{ uri: AddHTTPS(item.get('image')) }}
                  style={{ width: widthBanner, height: widthBanner / 3 }} />
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
