import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

import LoadingScreen from '../Loading';
import InfoLine from '~/Components/InfoLine';
import LLSIFService from '~/Services/LLSIFService';
import { findColorByAttribute, AddHTTPS, setStatusBar } from '~/Utils';
import { Metrics, AppStyles, Images } from '~/Theme';
import type { IdolDetailScreenProps, IdolObject } from '~/Utils/types';

type FilterOptions = {
  search: string;
  page_size: number;
  name: string;
  japanese_name: string;
};

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object.
 *
 * [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 */
const IdolDetailScreen: React.FC<IdolDetailScreenProps> = ({
  route,
  navigation
}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [item, setItem] = useState<IdolObject | null>(null);
  const [idolColors, setIdolColors] = useState<string[]>([]);

  useEffect(() => {
    setStatusBar(colors.card);
    void loadItem();
    return () => setStatusBar(route.params.prevStatusBarColor);
  }, []);

  useEffect(() => {
    if (idolColors.length > 0) {
      setStatusBar(idolColors[1]);
    }
  }, [idolColors]);

  const loadItem = async () => {
    const { name } = route.params;
    const theFilter: Partial<FilterOptions> = {
      search: name,
      page_size: 1
    };
    try {
      const res1 = await LLSIFService.fetchIdol(name);
      if (res1) {
        setItem(res1);
        setIdolColors(findColorByAttribute(res1.attribute || 'All'));
        const res2 = await LLSIFService.fetchCardList(theFilter);
        if (Array.isArray(res2)) {
          if (res2.length === 0) {
            theFilter.name = res1.name;
            theFilter.japanese_name = '';
            const res3 = await LLSIFService.fetchCardList(theFilter);
            if (Array.isArray(res3)) {
              setImages([
                res3[0].transparent_image || '',
                res3[0].transparent_idolized_image || ''
              ]);
            }
          } else {
            setImages([
              res2[0].transparent_image || '',
              res2[0].transparent_idolized_image || ''
            ]);
          }
        }
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      <Appbar.Header style={{ backgroundColor: idolColors[1] }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content
          title={route.params.name}
          subtitle={item?.japanese_name}
        />
        {item && (
          <View style={AppStyles.row}>
            {!!item.main_unit && (
              <FastImage
                source={Images.mainUnit[item.main_unit]}
                resizeMode='contain'
                style={styles.rightHeaderImage}
              />
            )}
            {!!item.sub_unit && (
              <FastImage
                source={Images.subUnit[item.sub_unit]}
                resizeMode='contain'
                style={styles.rightHeaderImage}
              />
            )}
          </View>
        )}
      </Appbar.Header>
      {isLoading ? (
        <LoadingScreen />
      ) : item ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageRow}>
            {!!images[0] && images[0].includes('.png') && (
              <FastImage
                source={{
                  uri: AddHTTPS(images[0]),
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5
                }}
              />
            )}
            {!!images[1] && images[1].includes('.png') && (
              <FastImage
                source={{
                  uri: AddHTTPS(images[1]),
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5
                }}
              />
            )}
          </View>
          <View style={styles.scrollView}>
            {!!item.school && (
              <InfoLine title={'School'} content={item.school} />
            )}
            {!!item.attribute && (
              <InfoLine title={'Attribute'} content={item.attribute} />
            )}
            {!!item.birthday && (
              <InfoLine
                title={'Birthday'}
                content={dayjs(item.birthday, 'MM-DD').format('MMMM DD')}
              />
            )}
            {!!item.astrological_sign && (
              <InfoLine
                title={'Astrological Sign'}
                content={item.astrological_sign}
              />
            )}
            {!!item.blood && (
              <InfoLine title={'Blood Type'} content={item.blood} />
            )}
            {!!item.height && (
              <InfoLine title={'Height'} content={`${item.height} cm`} />
            )}
            {!!item.measurements && (
              <InfoLine title={'Measurements'} content={item.measurements} />
            )}
            {!!item.favorite_food && (
              <InfoLine title={'Favorite Food'} content={item.favorite_food} />
            )}
            {!!item.least_favorite_food && (
              <InfoLine
                title={'Least Favorite Food'}
                content={item.least_favorite_food}
              />
            )}
            {!!item.hobbies && (
              <InfoLine title={'Hobbies'} content={item.hobbies} />
            )}
            {item.year && <InfoLine title={'Year'} content={item.year} />}
            {!!item.cv && (
              <InfoLine
                title={'CV'}
                content={`${item.cv.name} (${item.cv.nickname})`}
                twitter={item.cv.twitter}
                instagram={item.cv.instagram}
                myanimelist={item.cv.url}
              />
            )}
            {!!item.summary && (
              <InfoLine title={'Summary'} content={item.summary} />
            )}
          </View>
        </ScrollView>
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rightHeaderImage: {
    height: 40,
    width: 70
  },
  scrollView: {
    margin: Metrics.doubleBaseMargin
  }
});

IdolDetailScreen.propTypes = {
  route: PropTypes.any
};

export default IdolDetailScreen;
