import {FlashList} from '@shopify/flash-list';
import {Images} from 'assets';
import ConnectStatus from 'components/connectstatus';
import ImgSelectionRow from 'components/imgselectionrow';
import OrderingRow from 'components/orderingrow';
import SelectionRow from 'components/selectionrow';
import {AllOnlyNone, AttributeData, MainUnitData, OrderingGroup} from 'config';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {SearchField} from 'heroui-native/search-field';
import {Surface} from 'heroui-native/surface';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Image, View, useWindowDimensions} from 'react-native';
import Animated, {
  LinearTransition,
  SlideInUp,
  SlideOutUp,
} from 'react-native-reanimated';
import LLSIFService from 'services/LLSIFService';
import {useImmer} from 'use-immer';
import {AddHTTPS, findColorByAttribute} from 'utils';
import type {RootStackScreenProps} from 'typings/navigation';

const defaultParams: SongSearchParams = {
  selectedOrdering: OrderingGroup.SONG[0].value,
  isReverse: true,
  ordering: '-id',
  page_size: 20,
  page: 1,
  expand_event: '',
  search: '',
  attribute: '',
  is_event: '',
  is_daily_rotation: '',
  available: '',
  main_unit: '',
};

/** Key extractor for FlatList */
const keyExtractor = (item: SongObject) => `song ${item.name}`;

export const useNumColumns = () => {
  const {width} = useWindowDimensions();
  if (width >= 1280) {
    return 6;
  }
  if (width >= 1024) {
    return 5;
  }
  if (width >= 768) {
    return 4;
  }
  if (width >= 640) {
    return 3;
  }
  return 2;
};

/**
 * [Song List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 */
const SongsScreen = ({navigation}: RootStackScreenProps<'SongsScreen'>) => {
  const numColumns = useNumColumns();
  const {width} = useWindowDimensions();
  const itemWidth = width / numColumns;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<SongObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useImmer(defaultParams);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search song...',
        onChangeText: ({nativeEvent: {text}}) => {
          setSearchParams(draft => {
            draft.search = text;
          });
        },
      },
      unstable_headerRightItems: () => [
        {
          type: 'button',
          label: 'Filter',
          icon: {type: 'sfSymbol', name: 'line.3.horizontal.decrease'},
          onPress: () => setShowFilter(v => !v),
        },
      ],
    });
  }, [navigation]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getSongs(defaultParams);
  }, []);

  /** Render item in FlatList */
  const renderItem = ({item}: {item: SongObject}) => {
    const tag = `song_${item.name}`;
    const uri = AddHTTPS(item.image);
    const attColors = findColorByAttribute(item.attribute || '');

    /** Navigate to Song Detail Screen */
    const navigateToSongDetail = () => {
      navigation.navigate('SongDetailScreen', {item, tag});
    };

    return (
      <PressableFeedback onPress={navigateToSongDetail}>
        {uri && (
          <Animated.Image
            resizeMode="cover"
            sharedTransitionTag={tag}
            source={{uri}}
            style={{width: itemWidth, height: itemWidth}}
          />
        )}
        <View
          className="absolute bottom-0 h-1/3 w-full items-center justify-end bg-linear-to-b from-other-attribute to-other-attribute p-1 data-[attribute=Cool]:from-cool/10 data-[attribute=Cool]:to-cool data-[attribute=Pure]:from-pure/10 data-[attribute=Pure]:to-pure data-[attribute=Smile]:from-smile/10 data-[attribute=Smile]:to-smile"
          data-attribute={item.attribute}>
          <Text align="center" className="text-white" weight="bold">
            {item.name}
          </Text>
          {!!item.romaji_name && (
            <Text truncate align="center" className="text-white" weight="bold">
              {item.romaji_name}
            </Text>
          )}
        </View>
        <PressableFeedback.Ripple
          animation={{backgroundColor: {value: attColors[1]}}}
        />
      </PressableFeedback>
    );
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReached = () => {
    if (searchParams.page > 0 && !loading) {
      const draft: SongSearchParams = {
        ...searchParams,
        page: searchParams.page + 1,
      };
      setSearchParams(draft);
      getSongs(draft);
    }
  };

  /** Fetch song list */
  const getSongs = async (sp: SongSearchParams) => {
    const ordering = (sp.isReverse ? '-' : '') + (sp.selectedOrdering || '');
    const params: SongSearchParams = {
      ordering,
      page_size: sp.page_size,
      page: sp.page,
      expand_event: sp.expand_event,
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (sp.attribute && sp.attribute?.length > 0) {
      params.attribute = sp.attribute;
    }
    if (sp.available && sp.available?.length > 0) {
      params.available = sp.available;
    }
    if (sp.is_event && sp.is_event?.length > 0) {
      params.is_event = sp.is_event;
    }
    if (sp.main_unit && sp.main_unit?.length > 0) {
      params.main_unit = sp.main_unit;
    }
    if (sp.search && sp.search?.length > 0) {
      params.search = sp.search;
    }
    // console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    try {
      const result = await LLSIFService.fetchSongList(params);
      if (result === 404) {
        setSearchParams(draft => {
          draft.page = 0;
        });
      } else if (Array.isArray(result)) {
        let x = [];
        if (sp.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (song, ind, self) =>
            ind === self.findIndex(t => t.name === song.name),
        );
        if (x.length === 0) {
          setSearchParams(draft => {
            draft.page = 0;
          });
        }
        setList(x);
      } else {
        setSearchParams(draft => {
          draft.page = 0;
        });
        throw new Error('null');
      }
    } catch {
      // console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get songs', [{text: 'OK'}]);
    } finally {
      setLoading(false);
    }
  };

  /** Reverse search on/off */
  const toggleReverse = () => {
    setSearchParams(draft => {
      draft.isReverse = !draft.isReverse;
    });
  };

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    const draft: SongSearchParams = {
      ...searchParams,
      page: 1,
    };
    setSearchParams(draft);
    getSongs(draft);
  };

  /** Reset filter variables */
  const resetFilter = () => {
    setSearchParams({...defaultParams, page: searchParams.page});
  };

  /** Save `is_event` */
  const selectEvent = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.is_event = value as BooleanOrEmpty;
    });
  };

  /** Save `attribute` */
  const selectAttribute = (value: Combined) => {
    setSearchParams(draft => {
      draft.attribute = value as AttributeType;
    });
  };

  /** Save `main_unit` */
  const selectMainUnit = (value: Combined) => {
    setSearchParams(draft => {
      draft.main_unit = value as MainUnitNames;
    });
  };

  /** Save ordering */
  const selectOrdering = (value: string) => {
    setSearchParams(draft => {
      draft.selectedOrdering = value;
    });
  };

  const renderEmpty = (
    <View className="m-2.5">
      <Text className="text-center">{loading ? 'Loading' : 'No result'}</Text>
    </View>
  );

  const onChangeText = (text: string) => {
    setSearchParams(draft => {
      draft.search = text;
    });
  };

  return (
    <View className="flex-1">
      {/* HEADER */}
      <View className="flex-row gap-2">
        <SearchField
          className="flex-1"
          value={searchParams.search || ''}
          onChange={onChangeText}>
          <SearchField.Group>
            <SearchField.Input
              placeholder="Search song..."
              onSubmitEditing={onSearch}
            />
          </SearchField.Group>
        </SearchField>
      </View>
      {/* FILTER */}
      {showFilter && (
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutUp}
          layout={LinearTransition}>
          <Surface className="-z-50 p-2.5">
            <ImgSelectionRow
              data={AttributeData}
              setValue={selectAttribute}
              title="Attribute"
              value={searchParams.attribute || ''}
            />
            <SelectionRow
              data={AllOnlyNone}
              setValue={selectEvent}
              title="Event"
              value={searchParams.is_event || ''}
            />
            <ImgSelectionRow
              data={MainUnitData}
              setValue={selectMainUnit}
              title="Main unit"
              value={searchParams.main_unit || ''}
            />
            <OrderingRow
              isReverse={searchParams.isReverse || true}
              list={OrderingGroup.SONG}
              toggleReverse={toggleReverse}
              value={searchParams.selectedOrdering}
              onSelect={selectOrdering}
            />
            <Button onPress={resetFilter}>RESET</Button>
          </Surface>
        </Animated.View>
      )}
      <ConnectStatus />
      {/* LIST */}
      <FlashList
        contentContainerClassName="pb-safe-offset-0"
        contentInsetAdjustmentBehavior="automatic"
        data={list}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        numColumns={numColumns}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
      />
    </View>
  );
};

/** Render footer in FlatList */
const renderFooter = (
  <View className="-z-50 items-center justify-center p-2.5">
    <Image source={Images.alpaca} />
  </View>
);

export default SongsScreen;
