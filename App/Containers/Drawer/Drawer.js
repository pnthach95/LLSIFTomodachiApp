import React, { Component } from 'react'
import { View, Text, Linking } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class Drawer extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Source code:</Text>
          <Text
            onPress={() => Linking.openURL('https://github.com/pnthach95/LLSIFTomodachiApp')}>
            https://github.com/pnthach95/LLSIFTomodachiApp
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}
