import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { getMaxStats } from '../../Stores/CachedData/Selectors'
import Seperator from '../../Components/Seperator/Seperator'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import SquareButton from '../../Components/SquareButton/SquareButton'
import TextRow from '../../Components/TextRow/TextRow'
import SplashScreen from '../SplashScreen/SplashScreen'
import { findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit } from '../../Utils'
import { Metrics, Fonts, ApplicationStyles, Colors, Images } from '../../Theme'
import styles from './styles'

class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.navigation.getParam('item'),
      imgWidth: 0,
      imgHeight: 0,
      colors: [],
      isLoading: true,
      maxStats: null,
      minStats: [],
      nonIdolMaxStats: [],
      idolMaxStats: [],
      currentStats: [],
      buttonID: 0
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen />
    else
      return (
        <View style={styles.container}>
          <View style={[
            ApplicationStyles.header,
            styles.header,
            // { backgroundColor: this.state.colors[1] }
          ]}>
            <View style={styles.leftHeader}>
              <SquareButton name={'ios-arrow-back'} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={styles.centerHeader}>
              {/* <Text style={Fonts.style.normal}>{this.state.item.idol.name}</Text> */}
            </View>
            <View style={styles.rightHeader}>
              {/* <Image source={findMainUnit(this.state.item.idol.main_unit)}
                style={styles.rightHeaderImage} />
              <Image source={findSubUnit(this.state.item.idol.sub_unit)}
                style={styles.rightHeaderImage} /> */}
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <Text>{this.props.event}</Text>
          </ScrollView>
        </View>
      )
  }
}

const mapStateToProps = (state) => ({
  maxStats: getMaxStats(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailScreen)
