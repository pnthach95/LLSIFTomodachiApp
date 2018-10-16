import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import IdolItem from '../../Components/IdolItem/Idol'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import { LLSIFService } from '../../Services/LLSIFService'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Colors } from '../../Theme'
import styles from './styles'

class IdolsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      list: []
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      focused
        ? <Icon name='ios-star' size={30} color={Colors.pink} />
        : <Icon name='ios-star-outline' size={30} color={Colors.inactive} />
    ),
    tabBarLabel: 'Idols',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    LLSIFService.fetchIdolList().then(res => {
      this.setState({ isLoading: false, list: res })
    })
  }

  _keyExtractor = (item, index) => `idol${item.name}`

  _renderItem = ({ item }) => (
    <IdolItem item={item} />//onPress={() => this.navigateToCardDetail(item)} />
  )

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.blue} />
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          numColumns={3}
          initialNumToRender={9}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolsScreen)
