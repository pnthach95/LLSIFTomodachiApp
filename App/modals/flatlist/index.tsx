import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import {
  Text,
  IconButton,
  TouchableRipple,
  Subheading,
  useTheme,
} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, AppStyles, Fonts } from '~/Theme';

import type { ListModalComponent, LVObject, SkillType } from '~/typings';

/**
 * Selection modal
 */
const FlatListModal: ListModalComponent = ({ modal }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = { height: insets.bottom };
  const { closeModal, getParam } = modal;
  const title = getParam('title', '');
  const selectedItem = getParam('selectedItem');
  const data = getParam('data');
  const objectData = getParam('objectData');

  const listFooter = <View style={bottom} />;

  const onClose = () => closeModal();

  const keyExtractor = (item: string, index: number): string => `item${index}`;
  const objKeyExtractor = (item: LVObject<string>, index: number): string =>
    `item${index}`;

  const renderItem = ({ item }: { item: SkillType | string }) => {
    const onPressItem = getParam('onPress');
    const onPress = () => {
      closeModal();
      onPressItem(item as SkillType);
    };

    return (
      <TouchableRipple onPress={onPress}>
        <View style={[AppStyles.row, styles.item]}>
          <Text style={Fonts.style.textWrap}>{item}</Text>
          {!!selectedItem && item === selectedItem && (
            <Icon name='check' color={Colors.green400} size={20} />
          )}
        </View>
      </TouchableRipple>
    );
  };

  const renderObjectItem = ({ item }: { item: LVObject<string> }) => {
    const onPressItem = getParam('onPress');
    const onPress = () => {
      closeModal();
      onPressItem(item.value);
    };

    return (
      <TouchableRipple onPress={onPress}>
        <View style={[AppStyles.row, styles.item]}>
          <Text style={Fonts.style.textWrap}>{item.label}</Text>
          {!!selectedItem && item.value === selectedItem && (
            <Icon name='check' color={Colors.green400} size={20} />
          )}
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          AppStyles.row,
          styles.header,
          { backgroundColor: colors.surface },
        ]}>
        <Subheading style={styles.headerText}>{title}</Subheading>
        <IconButton
          icon='close'
          color={Colors.red400}
          size={24}
          onPress={onClose}
        />
      </View>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          ListFooterComponent={listFooter}
          keyExtractor={keyExtractor}
        />
      )}
      {objectData && (
        <FlatList
          data={objectData}
          keyExtractor={objKeyExtractor}
          renderItem={renderObjectItem}
          ListFooterComponent={listFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: responsiveHeight(40),
    overflow: 'hidden',
    width: responsiveScreenWidth(100),
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    paddingHorizontal: 10,
  },
  item: {
    justifyContent: 'space-between',
    padding: 10,
  },
});

FlatListModal.propTypes = {
  modal: PropTypes.any,
};

export default FlatListModal;
