import React from 'react'
import { View, Text, SectionList, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import IdolItem from '../../Components/IdolItem/Idol'
import { LLSIFService } from '../../Services/LLSIFService'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Colors } from '../../Theme'
import styles from './styles'
import Seperator from '../../Components/Seperator/Seperator';

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
      let schools = this.props.schools
      var array = []
      for (let school of schools) {
        let item = {
          title: school,
          data: [
            {
              key: school,
              list: res.filter(value => {
                return value.school == school
              })
            }]
        }
        array.push(item)
      }
      let item = {
        title: 'Other',
        data: [
          {
            key: 'Other',
            list: res.filter(value => {
              return value.school == null
            })
          }]
      }
      array.push(item)
      this.setState({ isLoading: false, list: array })
    })
  }

  navigateToIdolDetail(name) {
    this.props.navigation.navigate('IdolDetailScreen', { name: name })
  }

  _keyExtractor = (item, index) => `idol${item.name}`

  _renderItem = ({ item }) => (
    <IdolItem item={item} onPress={() => this.navigateToIdolDetail(item.name)} />
  )

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.blue} />
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.list}
          initialNumToRender={9}
          keyExtractor={(item, index) => 'School' + index}
          style={styles.list}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{title}</Text>
          )}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ height: 10 }} />}
          SectionSeparatorComponent={data => {
            if (data.leadingItem && data.leadingItem.key == 'Other') return null
            return <Seperator style={{ backgroundColor: 'white', marginBottom: data.leadingItem ? 20 : 0 }} />
          }}
          renderItem={({ item, index, section }) => <FlatList
            numColumns={3}
            data={item.list}
            initialNumToRender={9}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  schools: state.cachedData.get('cachedData').get('cards_info').get('schools')
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolsScreen)
