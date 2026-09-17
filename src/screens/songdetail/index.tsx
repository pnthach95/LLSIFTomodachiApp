import {Progress} from 'components/progress';
import StarBar from 'components/starbar';
import TextRow from 'components/textrow';
import {TurboImage} from 'components/uniwind';
import dayjs from 'dayjs';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {TagGroup, type TagKey} from 'heroui-native/tag-group';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import {useCachedData} from 'store';
import {AddHTTPS} from 'utils';
import type {RootStackScreenProps} from 'typings/navigation';

type SongStat = [number, number[]];

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
  const cachedData = useCachedData();
  const [selected, setSelected] = useState<Set<TagKey>>(new Set([0]));
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
  const image = AddHTTPS(item.image);

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

  return (
    <ScrollView
      contentContainerClassName="gap-3 px-5"
      contentInsetAdjustmentBehavior="automatic">
      {item.romaji_name && (
        <Text
          className="font-bold data-[attribute=Cool]:text-cool data-[attribute=Pure]:text-pure data-[attribute=Smile]:text-smile"
          data-attribute={item.attribute}>
          {item.romaji_name}
        </Text>
      )}
      {image && (
        <TurboImage
          className="w-2/5 self-center"
          resizeMode="contain"
          source={{uri: image}}
          style={{height: width * 0.4}}
        />
      )}
      <View>
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
      </View>
      <TagGroup
        className="self-center"
        selectedKeys={selected}
        selectionMode="single"
        size="lg"
        onSelectionChange={v => {
          if (v.size > 0) {
            setSelected(v);
            if (v.has(0)) {
              setCurrentStats(easy);
            }
            if (v.has(1)) {
              setCurrentStats(normal);
            }
            if (v.has(2)) {
              setCurrentStats(hard);
            }
            if (v.has(3)) {
              setCurrentStats(expert);
            }
            if (v.has(4)) {
              setCurrentStats(random);
            }
            if (v.has(5)) {
              setCurrentStats(master);
            }
          }
        }}>
        <TagGroup.List>
          <TagGroup.Item id={0}>
            <TagGroup.ItemLabel>Easy</TagGroup.ItemLabel>
          </TagGroup.Item>
          <TagGroup.Item id={1}>
            <TagGroup.ItemLabel>Normal</TagGroup.ItemLabel>
          </TagGroup.Item>
          <TagGroup.Item id={2}>
            <TagGroup.ItemLabel>Hard</TagGroup.ItemLabel>
          </TagGroup.Item>
          <TagGroup.Item id={3}>
            <TagGroup.ItemLabel>Expert</TagGroup.ItemLabel>
          </TagGroup.Item>
          {random[1].length !== 0 && (
            <TagGroup.Item id={4}>
              <TagGroup.ItemLabel>Random</TagGroup.ItemLabel>
            </TagGroup.Item>
          )}
          {master[0] > 0 && (
            <TagGroup.Item id={5}>
              <TagGroup.ItemLabel>Master</TagGroup.ItemLabel>
            </TagGroup.Item>
          )}
        </TagGroup.List>
      </TagGroup>
      {currentStats[0] > 0 && (
        <View className="self-stretch">
          <Text>{currentStats[0]} notes</Text>
          <Progress
            className="bg-light-other-attribute data-[attribute=Cool]:bg-light-cool data-[attribute=Pure]:bg-light-pure data-[attribute=Smile]:bg-light-smile"
            data-attribute={item.attribute}
            indicatorClassName={
              item.attribute === 'Smile'
                ? 'bg-smile'
                : item.attribute === 'Pure'
                  ? 'bg-pure'
                  : 'bg-cool'
            }
            value={(100 * currentStats[0]) / cachedData.songsMaxStats}
          />
        </View>
      )}
      <StarBar array={currentStats[1]} />
    </ScrollView>
  );
};

export default SongDetailScreen;
