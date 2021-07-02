import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TouchableRipple,
  Button,
  Text,
  ProgressBar,
  useTheme,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import dayjs from 'dayjs';
import UserContext from '~/Context/UserContext';
import ScrollViewWithBackButton from '~/Components/scrollviewwithbackbutton';
import StarBar from '~/Components/StarBar';
import TextRow from '~/Components/TextRow';
import { findColorByAttribute, AddHTTPS } from '~/Utils';
import { Metrics, AppStyles, Colors, Images, Fonts } from '~/Theme';

import type { SongDetailScreenProps } from '~/typings';

type StatButtonProps = {
  id: number;
  text: string;
  stat: [number, number[]];
};

/**
 * Song Detail Screen
 *
 * From parent screen, pass `item` (Song object) to show detail
 *
 * [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 *
 */
const SongDetailScreen = ({
  route,
  navigation,
}: SongDetailScreenProps): JSX.Element => {
  const { item } = route.params;
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const [buttonID, setButtonID] = useState(0);
  const [currentStats, setCurrentStats] = useState<StatButtonProps['stat']>([
    0,
    [],
  ]);
  const attributeColors = findColorByAttribute(item.attribute || 'All');
  const [easy, setEasy] = useState<StatButtonProps['stat']>([0, []]);
  const [normal, setNormal] = useState<StatButtonProps['stat']>([0, []]);
  const [hard, setHard] = useState<StatButtonProps['stat']>([0, []]);
  const [expert, setExpert] = useState<StatButtonProps['stat']>([0, []]);
  const [random, setRandom] = useState<StatButtonProps['stat']>([0, []]);
  const [master, setMaster] = useState<StatButtonProps['stat']>([0, []]);

  useEffect(() => {
    const easyArray = [];
    for (let i = 0; i < item.easy_difficulty; i += 1) {
      easyArray.push(setColor(i));
    }
    setEasy([item.easy_notes, easyArray]);
    const normalArray = [];
    for (let i = 0; i < item.normal_difficulty; i += 1) {
      normalArray.push(setColor(i));
    }
    setNormal([item.normal_notes, normalArray]);
    const hardArray = [];
    for (let i = 0; i < item.hard_difficulty; i += 1) {
      hardArray.push(setColor(i));
    }
    setHard([item.hard_notes, hardArray]);
    const expertArray = [];
    for (let i = 0; i < item.expert_difficulty; i += 1) {
      expertArray.push(setColor(i));
    }
    setExpert([item.expert_notes, expertArray]);
    const expertRandomArray = [];
    if (item.expert_random_difficulty) {
      for (let i = 0; i < item.expert_random_difficulty; i += 1) {
        expertRandomArray.push(setColor(i));
      }
    }
    setRandom([item.expert_notes, expertRandomArray]);
    const masterArray = [];
    if (item.master_difficulty) {
      for (let i = 0; i < item.master_difficulty; i += 1) {
        masterArray.push(setColor(i));
      }
    }
    setMaster([item.master_notes || 0, masterArray]);
    setCurrentStats([item.easy_notes, easyArray]);
  }, []);

  /** Set color for star */
  const setColor = (index: number): number => {
    if (index < 3) return 0;
    if (index < 6) return 1;
    if (index < 9) return 2;
    if (index === 9) return 3;
    if (index === 10) return 4;
    return 5;
  };

  /** Convert seconds to m:ss */
  const formatTime = (time: number): string => {
    const duration = dayjs.duration(time, 's');
    return `${duration.minutes()}:${duration.seconds()}`;
  };

  /** Navigate to Event Detail Screen */
  const navigateToEventDetail = () => {
    if (item.event?.japanese_name) {
      navigation.navigate('EventDetailScreen', {
        eventName: item.event?.japanese_name,
        prevStatusBarColor: attributeColors[0],
      });
    }
  };

  /** Render choosing stat button */
  const StatButton = ({ id, text, stat }: StatButtonProps) => {
    const onPress = () => {
      setButtonID(id);
      setCurrentStats(stat);
    };
    return (
      <Button
        mode='contained'
        color={buttonID === id ? attributeColors[0] : Colors.inactive}
        style={styles.button}
        onPress={onPress}>
        {text}
      </Button>
    );
  };

  return (
    <ScrollViewWithBackButton>
      <View style={styles.scrollViewContainer}>
        <Text
          style={[
            Fonts.style.center,
            Fonts.style.bigTitle,
            { color: attributeColors[0] || colors.text },
          ]}>
          {item.name}
        </Text>
        {item.romaji_name && (
          <Text
            style={[
              Fonts.style.center,
              Fonts.style.smallTitle,
              { color: attributeColors[0] || colors.text },
            ]}>
            {item.romaji_name}
          </Text>
        )}
        {!!item.main_unit && (
          <FastImage
            source={Images.multi[item.main_unit]}
            resizeMode='contain'
            style={AppStyles.unitIcon}
          />
        )}
        <FastImage
          source={{ uri: AddHTTPS(item.image) }}
          resizeMode='contain'
          style={styles.image}
        />
        <View style={styles.height10} />

        <TextRow
          item1={{ text: 'Attribute', flex: 1 }}
          item2={{ text: item.attribute, flex: 1 }}
        />
        {!!item.rank && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Unlock', flex: 1 }}
              item2={{ text: item.rank, flex: 1 }}
            />
          </View>
        )}
        {!!item.BPM && (
          <TextRow
            item1={{ text: 'Beats per minute', flex: 1 }}
            item2={{ text: item.BPM, flex: 1 }}
          />
        )}
        <TextRow
          item1={{ text: 'Length', flex: 1 }}
          item2={{ text: formatTime(item.time), flex: 1 }}
        />
        {item.event && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Event', flex: 1 }}
              item2={{ text: item.event.japanese_name, flex: 1 }}
            />
            {!!item.event.english_name && (
              <TextRow
                item1={{ text: '', flex: 1 }}
                item2={{ text: item.event.english_name, flex: 1 }}
              />
            )}
            <TouchableRipple
              onPress={navigateToEventDetail}
              style={styles.eventButton}>
              <FastImage
                source={{ uri: AddHTTPS(item.event.image) }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.eventImage}
              />
            </TouchableRipple>
          </View>
        )}
        {!!item.daily_rotation && !!item.daily_rotation_position && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Daily rotation', flex: 1 }}
              item2={{
                text: `${item.daily_rotation} - ${item.daily_rotation_position}`,
                flex: 1,
              }}
            />
          </View>
        )}
        <TextRow
          item1={{ text: 'Currently available', flex: 1 }}
          item2={{ text: item.available ? 'Yes' : 'No', flex: 1 }}
        />
        <View style={styles.buttonRow}>
          <StatButton id={0} text='Easy' stat={easy} />
          <StatButton id={1} text='Normal' stat={normal} />
          <StatButton id={2} text='Hard' stat={hard} />
          <StatButton id={3} text='Expert' stat={expert} />
          {random[1].length !== 0 && (
            <StatButton id={4} text='Random' stat={random} />
          )}
          {master[0] > 0 && <StatButton id={5} text='Master' stat={master} />}
        </View>
        {currentStats[0] > 0 && (
          <View style={styles.stretch}>
            <Text>{currentStats[0]} notes</Text>
            <ProgressBar
              color={attributeColors[0]}
              progress={currentStats[0] / state.cachedData.songsMaxStats}
            />
          </View>
        )}
        <StarBar array={currentStats[1]} />
      </View>
    </ScrollViewWithBackButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: Metrics.smallMargin,
  },
  buttonRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin,
  },
  event: {
    alignItems: 'center',
  },
  eventButton: {
    alignSelf: 'flex-end',
    paddingRight: Metrics.baseMargin,
  },
  eventImage: {
    height: responsiveWidth(20),
    marginVertical: 10,
    width: responsiveWidth(66),
  },
  height10: {
    height: 10,
  },
  image: {
    height: responsiveWidth(40),
    width: responsiveWidth(40),
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
  },
  stretch: { alignSelf: 'stretch' },
});

export default SongDetailScreen;
