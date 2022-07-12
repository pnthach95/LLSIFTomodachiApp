import React, {useEffect} from 'react';
import {Alert, FlatList, SectionList, StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ConnectStatus from '~/Components/ConnectStatus';
import IdolItem from '~/Components/IdolItem';
import Space from '~/Components/space';
import LLSIFService from '~/Services/LLSIFService';
import {AppStyles, Metrics} from '~/Theme';
import useStore, {setSchoolIdols} from '~/store';
import type {RootStackScreenProps} from '~/typings/navigation';
import LoadingScreen from '../Loading';
import type {ListRenderItem, SectionListRenderItem} from 'react-native';

/** Key extractor for FlatList */
const keyExtractor = (fItem: IdolObject): string => `idol${fItem.name}`;

const sectionKeyExtractor = (item: SchoolObject['data'][0], index: number) =>
  `School${index}`;

/** Idol List Screen */
const IdolsScreen = ({navigation}: RootStackScreenProps<'IdolsScreen'>) => {
  const insets = useSafeAreaInsets();
  const schools = useStore(s => s.cachedData.schools);
  const list = useStore(s => s.schoolIdols);
  const bottom = {paddingBottom: insets.bottom};

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await LLSIFService.fetchIdolList();
      const array: SchoolObject[] = [];
      schools.forEach(school => {
        if (school.length > 0) {
          const item = {
            title: school,
            data: [
              {
                key: school,
                list: res.filter(value => value?.school === school),
              },
            ],
          };
          if (item.data[0].list.length !== 0) {
            array.push(item);
          }
        }
      });
      const item = {
        title: 'Other',
        data: [
          {
            key: 'Other',
            list: res.filter(value => !value.school),
          },
        ],
      };
      if (item.data[0].list.length !== 0) {
        array.push(item);
      }
      setSchoolIdols(array);
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Error', e.message);
      }
    }
  };

  /** Render item in FlatList */
  const renderItem: ListRenderItem<IdolObject> = ({item}) => {
    /** Navigate to Idol Detail Screen */
    const navigateToIdolDetail = () => {
      navigation.navigate('IdolDetailScreen', {
        name: item.name,
      });
    };

    return <IdolItem item={item} onPress={navigateToIdolDetail} />;
  };

  const renderFlatList: SectionListRenderItem<
    SchoolObject['data'][0],
    SchoolObject
  > = ({item}) => {
    return (
      <FlatList
        data={item.list}
        keyExtractor={keyExtractor}
        numColumns={3}
        renderItem={renderItem}
      />
    );
  };

  const renderSectionHeader = ({section}: {section: SchoolObject}) => (
    <Title style={styles.sectionText}>{section.title}</Title>
  );

  return (
    <View style={AppStyles.screen}>
      <ConnectStatus />
      <SectionList
        contentContainerStyle={bottom}
        initialNumToRender={9}
        keyExtractor={sectionKeyExtractor}
        ListEmptyComponent={LoadingScreen}
        ListFooterComponent={<Space height={Metrics.baseMargin} />}
        ListHeaderComponent={<Space height={Metrics.baseMargin} />}
        renderItem={renderFlatList}
        renderSectionHeader={renderSectionHeader}
        sections={list}
        stickySectionHeadersEnabled={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: Metrics.smallMargin,
  },
  sectionText: {
    paddingLeft: Metrics.baseMargin,
    paddingTop: Metrics.doubleBaseMargin,
  },
});

export default IdolsScreen;
