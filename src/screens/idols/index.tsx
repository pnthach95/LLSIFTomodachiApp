import ConnectStatus from 'components/connectstatus';
import IdolItem from 'components/idolitem';
import {Typography as Text} from 'heroui-native/text';
import {useEffect} from 'react';
import {Alert, FlatList, SectionList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LLSIFService from 'services/LLSIFService';
import useStore, {setSchoolIdols} from 'store';
import LoadingScreen from '../loading';
import type {ListRenderItem, SectionListRenderItem} from 'react-native';
import type {RootStackScreenProps} from 'typings/navigation';

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

    loadData();
  }, []);

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
    <Text className="pt-5 pl-2.5">{section.title}</Text>
  );

  return (
    <View className="flex-1">
      <ConnectStatus />
      <SectionList
        className="p-1.25"
        contentContainerStyle={bottom}
        initialNumToRender={9}
        keyExtractor={sectionKeyExtractor}
        ListEmptyComponent={LoadingScreen}
        ListFooterComponent={<View className="h-3" />}
        ListHeaderComponent={<View className="h-3" />}
        renderItem={renderFlatList}
        renderSectionHeader={renderSectionHeader}
        sections={list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default IdolsScreen;
