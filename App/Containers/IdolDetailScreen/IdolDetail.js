import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import SplashScreen from '../SplashScreen/SplashScreen';
import InfoLine from '../../Components/InfoLine/InfoLine';
import { LLSIFService } from '../../Services/LLSIFService';
import SquareButton from '../../Components/SquareButton/SquareButton';
import { findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit } from '../../Utils';
import { Metrics, ApplicationStyles, Colors } from '../../Theme';
import styles from './styles';

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
    super(props);
    this.state = {
      item: null,
      imgWidth: 0,
      imgHeight: 0,
      colors: [],
      images: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let name = this.props.navigation.getParam('name');
    LLSIFService.fetchIdol(name).then(res1 => {
      let _filter = {
        search: name,
        page_size: 1
      };
      // console.log('IdolDetails', res1)
      LLSIFService.fetchCardList(_filter).then(res2 => {
        if (res2.length === 0) {
          _filter.name = res1.name;
          _filter.japanese_name = '';
          LLSIFService.fetchCardList(_filter).then(res3 => {
            this.setState({
              isLoading: false,
              colors: findColorByAttribute(res1.attribute),
              item: res1,
              images: [res3[0].transparent_image, res3[0].transparent_idolized_image]
            });
          })
        } else {
          this.setState({
            isLoading: false,
            colors: findColorByAttribute(res1.attribute),
            item: res1,
            images: [res2[0].transparent_image, res2[0].transparent_idolized_image]
          });
        }
      })
    })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.blue} />;
    return (
      <View style={ApplicationStyles.screen}>
        {/* HEADER */}
        <ElevatedView elevation={5} style={[
          ApplicationStyles.header,
          styles.header,
          { backgroundColor: this.state.colors[1], zIndex: 1 }
        ]}>
          <View style={styles.leftHeader}>
            <SquareButton name={'ios-arrow-back'} onPress={() => this.props.navigation.goBack()} />
            <View>
              <Text>{this.state.item.name}</Text>
              {this.state.item.japanese_name !== null && <Text>{this.state.item.japanese_name}</Text>}
            </View>
          </View>
          <View style={styles.rightHeader}>
            <Image source={findMainUnit(this.state.item.main_unit)}
              style={styles.rightHeaderImage} />
            <Image source={findSubUnit(this.state.item.sub_unit)}
              style={styles.rightHeaderImage} />
          </View>
        </ElevatedView>

        {/* INFORMATION */}
        <LinearGradient style={ApplicationStyles.screen}
          colors={[this.state.colors[1], this.state.colors[0]]}>
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
                  }} />}
              <FastImage
                source={{
                  uri: AddHTTPS(this.state.images[1]),
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5
                }} />
            </View>
            <View style={styles.scrollView}>
              {this.state.item.school !== null &&
                <InfoLine title={'School'}
                  content={this.state.item.school} />}
              <InfoLine title={'Attribute'}
                content={this.state.item.attribute} />
              {this.state.item.birthday !== null &&
                <InfoLine title={'Birthday'}
                  content={moment(this.state.item.birthday, 'MM-DD').format('MMM Do')} />}
              {this.state.item.astrological_sign !== null &&
                <InfoLine title={'Astrological Sign'}
                  content={this.state.item.astrological_sign} />}
              {this.state.item.blood !== null &&
                <InfoLine title={'Blood Type'}
                  content={this.state.item.blood} />}
              {this.state.item.height !== null &&
                <InfoLine title={'Height'}
                  content={this.state.item.height} />}
              {this.state.item.measurements !== null &&
                <InfoLine title={'Measurements'}
                  content={this.state.item.measurements} />}
              {this.state.item.favorite_food !== null &&
                <InfoLine title={'Favorite Food'}
                  content={this.state.item.favorite_food} />}
              {this.state.item.least_favorite_food !== null &&
                <InfoLine title={'Least Favorite Food'}
                  content={this.state.item.least_favorite_food} />}
              {this.state.item.hobbies !== null &&
                <InfoLine title={'Hobbies'}
                  content={this.state.item.hobbies} />}
              {this.state.item.year &&
                <InfoLine title={'Year'}
                  content={this.state.item.year} />}
              {this.state.item.cv !== null &&
                <InfoLine title={'CV'}
                  content={`${this.state.item.cv.name} (${this.state.item.cv.nickname})`}
                  twitter={this.state.item.cv.twitter} instagram={this.state.item.cv.instagram}
                  myanimelist={this.state.item.cv.url} />}
              {this.state.item.summary !== null &&
                <InfoLine title={'Summary'} content={this.state.item.summary} />}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(IdolDetailScreen);
