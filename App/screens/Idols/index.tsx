import React, { useState, useContext, useEffect } from 'react';
import { View, SectionList, FlatList, Alert, StyleSheet } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserContext from '~/Context/UserContext';
import ConnectStatus from '~/Components/ConnectStatus';
import IdolItem from '~/Components/IdolItem';
import LLSIFService from '~/Services/LLSIFService';
import LoadingScreen from '../Loading';
import { AppStyles, Metrics } from '~/Theme';

import type { IdolObject, IdolsScreenProps } from '~/typings';

type SchoolObject = {
  title: string;
  data: {
    key: string;
    list: IdolObject[];
  }[];
};

/** Idol List Screen */
const IdolsScreen: React.FC<IdolsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<SchoolObject[]>([]);
  const bottom = { paddingBottom: insets.bottom };

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    const { schools } = state.cachedData;
    try {
      const res = await LLSIFService.fetchIdolList();
      const array: SchoolObject[] = [];
      schools.forEach((school) => {
        if (school.length > 0) {
          const item = {
            title: school,
            data: [
              {
                key: school,
                list: res.filter((value) => value?.school === school),
              },
            ],
          };
          if (item.data[0].list.length !== 0) array.push(item);
        }
      });
      const item = {
        title: 'Other',
        data: [
          {
            key: 'Other',
            list: res.filter((value) => !value.school),
          },
        ],
      };
      if (item.data[0].list.length !== 0) array.push(item);
      setList(array);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Alert.alert('Error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  /** Render item in FlatList */
  const renderItem = ({ item }: { item: IdolObject }) => {
    /** Navigate to Idol Detail Screen */
    const navigateToIdolDetail = () => {
      navigation.navigate('IdolDetailScreen', {
        name: item.name,
        prevStatusBarColor: colors.card,
      });
    };

    return <IdolItem item={item} onPress={navigateToIdolDetail} />;
  };

  const renderFlatList = ({ item }: { item: SchoolObject['data'][0] }) => {
    /** Key extractor for FlatList */
    const keyExtractor = (fItem: IdolObject): string => `idol${fItem.name}`;

    return (
      <FlatList
        numColumns={3}
        data={item.list}
        initialNumToRender={9}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    );
  };

  const sectionKeyExtractor = (
    item: SchoolObject['data'][0],
    index: number,
  ): string => `School${index}`;

  const renderSectionHeader = ({ section }: { section: SchoolObject }) => (
    <Title style={styles.sectionText}>{section.title}</Title>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={AppStyles.screen}>
      <ConnectStatus />
      <SectionList
        sections={list}
        initialNumToRender={9}
        keyExtractor={sectionKeyExtractor}
        style={styles.list}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<View style={styles.height10} />}
        ListFooterComponent={<View style={styles.height10} />}
        renderItem={renderFlatList}
        contentContainerStyle={bottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  height10: {
    height: Metrics.baseMargin,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  sectionText: {
    paddingLeft: Metrics.baseMargin,
    paddingTop: Metrics.doubleBaseMargin,
  },
});

export default IdolsScreen;
