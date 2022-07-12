import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, useTheme} from 'react-native-paper';
import InfoLine from '~/Components/InfoLine';
import ScrollViewWithBackButton from '~/Components/scrollviewwithbackbutton';
import LLSIFService from '~/Services/LLSIFService';
import {AppStyles, Fonts, Images, Metrics} from '~/Theme';
import {AddHTTPS, findColorByAttribute} from '~/Utils';
import type {RootStackScreenProps} from '~/typings/navigation';
import LoadingScreen from '../Loading';

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object.
 *
 * [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 */
const IdolDetailScreen = ({
  route,
}: RootStackScreenProps<'IdolDetailScreen'>) => {
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [item, setItem] = useState<IdolObject | null>(null);
  const [idolColors, setIdolColors] = useState<string[]>([]);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const {name} = route.params;
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
                {color: idolColors[0] || colors.text},
              ]}>
              {route.params.name}
            </Text>
            {item?.japanese_name && (
              <Text
                style={[
                  Fonts.style.smallTitle,
                  {color: idolColors[0] || colors.text},
                ]}>
                {item.japanese_name}
              </Text>
            )}
            {item && (
              <View style={AppStyles.row}>
                {!!item.main_unit && (
                  <FastImage
                    resizeMode="contain"
                    source={Images.multi[item.main_unit]}
                    style={AppStyles.unitIcon}
                  />
                )}
                {!!item.sub_unit && (
                  <FastImage
                    resizeMode="contain"
                    source={Images.subUnit[item.sub_unit]}
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
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: AddHTTPS(images[0]),
                  priority: FastImage.priority.high,
                }}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5,
                }}
              />
            )}
            {!!images[1] && images[1].includes('.png') && (
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: AddHTTPS(images[1]),
                  priority: FastImage.priority.high,
                }}
                style={{
                  width: Metrics.images.itemWidth * 1.5,
                  height: Metrics.images.itemWidth * 1.5,
                }}
              />
            )}
          </View>
          <View style={styles.scrollView}>
            {!!item.school && (
              <InfoLine content={item.school} title={'School'} />
            )}
            {!!item.attribute && (
              <InfoLine content={item.attribute} title={'Attribute'} />
            )}
            {!!item.birthday && (
              <InfoLine
                content={dayjs(item.birthday, 'MM-DD').format('MMMM DD')}
                title={'Birthday'}
              />
            )}
            {!!item.astrological_sign && (
              <InfoLine
                content={item.astrological_sign}
                title={'Astrological Sign'}
              />
            )}
            {!!item.blood && (
              <InfoLine content={item.blood} title={'Blood Type'} />
            )}
            {!!item.height && (
              <InfoLine content={`${item.height} cm`} title={'Height'} />
            )}
            {!!item.measurements && (
              <InfoLine content={item.measurements} title={'Measurements'} />
            )}
            {!!item.favorite_food && (
              <InfoLine content={item.favorite_food} title={'Favorite Food'} />
            )}
            {!!item.least_favorite_food && (
              <InfoLine
                content={item.least_favorite_food}
                title={'Least Favorite Food'}
              />
            )}
            {!!item.hobbies && (
              <InfoLine content={item.hobbies} title={'Hobbies'} />
            )}
            {item.year && <InfoLine content={item.year} title={'Year'} />}
            {!!item.cv && (
              <InfoLine
                content={`${item.cv.name} (${item.cv.nickname})`}
                instagram={item.cv.instagram}
                myanimelist={item.cv.url}
                title={'CV'}
                twitter={item.cv.twitter}
              />
            )}
            {!!item.summary && (
              <InfoLine content={item.summary} title={'Summary'} />
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
