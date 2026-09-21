import {FlashList} from '@shopify/flash-list';
import {Images} from 'assets';
import ConnectStatus from 'components/connectstatus';
import ImgSelectionRow from 'components/imgselectionrow';
import OrderingRow from 'components/orderingrow';
import PickerRow from 'components/pickerrow';
import SelectionRow from 'components/selectionrow';
import {BlurView} from 'components/uniwind';
import {
  AllOnlyNone,
  AttributeData,
  MainUnitData,
  OrderingGroup,
  RarityData,
  RegionData,
  YearData,
} from 'config';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-screens/experimental';
import LLSIFService from 'services/LLSIFService';
import {useCachedData, useWorldwideOnly} from 'store';
import {useImmer} from 'use-immer';
import {AddHTTPS, findColorByAttribute, findSkill, useNumColumns} from 'utils';
import type {MainTabScreenProps} from 'typings/navigation';

/** Key extractor in FlatList */
const keyExtractor = (item: CardObject) => `card ${item.id}`;

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 */
const CardsScreen = ({navigation}: MainTabScreenProps<'CardsScreen'>) => {
  const numColumns = useNumColumns();
  const {width} = useWindowDimensions();
  const itemWidth = width / numColumns;
  const worldwideOnly = useWorldwideOnly();
  const cachedData = useCachedData();
  const defaultParams: CardSearchParams = {
    search: '',
    selectedOrdering: OrderingGroup.CARD[1].value,
    isReverse: true,
    page_size: 30,
    page: 1,
    name: 'All',
    rarity: '',
    attribute: '',
    japan_only: worldwideOnly ? 'False' : '',
    is_promo: '',
    is_special: '',
    is_event: '',
    skill: 'All',
    idol_main_unit: '',
    idol_sub_unit: 'All',
    idol_school: 'All',
    idol_year: '',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useImmer(defaultParams);
  const [list, setList] = useState<CardObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  /** Get card list */
  const getCards = async (sp: CardSearchParams) => {
    const ordering = (sp?.isReverse ? '-' : '') + (sp.selectedOrdering || '');
    const params: CardSearchParams = {
      ordering,
      page_size: sp.page_size,
      page: sp.page,
    };
    if (sp.attribute !== '') {
      params.attribute = sp.attribute;
    }
    if (sp.idol_main_unit !== '') {
      params.idol_main_unit = sp.idol_main_unit;
    }
    if (sp.idol_sub_unit !== 'All') {
      params.idol_sub_unit = sp.idol_sub_unit;
    }
    if (sp.idol_school !== 'All') {
      params.idol_school = sp.idol_school;
    }
    if (sp.name !== 'All') {
      params.name = sp.name;
    }
    if (sp.skill !== 'All') {
      params.skill = sp.skill;
    }
    if (sp.is_event !== '') {
      params.is_event = sp.is_event;
    }
    if (sp.is_promo !== '') {
      params.is_promo = sp.is_promo;
    }
    if (sp.japan_only !== '') {
      params.japan_only = sp.japan_only;
    }
    if (sp.idol_year !== '') {
      params.idol_year = sp.idol_year;
    }
    if (sp.is_special !== '') {
      params.is_special = sp.is_special;
    }
    if (sp.rarity !== '') {
      params.rarity = sp.rarity;
    }
    if (sp.search !== '') {
      params.search = sp.search;
    }
    // console.log(`Cards.getCards: ${JSON.stringify(theFilter)}`);
    try {
      setIsLoading(true);
      const result = await LLSIFService.fetchCardList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchCardList 404');
        setSearchParams({...sp, page: 0});
      } else if (Array.isArray(result)) {
        let x = [];
        if (sp.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (card, index, self) =>
            index === self.findIndex(t => t.id === card.id),
        );
        if (x.length === 0) {
          setSearchParams({...sp, page: 0});
        }
        setList(x);
      } else {
        setSearchParams({...sp, page: 0});
        throw new Error('null');
      }
    } catch {
      // console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get cards', [{text: 'OK'}]);
    } finally {
      setIsLoading(false);
    }
  };

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    setSearchParams({...searchParams, page: 1});
    getCards({...searchParams, page: 1});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search card...',
        onChangeText: ({nativeEvent: {text}}) => {
          setSearchParams(draft => {
            draft.search = text;
          });
        },
        onSearchButtonPress: onSearch,
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
  }, [navigation, onSearch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCards(defaultParams);
  }, []);

  /** Render item in FlatList */
  const renderItem = ({item}: {item: CardObject}) => {
    const card = AddHTTPS(item.card_image || item.card_idolized_image);
    const cardColors = findColorByAttribute(item.attribute);

    /** Navigate to Card Detail Screen */
    const navigateToCardDetail = () => {
      navigation.navigate('CardDetailScreen', {item});
    };

    return (
      <PressableFeedback
        className="p-2"
        style={{width: itemWidth}}
        onPress={navigateToCardDetail}>
        {!!card && (
          <Animated.Image
            sharedTransitionTag={`card_${item.id}`}
            source={{uri: card}}
            style={{aspectRatio: 484 / 681}}
          />
        )}
        <BlurView
          blurAmount={20}
          blurType="xlight"
          className="absolute top-2 right-2 gap-1 rounded-bl-md p-2"
          data-attribute={item.attribute}
          overlayColorClassName="accent-light-other-attribute data-[attribute=Cool]:accent-light-cool data-[attribute=Pure]:accent-light-pure data-[attribute=Smile]:accent-light-smile">
          {!!item.skill && (
            <Image
              className="h-7 w-7"
              source={Images.skill[findSkill(item.skill)]}
              style={{tintColor: cardColors[0]}}
            />
          )}
          <Image
            className="h-7 w-7"
            source={item.japan_only ? Images.region[0] : Images.region[1]}
            style={{tintColor: cardColors[0]}}
          />
          {item.is_promo && (
            <Image
              className="h-7 w-7"
              source={Images.promo}
              style={{tintColor: cardColors[0]}}
            />
          )}
          {item.is_special && (
            <Image
              className="h-7 w-7"
              source={Images.skill[3]}
              style={{tintColor: cardColors[0]}}
            />
          )}
          {!!item.event && (
            <Image
              className="h-7 w-7"
              source={Images.event}
              style={{tintColor: cardColors[0]}}
            />
          )}
        </BlurView>
        <PressableFeedback.Ripple
          animation={{backgroundColor: {value: cardColors[0]}}}
        />
      </PressableFeedback>
    );
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReached = () => {
    if (searchParams.page > 0 && !isLoading) {
      const newSP = {...searchParams, page: searchParams.page + 1};
      setSearchParams(newSP);
      getCards(newSP);
    }
  };

  /** Reverse search on/off */
  const toggleReverse = () => {
    setSearchParams(draft => {
      draft.isReverse = !draft.isReverse;
    });
  };

  /** Save is_promo */
  const selectPromo = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.is_promo = value as BooleanOrEmpty;
    });
  };

  /** Save is_special */
  const selectSpecial = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.is_special = value as BooleanOrEmpty;
    });
  };

  /** Save is_event */
  const selectEvent = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.is_event = value as BooleanOrEmpty;
    });
  };

  /** Save idol_main_unit */
  const selectMainUnit = (value: Combined) => {
    setSearchParams(draft => {
      draft.idol_main_unit = value as MainUnitNames;
    });
  };

  /** Save rarity */
  const selectRarity = (value: Combined) => {
    setSearchParams(draft => {
      draft.rarity = value as RarityType;
    });
  };

  /** Save attribute */
  const selectAttribute = (value: Combined) => {
    setSearchParams(draft => {
      draft.attribute = value as AttributeType;
    });
  };

  /** Save idol_year */
  const selectYear = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.idol_year = value as YearType;
    });
  };

  /** Save region */
  const selectRegion = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.japan_only = value as BooleanOrEmpty;
    });
  };

  /** Save idol_sub_unit */
  const selectSubUnit = (value: string) => {
    setSearchParams(draft => {
      draft.idol_sub_unit = value;
    });
  };

  /** Save idol name */
  const selectIdol = (value: string) => {
    setSearchParams(draft => {
      draft.name = value;
    });
  };

  /** Save school */
  const selectSchool = (value: string) => {
    setSearchParams(draft => {
      draft.idol_school = value;
    });
  };

  /** Save skill */
  const selectSkill = (value: string) => {
    setSearchParams(draft => {
      draft.skill = value as SkillType;
    });
  };

  /** Save ordering */
  const selectOrdering = (value: string) => {
    setSearchParams(draft => {
      draft.selectedOrdering = value;
    });
  };

  /** Reset filter variables */
  const resetFilter = () => {
    setSearchParams({...defaultParams, page: searchParams.page});
  };

  const renderEmpty = (
    <View className="m-2.5 items-center justify-center">
      <Text>{isLoading ? 'Loading' : 'No result'}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" edges={{top: true}}>
      {/* FILTER */}
      {showFilter && (
        <View className="h-7/20">
          <ScrollView contentContainerClassName="p-3">
            <PickerRow
              list={cachedData.idols}
              name="Idol"
              value={searchParams.name || ''}
              onSelect={selectIdol}
            />
            <ImgSelectionRow
              data={RarityData}
              setValue={selectRarity}
              title="Rarity"
              value={searchParams.rarity || ''}
            />
            <ImgSelectionRow
              data={AttributeData}
              setValue={selectAttribute}
              title="Attribute"
              value={searchParams.attribute || ''}
            />
            <SelectionRow
              data={RegionData}
              setValue={selectRegion}
              title="Region"
              value={searchParams.japan_only || ''}
            />
            <SelectionRow
              data={AllOnlyNone}
              setValue={selectPromo}
              title="Promo card"
              value={searchParams.is_promo || ''}
            />
            <SelectionRow
              data={AllOnlyNone}
              setValue={selectSpecial}
              title="Special card"
              value={searchParams.is_special || ''}
            />
            <SelectionRow
              data={AllOnlyNone}
              setValue={selectEvent}
              title="Event"
              value={searchParams.is_event || ''}
            />
            <PickerRow
              list={cachedData.skills}
              name="Skill"
              value={searchParams.skill || 'All'}
              onSelect={selectSkill}
            />
            <ImgSelectionRow
              data={MainUnitData}
              setValue={selectMainUnit}
              title="Main unit"
              value={searchParams.idol_main_unit || ''}
            />
            <PickerRow
              list={cachedData.subUnits}
              name="Subunit"
              value={searchParams.idol_sub_unit || ''}
              onSelect={selectSubUnit}
            />
            <PickerRow
              list={cachedData.schools}
              name="School"
              value={searchParams.idol_school || ''}
              onSelect={selectSchool}
            />
            <SelectionRow
              data={YearData}
              setValue={selectYear}
              title="Year"
              value={searchParams.idol_year || ''}
            />
            <OrderingRow
              isReverse={searchParams.isReverse || false}
              list={OrderingGroup.CARD}
              selectedItem={
                searchParams.selectedOrdering || OrderingGroup.CARD[1].value
              }
              toggleReverse={toggleReverse}
              onSelect={selectOrdering}
            />

            {/* RESET BUTTON */}
            <Button onPress={resetFilter}>RESET</Button>
          </ScrollView>
        </View>
      )}
      <ConnectStatus />
      {/* LIST */}
      <FlashList
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
    </SafeAreaView>
  );
};

/** Render footer of FlatList */
const renderFooter = (
  <View className="m-2.5 items-center justify-center">
    <Image source={Images.alpaca} />
  </View>
);

export default CardsScreen;
