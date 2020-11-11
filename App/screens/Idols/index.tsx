import React, { useState, useContext, useEffect } from 'react';
import { View, SectionList, FlatList, Alert, StyleSheet } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';

import UserContext from '~/Context/UserContext';
import ConnectStatus from '~/Components/ConnectStatus';
import IdolItem from '~/Components/IdolItem';
import LLSIFService from '~/Services/LLSIFService';
import LoadingScreen from '../Loading';
import { AppStyles, Metrics, Colors } from '~/Theme';
import type { IdolObject, IdolsScreenProps } from '~/Utils/types';

type SchoolData = {
  key: string;
  list: IdolObject[];
};

type SchoolObject = {
  title: string;
  data: SchoolData[];
};

/**
 * Idol List Screen
 */
const IdolsScreen: React.FC<IdolsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<SchoolObject[]>([]);

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = () => {
    const { schools } = state.cachedData;
    try {
      const res = LLSIFService.fetchIdolList(schools);
      const array: SchoolObject[] = [];
      schools.forEach((school) => {
        const item = {
          title: school,
          data: [
            {
              key: school,
              list: res.filter((value) => value?.school === school)
            }
          ]
        };
        if (item.data[0].list.length !== 0) array.push(item);
      });
      const item = {
        title: 'Other',
        data: [
          {
            key: 'Other',
            list: res.filter((value) => value.school === null)
          }
        ]
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

  /**
   * Render item in FlatList
   *
   */
  const renderItem = ({ item }: { item: IdolObject }) => {
    /**
     * Navigate to Idol Detail Screen
     */
    const navigateToIdolDetail = () => {
      navigation.navigate('IdolDetailScreen', {
        name: item.name,
        prevStatusBarColor: colors.card
      });
    };

    return <IdolItem item={item} onPress={navigateToIdolDetail} />;
  };

  const renderFlatList = ({ item }: { item: SchoolData }) => {
    /**
     * Key extractor for FlatList
     */
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

  const sectionKeyExtractor = (item: SchoolData, index: number): string =>
    `School${index}`;

  const renderSectionHeader = ({ section }: { section: SchoolObject }) => (
    <Text style={styles.sectionText}>{section.title}</Text>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={[AppStyles.screen, styles.container]}>
      <ConnectStatus />
      {/* BODY */}
      <SectionList
        sections={list}
        initialNumToRender={9}
        keyExtractor={sectionKeyExtractor}
        style={styles.list}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<View style={styles.height10} />}
        ListFooterComponent={<View style={styles.height10} />}
        SectionSeparatorComponent={(data) => {
          if (data.leadingItem && data.leadingItem.key === 'Other') return null;
          const styleSeperator = {
            backgroundColor: 'white',
            marginBottom: data.leadingItem ? 20 : 0
          };
          return <Divider style={styleSeperator} />;
        }}
        renderItem={renderFlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    elevation: 5
  },
  height10: {
    height: 10
  },
  list: {
    padding: Metrics.smallMargin
  },
  sectionText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default IdolsScreen;
