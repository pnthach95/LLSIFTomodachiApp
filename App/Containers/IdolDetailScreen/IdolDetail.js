import React from 'react'
import { Text, View, ScrollView, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'

import Seperator from '../../Components/Seperator/Seperator'
import SquareButton from '../../Components/SquareButton/SquareButton'
import TextRow from '../../Components/TextRow/TextRow'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit } from '../../Utils'
import { Metrics, ApplicationStyles, Colors } from '../../Theme'
import styles from './styles'

const column1 = 3
const column2 = 4

/**
 * Idol Detail Screen
 * 
 * From parent screen, pass `name` to get Idol object
 * 
 * State:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 * - `images`: Image array
 * - `isLoading`: Loading state
 * 
 * @class IdolDetailScreen
 * @extends {React.Component}
 */
class IdolDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      imgWidth: 0,
      imgHeight: 0,
      colors: [],
      images: [],
      isLoading: true
    }
  }

  componentDidMount() {
    let name = this.props.navigation.getParam('name')
    LLSIFService.fetchIdol(name).then(res1 => {
      let _filter = {
        search: name,
        page_size: 1
      }
      console.log('IdolDetails', res1)
      LLSIFService.fetchCardList(_filter).then(res2 => {
        if (res2.length == 0) {
          _filter.name = res1.name
          _filter.japanese_name = ''
          LLSIFService.fetchCardList(_filter).then(res3 => {
            this.setState({
              isLoading: false,
              colors: findColorByAttribute(res1.attribute),
              item: res1,
              images: [res3[0].transparent_image, res3[0].transparent_idolized_image]
            })
          })
        } else {
          this.setState({
            isLoading: false,
            colors: findColorByAttribute(res1.attribute),
            item: res1,
            images: [res2[0].transparent_image, res2[0].transparent_idolized_image]
          })
        }
      })
    })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.blue} />
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[
          ApplicationStyles.header,
          styles.header,
          { backgroundColor: this.state.colors[1] }
        ]}>
          <View style={styles.leftHeader}>
            <SquareButton name={'ios-arrow-back'} onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.centerHeader}>
            <Text>{this.state.item.name}</Text>
            {this.state.item.japanese_name !== null && <Text>{this.state.item.japanese_name}</Text>}
          </View>
          <View style={styles.rightHeader}>
            <Image source={findMainUnit(this.state.item.main_unit)}
              style={styles.rightHeaderImage} />
            <Image source={findSubUnit(this.state.item.sub_unit)}
              style={styles.rightHeaderImage} />
          </View>
        </View>

        {/* INFORMATION */}
        <LinearGradient style={{ flex: 1 }}
          colors={[this.state.colors[1], this.state.colors[0]]} >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageRow}>
              {(this.state.images[0] && this.state.images[0].includes('.png')) &&
                <FastImage
                  source={{
                    uri: AddHTTPS(this.state.images[0]),
                    priority: FastImage.priority.high
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: Metrics.images.itemWidth * 1.5,
                    height: Metrics.images.itemWidth * 1.5
                  }}
                />}
              <FastImage
                source={{
                  uri: AddHTTPS(this.state.images[1]),
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5
                }}
              />
            </View>
            <View style={{ paddingHorizontal: Metrics.doubleBaseMargin }}>
              {this.state.item.school !== null &&
                <View>
                  <TextRow
                    item1={{ flex: column1, text: 'School' }}
                    item2={{ flex: column2, text: this.state.item.school }} />
                  <Seperator />
                </View>}

              <TextRow
                item1={{ flex: column1, text: 'Attribute' }}
                item2={{ flex: column2, text: this.state.item.attribute }} />

              {this.state.item.birthday !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Birthday' }}
                    item2={{ flex: column2, text: moment(this.state.item.birthday, 'MM-DD').format('MMM Do') }} />
                </View>}

              {this.state.item.main_unit !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Main Unit' }}
                    item2={{ flex: column2, text: this.state.item.main_unit }} />
                </View>}

              {this.state.item.sub_unit !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Sub Unit' }}
                    item2={{ flex: column2, text: this.state.item.sub_unit }} />
                </View>}

              {this.state.item.astrological_sign !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Astrological Sign' }}
                    item2={{ flex: column2, text: this.state.item.astrological_sign }} />
                </View>}

              {this.state.item.blood !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Blood Type' }}
                    item2={{ flex: column2, text: this.state.item.blood }} />
                </View>}

              {this.state.item.height !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Height' }}
                    item2={{ flex: column2, text: this.state.item.height }} />
                </View>}

              {this.state.item.measurements !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Measurements' }}
                    item2={{ flex: column2, text: this.state.item.measurements }} />
                </View>}

              {this.state.item.favorite_food !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Favorite Food' }}
                    item2={{ flex: column2, text: this.state.item.favorite_food }} />
                </View>}

              {this.state.item.least_favorite_food !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Least Favorite Food' }}
                    item2={{ flex: column2, text: this.state.item.least_favorite_food }} />
                </View>}

              {this.state.item.hobbies !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Hobbies' }}
                    item2={{ flex: column2, text: this.state.item.hobbies }} />
                </View>}

              {this.state.item.year &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Year' }}
                    item2={{ flex: column2, text: this.state.item.year }} />
                </View>}

              {this.state.item.cv !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'CV' }}
                    item2={{ flex: column2, text: this.state.item.cv.name + ' (' + this.state.item.cv.nickname + ')' }} />
                  {this.state.item.cv.twitter &&
                    <TextRow
                      item1={{ flex: column1, text: '' }}
                      item2={{
                        flex: column2,
                        text: 'Twitter: ' + this.state.item.cv.twitter,
                        onPress: () => Linking.openURL('https://twitter.com/' + this.state.item.cv.twitter),
                        textStyle: { textDecorationLine: 'underline' }
                      }} />}
                  {this.state.item.cv.instagram &&
                    <TextRow
                      item1={{ flex: column1, text: '' }}
                      item2={{
                        flex: column2,
                        text: 'Instagram: ' + this.state.item.cv.instagram,
                        onPress: () => Linking.openURL('https://www.instagram.com/' + this.state.item.cv.instagram),
                        textStyle: { textDecorationLine: 'underline' }
                      }} />}
                  <TextRow
                    item1={{ flex: column1, text: '' }}
                    item2={{
                      flex: column2, text: this.state.item.cv.url,
                      onPress: () => Linking.openURL(this.state.item.cv.url),
                      textStyle: { textDecorationLine: 'underline' }
                    }} />
                </View>}

              {this.state.item.summary !== null &&
                <View>
                  <Seperator />
                  <TextRow
                    item1={{ flex: column1, text: 'Summary' }}
                    item2={{ flex: column2, text: this.state.item.summary }} />
                </View>}
            </View>
            <View style={{ height: Metrics.doubleBaseMargin }} />
          </ScrollView>
        </LinearGradient >
      </View >
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(IdolDetailScreen)
