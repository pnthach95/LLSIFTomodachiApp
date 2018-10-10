import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import ExampleScreen from 'App/Containers/Example/ExampleScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import MainScreen from 'App/Containers/MainScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'

const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: MainScreen,
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  }
)

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    // this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNav
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
