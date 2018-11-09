import React, { Component } from 'react'
import { View, Text, Linking } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import VersionNumber from 'react-native-version-number'

/**
 * Left Drawer show some information
 *
 * @export
 * @class Drawer
 * @extends {Component}
 */
export default class Drawer extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ flexDirection: 'column-reverse' }}>
          <Icon name={'logo-github'} size={50}
            onPress={() => Linking.openURL('https://github.com/pnthach95/LLSIFTomodachiApp')} />
          <Text style={{ textAlign: 'center' }}>Version {VersionNumber.appVersion}</Text>
        </View>
      </SafeAreaView>
    )
  }
}
