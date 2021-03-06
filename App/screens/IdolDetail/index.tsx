import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import LoadingScreen from '../Loading';
import ScrollViewWithBackButton from '~/Components/scrollviewwithbackbutton';
import InfoLine from '~/Components/InfoLine';
import LLSIFService from '~/Services/LLSIFService';
import { findColorByAttribute, AddHTTPS } from '~/Utils';
import { Metrics, AppStyles, Images, Fonts } from '~/Theme';

import type {
  CardSearchParams,
  IdolDetailScreenProps,
  IdolObject,
} from '~/typings';

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object.
 *
 * [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 */
const IdolDetailScreen = ({ route }: IdolDetailScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [item, setItem] = useState<IdolObject | null>(null);
  const [idolColors, setIdolColors] = useState<string[]>([]);

  useEffect(() => {
    void loadItem();
  }, []);

  const loadItem = async () => {
    const { name } = route.params;
    const params: CardSearchParams = {
      page: 1,
      search: name,
      page_size: 1,
    };
    try {
      const res1 = await LLSIFService.fetchIdol(name);
      if (res1) {
        setItem(res1);
        setIdolColors(findColorByAttribute(res1.attribute || 'All'));
        const res2 = await LLSIFService.fetchCardList(params);
        if (Array.isArray(res2)) {
          if (res2.length === 0) {
            params.name = res1.name;
            params.japanese_name = '';
            const res3 = await LLSIFService.fetchCardList(params);
            if (Array.isArray(res3)) {
              setImages([
                res3[0].transparent_image || '',
                res3[0].transparent_idolized_image || '',
              ]);
            }
          } else {
            setImages([
              res2[0].transparent_image || '',
              res2[0].transparent_idolized_image || '',
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

  return (
    <ScrollViewWithBackButton>
      {isLoading ? (
        <LoadingScreen />
      ) : item ? (
        <>
          <View style={styles.scrollView}>
            <Text
              style={[
                Fonts.style.bigTitle,
                { color: idolColors[0] || colors.text },
              ]}>
              {route.params.name}
            </Text>
            {item?.japanese_name && (
              <Text
                style={[
                  Fonts.style.smallTitle,
                  { color: idolColors[0] || colors.text },
                ]}>
                {item.japanese_name}
              </Text>
            )}
            {item && (
              <View style={AppStyles.row}>
                {!!item.main_unit && (
                  <FastImage
                    source={Images.multi[item.main_unit]}
                    resizeMode='contain'
                    style={AppStyles.unitIcon}
                  />
                )}
                {!!item.sub_unit && (
                  <FastImage
                    source={Images.subUnit[item.sub_unit]}
                    resizeMode='contain'
                    style={AppStyles.unitIcon}
                  />
                )}
              </View>
            )}
          </View>
          {Object.keys(Images.characters).includes(route.params.name) && (
            <FastImage
              source={
                Images.characters[
                  route.params.name as keyof typeof Images.characters
                ]
              }
              style={styles.character}
            />
          )}
          <View style={styles.imageRow}>
            {!!images[0] && images[0].includes('.png') && (
              <FastImage
                source={{
                  uri: AddHTTPS(images[0]),
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5,
                }}
              />
            )}
            {!!images[1] && images[1].includes('.png') && (
              <FastImage
                source={{
                  uri: AddHTTPS(images[1]),
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5,
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
        </>
      ) : (
        <Text>Error</Text>
      )}
    </ScrollViewWithBackButton>
  );
};

const styles = StyleSheet.create({
  character: {
    height: 100,
    position: 'absolute',
    right: 5,
    top: 120,
    width: 100,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollView: {
    marginHorizontal: Metrics.doubleBaseMargin,
  },
});

export default IdolDetailScreen;
