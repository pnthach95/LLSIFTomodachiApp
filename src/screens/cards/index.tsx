import {FlashList} from '@shopify/flash-list';
import {Images} from 'assets';
import Card2PicsItem from 'components/card2picsitem';
import CardItem from 'components/carditem';
import ConnectStatus from 'components/connectstatus';
import ImgSelectionRow from 'components/imgselectionrow';
import OrderingRow from 'components/orderingrow';
import PickerRow from 'components/pickerrow';
import SelectionRow from 'components/selectionrow';
import {MaterialDesignIcons} from 'components/uniwind';
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
import {SearchField} from 'heroui-native/search-field';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import LLSIFService from 'services/LLSIFService';
import useStore from 'store';
import {initAppOptions} from 'store/init';
import {useImmer} from 'use-immer';
import {useStorage} from 'utils';
import type {MainTabScreenProps} from 'typings/navigation';

/** Key extractor in FlatList */
const keyExtractor = (item: CardObject) => `card ${item.id}`;

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 */
const CardsScreen = ({navigation}: MainTabScreenProps<'CardsScreen'>) => {
  const [settings] = useStorage('settings', initAppOptions);
  const cachedData = useStore(s => s.cachedData);
  const defaultParams: CardSearchParams = {
    search: '',
    selectedOrdering: OrderingGroup.CARD[1].value,
    isReverse: true,
    page_size: 30,
    page: 1,
    name: 'All',
    rarity: '',
    attribute: '',
    japan_only: settings.worldwideOnly ? 'False' : '',
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
  const [column, setColumn] = useState(2);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCards(defaultParams);
  }, []);

  /** Render item in FlatList */
  const renderItem = ({item}: {item: CardObject}) => {
    /** Navigate to Card Detail Screen */
    const navigateToCardDetail = () => {
      navigation.navigate('CardDetailScreen', {item});
    };

    if (column === 1) {
      return <Card2PicsItem item={item} onPress={navigateToCardDetail} />;
    }
    return <CardItem item={item} onPress={navigateToCardDetail} />;
  };

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    setSearchParams({...searchParams, page: 1});
    getCards({...searchParams, page: 1});
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

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

  /** Reverse search on/off */
  const toggleReverse = () => {
    setSearchParams(draft => {
      draft.isReverse = !draft.isReverse;
    });
  };

  /** Switch 1 column and 2 columns */
  const switchColumn = () => setColumn(column === 1 ? 2 : 1);

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

  const onChangeText = (text: string) =>
    setSearchParams(draft => {
      draft.search = text;
    });

  return (
    <View className="flex-1">
      {/* HEADER */}
      <View className="flex-row">
        <View className="ml-2.5 flex-1">
          <SearchField
            value={searchParams.search || ''}
            onChange={onChangeText}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                placeholder="Search card..."
                onSubmitEditing={onSearch}
              />
            </SearchField.Group>
          </SearchField>
        </View>
        <Button isIconOnly onPress={toggleFilter}>
          <MaterialDesignIcons name="dots-horizontal" />
        </Button>
      </View>

      {/* FILTER */}
      {showFilter && (
        <View className="h-7/20 bg-surface">
          <ScrollView contentContainerClassName="p-2.5">
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
      <View className="flex-1 px-1.25">
        <FlashList
          key={`${column}c`}
          contentContainerClassName="py-1.25"
          data={list}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          numColumns={column}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      </View>
      <Button
        isIconOnly
        className="absolute right-0 bottom-0 m-4"
        onPress={switchColumn}>
        <MaterialDesignIcons
          name={column === 1 ? 'view-grid' : 'view-agenda'}
        />
      </Button>
    </View>
  );
};

/** Render footer of FlatList */
const renderFooter = (
  <View className="m-2.5 items-center justify-center">
    <Image source={Images.alpaca} />
  </View>
);

export default CardsScreen;
