import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, SectionList, FlatList, Alert } from 'react-native';
import { IconButton, Surface, Text, Divider } from 'react-native-paper';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import useStatusBar from '~/hooks/useStatusBar';
import UserContext from '~/Context/UserContext';
import ConnectStatus from '~/Components/ConnectStatus';
import IdolItem from '~/Components/IdolItem';
import LLSIFService from '~/Services/LLSIFService';
import LoadingScreen from '../Loading';
import { Colors, AppStyles, Images } from '~/Theme';
import styles from './styles';

/**
 * Idol List Screen
 *
 * State:
 * - isLoading: Loading state
 * - list: Data for FlatList
 *
 */
function IdolsScreen({ navigation }) {
  const { state } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { schools } = state.cachedData;
    const schoolName = schools.map((value) => value.label);
    try {
      const res = await LLSIFService.fetchIdolList(schoolName);
      const array = [];
      schools.forEach((school) => {
        const item = {
          title: school.label,
          data: [
            {
              key: school.label,
              list: res.filter((value) => value.school === school.label)
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
      Alert.alert('Error', e.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Render item in FlatList
   *
   */
  const renderItem = ({ item }) => {
    /**
     * Navigate to Idol Detail Screen
     *
     */
    const navigateToIdolDetail = () => {
      navigation.navigate('IdolDetailScreen', { name: item.name });
    };

    return <IdolItem item={item} onPress={navigateToIdolDetail} />;
  };
  renderItem.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  };

  /** Open drawer */
  const openDrawer = useCallback(() => navigation.openDrawer(), []);

  const renderFlatList = ({ item }) => {
    /**
     * Key extractor for FlatList
     *
     */
    const keyExtractor = (fItem) => `idol${fItem.name}`;

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

  renderFlatList.propTypes = {
    item: PropTypes.shape({
      list: PropTypes.object
    })
  };

  const sectionKeyExtractor = (item, index) => `School${index}`;
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionText}>{title}</Text>
  );
  renderSectionHeader.propTypes = {
    section: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  };

  if (isLoading) {
    return <LoadingScreen bgColor={Colors.blue} />;
  }

  return (
    <View style={[AppStyles.screen, styles.container]}>
      {/* HEADER */}
      <Surface style={[AppStyles.header, styles.container]}>
        <IconButton icon={'menu'} onPress={openDrawer} color={'white'} />
        <FastImage
          source={Images.logo}
          resizeMode='contain'
          style={AppStyles.imageHeader}
        />
        <View style={styles.hole} />
      </Surface>
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
}

export default IdolsScreen;
