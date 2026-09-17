import {Images} from 'assets';
import {Progress} from 'components/progress';
import ScrollViewWithBackButton from 'components/scrollviewwithbackbutton';
import StarBar from 'components/starbar';
import TextRow from 'components/textrow';
import {TurboImage} from 'components/uniwind';
import dayjs from 'dayjs';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import useStore from 'store';
import {AddHTTPS} from 'utils';
import type {RootStackScreenProps} from 'typings/navigation';

type SongStat = [number, number[]];
type StatButtonProps = {
  attribute: AttributeType;
  isChecked: boolean;
  text: string;
  onPress: () => void;
};

/** Set color for star */
const setColor = (index: number): number => {
  if (index < 3) {
    return 0;
  }
  if (index < 6) {
    return 1;
  }
  if (index < 9) {
    return 2;
  }
  if (index === 9) {
    return 3;
  }
  if (index === 10) {
    return 4;
  }
  return 5;
};

/** Render choosing stat button */
const StatButton = ({isChecked, text, attribute, onPress}: StatButtonProps) => {
  return (
    <Button
      className="my-2.5 bg-other-attribute data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile data-[checked=false]:bg-inactive"
      data-attribute={attribute}
      data-checked={isChecked ? 'true' : 'false'}
      onPress={onPress}>
      {text}
    </Button>
  );
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
  route: {
    params: {item},
  },
  navigation,
}: RootStackScreenProps<'SongDetailScreen'>) => {
  const {width} = useWindowDimensions();
  const cachedData = useStore(s => s.cachedData);
  const [buttonID, setButtonID] = useState(0);
  const easy: SongStat = [
    item.easy_notes,
    Array(item.easy_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const normal: SongStat = [
    item.normal_notes,
    Array(item.normal_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const hardArray = [];
  for (let i = 0; i < item.hard_difficulty; i += 1) {
    hardArray.push(setColor(i));
  }
  const hard: SongStat = [
    item.hard_notes,
    Array(item.hard_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const expert: SongStat = [
    item.expert_notes,
    Array(item.expert_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const random: SongStat = [
    item.expert_notes,
    Array(item.expert_random_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const master: SongStat = [
    item.master_notes || 0,
    Array(item.master_difficulty)
      .fill(null)
      .map((_, i) => setColor(i)),
  ];
  const [currentStats, setCurrentStats] = useState<SongStat>(easy);
  const eventImage = AddHTTPS(item.event?.image);

  /** Convert seconds to m:ss */
  const formatTime = (time: number): string => {
    const duration = dayjs.duration(time, 's');
    return duration.format('m:ss');
  };

  /** Navigate to Event Detail Screen */
  const navigateToEventDetail = () => {
    if (item.event?.japanese_name) {
      navigation.navigate('EventDetailScreen', {
        eventName: item.event?.japanese_name,
      });
    }
  };

  const image = AddHTTPS(item.image);
  return (
    <ScrollViewWithBackButton>
      <View className="items-center px-2.5">
        <Text
          className="text-center font-bold data-[attribute=Cool]:text-cool data-[attribute=Pure]:text-pure data-[attribute=Smile]:text-smile"
          data-attribute={item.attribute}>
          {item.name}
        </Text>
        {item.romaji_name && (
          <Text
            className="text-center font-bold data-[attribute=Cool]:text-cool data-[attribute=Pure]:text-pure data-[attribute=Smile]:text-smile"
            data-attribute={item.attribute}>
            {item.romaji_name}
          </Text>
        )}
        {!!item.main_unit && (
          <Image
            className="h-12.5 w-17.5"
            resizeMode="contain"
            source={Images.multi[item.main_unit]}
          />
        )}
        {image && (
          <TurboImage
            className="w-2/5"
            resizeMode="contain"
            source={{uri: image}}
            style={{height: width * 0.4}}
          />
        )}
        <View className="h-2.5" />

        <TextRow
          item1={{text: 'Attribute', flex: 1}}
          item2={{text: item.attribute, flex: 1}}
        />
        {!!item.rank && (
          <View className="items-center">
            <TextRow
              item1={{text: 'Unlock', flex: 1}}
              item2={{text: item.rank, flex: 1}}
            />
          </View>
        )}
        {!!item.BPM && (
          <TextRow
            item1={{text: 'Beats per minute', flex: 1}}
            item2={{text: item.BPM, flex: 1}}
          />
        )}
        <TextRow
          item1={{text: 'Length', flex: 1}}
          item2={{text: formatTime(item.time), flex: 1}}
        />
        {item.event && (
          <View className="items-center">
            <TextRow
              item1={{text: 'Event', flex: 1}}
              item2={{text: item.event.japanese_name, flex: 1}}
            />
            {!!item.event.english_name && (
              <TextRow
                item1={{text: '', flex: 1}}
                item2={{text: item.event.english_name, flex: 1}}
              />
            )}
            {eventImage && (
              <PressableFeedback
                className="self-end pr-2.5"
                onPress={navigateToEventDetail}>
                <TurboImage
                  className="my-2.5 w-2/3"
                  resizeMode="contain"
                  source={{uri: eventImage}}
                  style={{height: width * 0.2}}
                />
              </PressableFeedback>
            )}
          </View>
        )}
        {!!item.daily_rotation && !!item.daily_rotation_position && (
          <View className="items-center">
            <TextRow
              item1={{text: 'Daily rotation', flex: 1}}
              item2={{
                text: `${item.daily_rotation} - ${item.daily_rotation_position}`,
                flex: 1,
              }}
            />
          </View>
        )}
        <TextRow
          item1={{text: 'Currently available', flex: 1}}
          item2={{text: item.available ? 'Yes' : 'No', flex: 1}}
        />
        <View className="flex-row flex-wrap justify-around self-stretch py-2.5">
          <StatButton
            attribute={item.attribute}
            isChecked={buttonID === 0}
            text="Easy"
            onPress={() => {
              setButtonID(0);
              setCurrentStats(easy);
            }}
          />
          <StatButton
            attribute={item.attribute}
            isChecked={buttonID === 1}
            text="Normal"
            onPress={() => {
              setButtonID(1);
              setCurrentStats(normal);
            }}
          />
          <StatButton
            attribute={item.attribute}
            isChecked={buttonID === 2}
            text="Hard"
            onPress={() => {
              setButtonID(2);
              setCurrentStats(hard);
            }}
          />
          <StatButton
            attribute={item.attribute}
            isChecked={buttonID === 3}
            text="Expert"
            onPress={() => {
              setButtonID(3);
              setCurrentStats(expert);
            }}
          />
          {random[1].length !== 0 && (
            <StatButton
              attribute={item.attribute}
              isChecked={buttonID === 4}
              text="Random"
              onPress={() => {
                setButtonID(3);
                setCurrentStats(random);
              }}
            />
          )}
          {master[0] > 0 && (
            <StatButton
              attribute={item.attribute}
              isChecked={buttonID === 5}
              text="Master"
              onPress={() => {
                setButtonID(5);
                setCurrentStats(master);
              }}
            />
          )}
        </View>
        {currentStats[0] > 0 && (
          <View className="self-stretch">
            <Text>{currentStats[0]} notes</Text>
            <Progress
              data-attribute={item.attribute}
              indicatorClassName="bg-other-attribute data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile"
              value={currentStats[0] / cachedData.songsMaxStats}
            />
          </View>
        )}
        <StarBar array={currentStats[1]} />
      </View>
    </ScrollViewWithBackButton>
  );
};

export default SongDetailScreen;
