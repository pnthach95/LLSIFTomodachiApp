import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, ScrollView, Image,
} from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import SplashScreen from '../SplashScreen/SplashScreen';
import InfoLine from '~/Components/InfoLine/InfoLine';
import LLSIFService from '~/Services/LLSIFService';
import SquareButton from '~/Components/SquareButton/SquareButton';
import {
  findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit,
} from '~/Utils';
import { Metrics, ApplicationStyles, Colors } from '~/Theme';
import styles from './styles';

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object
 *
 * State:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `colors`: Color array
 * - `images`: Image array
 * - `isLoading`: Loading state
 *
 */
function IdolDetailScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [item, setItem] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const { name } = route.params;
    const theFilter = {
      search: name,
      page_size: 1,
    };
    try {
      const res1 = await LLSIFService.fetchIdol(name);
      setItem(res1);
      setColors(findColorByAttribute(res1.attribute));
      const res2 = await LLSIFService.fetchCardList(theFilter);
      if (res2.length === 0) {
        theFilter.name = res1.name;
        theFilter.japanese_name = '';
        const res3 = await LLSIFService.fetchCardList(theFilter);
        setImages([res3[0].transparent_image, res3[0].transparent_idolized_image]);
      } else {
        setImages([res2[0].transparent_image, res2[0].transparent_idolized_image]);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = useCallback(() => navigation.goBack(), []);

  return <View style={ApplicationStyles.screen}>
    {/* HEADER */}
    <ElevatedView elevation={5} style={[
      ApplicationStyles.header,
      styles.header,
      { backgroundColor: isLoading ? Colors.blue : colors[1] },
    ]}>
      <View style={styles.leftHeader}>
        <SquareButton name={'ios-arrow-back'}
          onPress={goBack} />
        {!isLoading && <View>
          <Text>{item.name}</Text>
          {item.japanese_name !== null
            && <Text>{item.japanese_name}</Text>}
        </View>}
      </View>
      <View style={styles.rightHeader}>
        {!isLoading && <View style={ApplicationStyles.row}>
          <Image source={findMainUnit(item.main_unit)}
            style={styles.rightHeaderImage} />
          <Image source={findSubUnit(item.sub_unit)}
            style={styles.rightHeaderImage} />
        </View>}
      </View>
    </ElevatedView>
    <View style={ApplicationStyles.screen}>
      {isLoading ? <SplashScreen bgColor={Colors.blue} />
        : <LinearGradient style={ApplicationStyles.screen}
          colors={[colors[1], colors[0]]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageRow}>
              {(images[0] && images[0].includes('.png'))
                && <FastImage
                  source={{
                    uri: AddHTTPS(images[0]),
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: Metrics.images.itemWidth * 1.5,
                    height: Metrics.images.itemWidth * 1.5,
                  }} />}
              <FastImage
                source={{
                  uri: AddHTTPS(images[1]),
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5,
                }} />
            </View>
            <View style={styles.scrollView}>
              {item.school !== null
                && <InfoLine title={'School'}
                  content={item.school} />}
              <InfoLine title={'Attribute'}
                content={item.attribute} />
              {item.birthday !== null
                && <InfoLine title={'Birthday'}
                  content={moment(item.birthday, 'MM-DD').format('MMM Do')} />}
              {item.astrological_sign !== null
                && <InfoLine title={'Astrological Sign'}
                  content={item.astrological_sign} />}
              {item.blood !== null
                && <InfoLine title={'Blood Type'}
                  content={item.blood} />}
              {item.height !== null
                && <InfoLine title={'Height'}
                  content={`${item.height} cm`} />}
              {item.measurements !== null
                && <InfoLine title={'Measurements'}
                  content={item.measurements} />}
              {item.favorite_food !== null
                && <InfoLine title={'Favorite Food'}
                  content={item.favorite_food} />}
              {item.least_favorite_food !== null
                && <InfoLine title={'Least Favorite Food'}
                  content={item.least_favorite_food} />}
              {item.hobbies !== null
                && <InfoLine title={'Hobbies'}
                  content={item.hobbies} />}
              {item.year
                && <InfoLine title={'Year'}
                  content={item.year} />}
              {item.cv !== null
                && <InfoLine title={'CV'}
                  content={`${item.cv.name} (${item.cv.nickname})`}
                  twitter={item.cv.twitter}
                  instagram={item.cv.instagram}
                  myanimelist={item.cv.url} />}
              {item.summary !== null
                && <InfoLine title={'Summary'} content={item.summary} />}
            </View>
          </ScrollView>
        </LinearGradient>}
    </View>
  </View>;
}
IdolDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default IdolDetailScreen;
