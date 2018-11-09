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
        <View style={{ height: '100%', backgroundColor: '#eee' }}>
          <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }}>
            <Icon name={'logo-github'} size={50}
              onPress={() => Linking.openURL('https://github.com/pnthach95/LLSIFTomodachiApp')} />
            <View style={{ padding: 10, marginTop: 10, backgroundColor: 'white', width: '100%' }}>
              <Text style={{ textAlign: 'center' }}>Version {VersionNumber.appVersion}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
