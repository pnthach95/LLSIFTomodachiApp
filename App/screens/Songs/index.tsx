import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StatusBar, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import Animated, {Layout, SlideInUp, SlideOutUp} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useImmer} from 'use-immer';
import ConnectStatus from '~/Components/ConnectStatus';
import ImgSelectionRow from '~/Components/ImgSelectionRow';
import OrderingRow from '~/Components/OrderingRow';
import SelectionRow from '~/Components/SelectionRow';
import SongItem from '~/Components/SongItem';
import {
  AllOnlyNone,
  AttributeData,
  MainUnitData,
  OrderingGroup,
} from '~/Config';
import LLSIFService from '~/Services/LLSIFService';
import {AppStyles, Fonts, Images, Metrics} from '~/Theme';
import type {RootStackScreenProps} from '~/typings/navigation';

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

/**
 * [Song List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 */
const SongsScreen = ({navigation}: RootStackScreenProps<'SongsScreen'>) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<SongObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useImmer(defaultParams);
  const bottom = {paddingBottom: insets.bottom};

  useEffect(() => {
    getSongs(defaultParams);
  }, []);

  /** Render item in FlatList */
  const renderItem = ({item}: {item: SongObject}) => {
    /** Navigate to Song Detail Screen */
    const navigateToSongDetail = () => {
      navigation.navigate('SongDetailScreen', {item});
    };

    return <SongItem item={item} onPress={navigateToSongDetail} />;
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
    } catch (err) {
      // console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get songs', [{text: 'OK'}]);
    } finally {
      setLoading(false);
    }
  };

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

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
    <View style={styles.flatListElement}>
      <Text style={Fonts.style.center}>
        {loading ? 'Loading' : 'No result'}
      </Text>
    </View>
  );

  const onChangeText = (text: string) => {
    setSearchParams(draft => {
      draft.search = text;
    });
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header
        statusBarHeight={StatusBar.currentHeight}
        style={{backgroundColor: colors.card}}>
        <Appbar.BackAction onPress={goBack} />
        <View style={AppStyles.searchHeader}>
          <Searchbar
            placeholder="Search song..."
            style={AppStyles.noElevation}
            value={searchParams.search || ''}
            onChangeText={onChangeText}
            onIconPress={onSearch}
            onSubmitEditing={onSearch}
          />
        </View>
        <Appbar.Action icon="dots-horizontal" onPress={toggleFilter} />
      </Appbar.Header>
      {/* FILTER */}
      {showFilter && (
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutUp}
          layout={Layout}>
          <Surface style={styles.filterContainer}>
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
              selectedItem={searchParams.selectedOrdering}
              toggleReverse={toggleReverse}
              onSelect={selectOrdering}
            />
            <Button mode="contained" onPress={resetFilter}>
              RESET
            </Button>
          </Surface>
        </Animated.View>
      )}
      <ConnectStatus />
      {/* LIST */}
      <View style={[styles.list, AppStyles.screen]}>
        <FlashList
          contentContainerStyle={bottom}
          data={list}
          estimatedItemSize={300}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    padding: Metrics.baseMargin,
    zIndex: -1000,
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  list: {
    padding: Metrics.smallMargin,
  },
});

/** Render footer in FlatList */
const renderFooter = (
  <View style={[AppStyles.center, styles.flatListElement]}>
    <Image source={Images.alpaca} />
  </View>
);

export default SongsScreen;
