import {Images} from 'assets';
import SPCStats from 'components/spcstats';
import TextRow from 'components/textrow';
import {MaterialDesignIcons, TurboImage} from 'components/uniwind';
import dayjs from 'dayjs';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {TagGroup, type TagKey} from 'heroui-native/tag-group';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {Image, ScrollView, View, useWindowDimensions} from 'react-native';
import {AddHTTPS, findColorByAttribute} from 'utils';
import type {RootStackScreenProps} from 'typings/navigation';

const RenderImage = ({
  index,
  value,
  ripperColor,
  onPress,
}: {
  index: number;
  value: string;
  ripperColor?: string;
  onPress: (index: number) => void;
}) => {
  const {width} = useWindowDimensions();
  const itemWidth = (width - 10) / 2 - 10;
  const onPressImg = () => onPress(index);

  return (
    <PressableFeedback onPress={onPressImg}>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: ripperColor}}}
      />
      <TurboImage
        resizeMode="contain"
        source={{uri: value}}
        style={{
          height: (itemWidth * 720) / 512,
          width: itemWidth,
        }}
      />
    </PressableFeedback>
  );
};

/**
 * Card detail screen
 */
const CardDetailScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'CardDetailScreen'>) => {
  const {item} = route.params;
  const minStats = [
    item.minimum_statistics_smile || 0,
    item.minimum_statistics_pure || 0,
    item.minimum_statistics_cool || 0,
  ];
  const nonIdolMaxStats = [
    item.non_idolized_maximum_statistics_smile || 0,
    item.non_idolized_maximum_statistics_pure || 0,
    item.non_idolized_maximum_statistics_cool || 0,
  ];
  const idolMaxStats = [
    item.idolized_maximum_statistics_smile || 0,
    item.idolized_maximum_statistics_pure || 0,
    item.idolized_maximum_statistics_cool || 0,
  ];
  const propertyLine = [
    item.is_promo && 'Promo card',
    item.japan_only && 'Japan only',
  ]
    .filter(value => typeof value === 'string')
    .join(' - ');
  const images = [
    AddHTTPS(item.card_image),
    AddHTTPS(item.card_idolized_image),
  ].filter((value): value is string => !!value);
  const eventImage = AddHTTPS(item.event?.image);
  const otherEventImage = AddHTTPS(item.other_event?.image);
  const [currentStats, setCurrentStats] = useState(minStats);
  const [selected, setSelected] = useState<Set<TagKey>>(new Set([0]));
  const cardColors = findColorByAttribute(item.attribute);

  const goToEvent = () =>
    navigation.navigate('EventDetailScreen', {
      eventName: item.event?.japanese_name || '',
    });

  const goToOtherEvent = () =>
    navigation.navigate('EventDetailScreen', {
      eventName: item.other_event?.japanese_name || '',
    });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="flex-row items-center justify-center">
        {!!item.idol.main_unit && (
          <Image
            className="h-12.5 w-17.5"
            resizeMode="contain"
            source={Images.multi[item.idol.main_unit]}
          />
        )}
        {!!item.idol.sub_unit && (
          <Image
            className="h-12.5 w-17.5"
            resizeMode="contain"
            source={Images.subUnit[item.idol.sub_unit]}
          />
        )}
      </View>
      {/* CARD IMAGES */}
      <View className="flex-row justify-around pb-5">
        {images.map((value, index) => (
          <RenderImage
            key={index}
            index={index}
            ripperColor={cardColors[0]}
            value={value}
            onPress={idx => navigation.navigate('Gallery', {idx, images})}
          />
        ))}
      </View>
      <View className="px-5">
        {/* INFORMATION */}
        <TextRow
          item1={{flex: 1, text: 'Card ID'}}
          item2={{flex: 2, text: item.game_id}}
        />
        <TextRow
          item1={{flex: 1, text: 'Release date'}}
          item2={{flex: 2, text: dayjs(item.release_date).format('LL')}}
        />
        {!!propertyLine && (
          <Text color="muted" type="body-sm">
            {propertyLine}
          </Text>
        )}

        {!!item.skill && (
          <>
            <TextRow
              item1={{flex: 1, text: 'Skill'}}
              item2={{flex: 2, text: item.skill}}
            />
            <TextRow
              item1={{flex: 1, text: ''}}
              item2={{flex: 2, text: item.skill_details || ''}}
            />
          </>
        )}

        {!!item.center_skill && (
          <>
            <TextRow
              item1={{flex: 1, text: 'Center skill'}}
              item2={{flex: 2, text: item.center_skill}}
            />
            <TextRow
              item1={{flex: 1, text: ''}}
              item2={{flex: 2, text: item.center_skill_details || ''}}
            />
          </>
        )}

        {!!item.event && (
          <>
            <TextRow
              item1={{text: 'Event', flex: 1}}
              item2={{text: item.event.japanese_name, flex: 2}}
            />
            {item.event.english_name !== null && (
              <TextRow
                item1={{text: '', flex: 1}}
                item2={{text: item.event.english_name || '', flex: 2}}
              />
            )}
            {eventImage && (
              <PressableFeedback
                className="items-center justify-center py-2.5"
                onPress={goToEvent}>
                <TurboImage
                  className="h-25 w-4/5"
                  resizeMode="contain"
                  source={{uri: eventImage}}
                />
              </PressableFeedback>
            )}
            {!!item.other_event && (
              <View>
                <TextRow
                  item1={{text: '', flex: 1}}
                  item2={{text: item.other_event.english_name || '', flex: 2}}
                />
                {otherEventImage && (
                  <PressableFeedback
                    className="items-center justify-center py-2.5"
                    onPress={goToOtherEvent}>
                    <TurboImage
                      className="h-25 w-4/5"
                      resizeMode="contain"
                      source={{uri: otherEventImage}}
                    />
                  </PressableFeedback>
                )}
              </View>
            )}
          </>
        )}

        {/* STATS */}
        {item.hp !== 0 && (
          <>
            <View className="flex-row items-center">
              <MaterialDesignIcons
                colorClassName="accent-danger"
                name="heart"
                size={18}
              />
              <Text>: {item.hp}</Text>
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
                    setCurrentStats(minStats);
                  }
                  if (v.has(1)) {
                    setCurrentStats(nonIdolMaxStats);
                  }
                  if (v.has(2)) {
                    setCurrentStats(idolMaxStats);
                  }
                }
              }}>
              <TagGroup.List>
                <TagGroup.Item id={0}>
                  <TagGroup.ItemLabel>Level 1</TagGroup.ItemLabel>
                </TagGroup.Item>
                {item.non_idolized_maximum_statistics_smile !== 0 && (
                  <TagGroup.Item id={1}>
                    <TagGroup.ItemLabel>{`Level ${item.non_idolized_max_level || 0}`}</TagGroup.ItemLabel>
                  </TagGroup.Item>
                )}
                {item.idolized_max_level !== 0 && (
                  <TagGroup.Item id={2}>
                    <TagGroup.ItemLabel>{`Level ${item.idolized_max_level || 0}`}</TagGroup.ItemLabel>
                  </TagGroup.Item>
                )}
              </TagGroup.List>
            </TagGroup>
            <SPCStats stat={currentStats[0]} text="Smile" />
            <SPCStats stat={currentStats[1]} text="Pure" />
            <SPCStats stat={currentStats[2]} text="Cool" />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default CardDetailScreen;
