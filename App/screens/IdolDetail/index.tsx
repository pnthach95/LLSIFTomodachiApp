import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import LoadingScreen from '../Loading';
import InfoLine from '~/Components/InfoLine';
import LLSIFService from '~/Services/LLSIFService';
import { findColorByAttribute, AddHTTPS } from '~/Utils';
import { Metrics, AppStyles, Images, Fonts } from '~/Theme';

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import type {
  CardSearchParams,
  IdolDetailScreenProps,
  IdolObject,
} from '~/typings';

const { ScrollView } = Animated;

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object.
 *
 * [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 */
const IdolDetailScreen = ({
  route,
  navigation,
}: IdolDetailScreenProps): JSX.Element => {
  const scrollAV = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [item, setItem] = useState<IdolObject | null>(null);
  const [idolColors, setIdolColors] = useState<string[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const bottom = { paddingBottom: insets.bottom, paddingTop: 30 };

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

  const goBack = () => navigation.goBack();

  const moveBackButton = scrollAV.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    if (offset > 50) {
      const dif = offset - (currentOffset || 0);
      if (Math.abs(dif) > 10) {
        if (dif < 0) {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }
      }
    } else {
      Animated.timing(scrollAV, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    setCurrentOffset(offset);
  };

  return (
    <View style={AppStyles.screen}>
      <Animated.View
        style={[
          AppStyles.back,
          { transform: [{ translateY: moveBackButton }] },
        ]}>
        <IconButton
          icon='arrow-left'
          color={colors.text}
          onPress={goBack}
          style={{ backgroundColor: colors.background }}
        />
      </Animated.View>
      {isLoading ? (
        <LoadingScreen />
      ) : item ? (
        <ScrollView
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={bottom}>
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
    justifyContent: 'space-around',
  },
  scrollView: {
    margin: Metrics.doubleBaseMargin,
  },
});

export default IdolDetailScreen;
