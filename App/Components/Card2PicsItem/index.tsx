import React, { useEffect, useState } from 'react';
import { TouchableNativeFeedback, View, Image, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Seperator from '../Seperator/Seperator';
import Touchable from '../Touchable/Touchable';
import { Metrics, ApplicationStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';
import type { attributes } from '~/Utils/type';

type Card2PicsItemType = {
  item: {
    attribute: attributes;
    card_image: string;
    card_idolized_image: string | null;
    skill?: string;
    event?: object;
    japan_only: boolean;
    is_promo: boolean;
    is_special: boolean;
  };
  onPress: () => {};
};

/**
 * Card item for Card List Screen, idolized and unidolized
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 *
 */
const Card2PicsItem: React.FC<Card2PicsItemType> = ({ item, onPress }) => {
  const [state, setState] = useState<{ imgWidth: number; imgHeight: number; images: string[], colors: string[]; }>({
    imgWidth: 1,
    imgHeight: 0,
    images: [],
    colors: findColorByAttribute(item.attribute),
  });

  useEffect(() => {
    const tmp = [];
    if (item.card_image !== null) tmp.push(AddHTTPS(item.card_image));
    if (item.card_idolized_image !== null) tmp.push(AddHTTPS(item.card_idolized_image));
    setState({
      imgWidth: 1,
      imgHeight: 0,
      images: tmp,
      colors: findColorByAttribute(item.attribute),
    });
  }, []);

  const styleSeperator = {
    backgroundColor: state.colors[0],
    marginVertical: 0,
  };
  return <Surface style={[styles.container, { backgroundColor: state.colors[1] }]}>
    <Touchable onPress={onPress} useForeground
      background={TouchableNativeFeedback.Ripple(state.colors[0], false)}>
      <View style={styles.row}>
        {state.images.map((value, index) => <FastImage key={index}
          source={{ uri: value }}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent;
            setState({ ...state, imgWidth: width, imgHeight: height });
          }}
          resizeMode='contain'
          style={{
            width: Metrics.images.itemWidth,
            height: (Metrics.images.itemWidth * state.imgHeight) / state.imgWidth,
          }} />)}
      </View>
      {/* FOOTER */}
      <Seperator style={styleSeperator} />
      <View style={[styles.info, { backgroundColor: state.colors[1] }]}>
        <View style={ApplicationStyles.screen} />
        <View style={[styles.infoRight, ApplicationStyles.screen]}>
          {(!!item.skill) && <Image source={findSkill(item.skill)}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: state.colors[0] },
            ]} />}

          <Image source={item.japan_only ? Images.region[0] : Images.region[1]}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: state.colors[0] },
            ]} />

          {item.is_promo && <Image source={Images.promo}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: state.colors[0] },
            ]} />}

          {item.is_special && <Image source={Images.skill[3]}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: state.colors[0] },
            ]} />}

          {item.event !== null && <Image source={Images.event}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: state.colors[0] },
            ]} />}
        </View>
      </View>
    </Touchable>
  </Surface>;
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 4,
    margin: Metrics.smallMargin,
    width: Metrics.screenWidth - Metrics.smallMargin * 4,
  },
  info: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
  },
  infoRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Card2PicsItem;
