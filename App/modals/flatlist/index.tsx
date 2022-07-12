import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  IconButton,
  Subheading,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles, Colors, Fonts} from '~/Theme';
import type {ListModalComponent} from '~/typings/modalfy';
import type {ListRenderItem} from 'react-native';

const keyExtractor = (item: string, index: number) => `item${index}`;
const objKeyExtractor = (item: LVObject<string>, index: number) =>
  `item${index}`;

/**
 * Selection modal
 */
const FlatListModal: ListModalComponent = ({modal}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {closeModal, getParam} = modal;
  const title = getParam('title', '');
  const selectedItem = getParam('selectedItem');
  const data = getParam('data');
  const objectData = getParam('objectData');

  const listFooter = {
    paddingBottom: insets.bottom,
  };

  const onClose = () => closeModal();

  const renderItem: ListRenderItem<SkillType | string> = ({item}) => {
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
            <Icon color={Colors.green400} name="check" size={20} />
          )}
        </View>
      </TouchableRipple>
    );
  };

  const renderObjectItem: ListRenderItem<LVObject<string>> = ({item}) => {
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
            <Icon color={Colors.green400} name="check" size={20} />
          )}
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View
        style={[
          AppStyles.row,
          styles.header,
          {backgroundColor: colors.surface},
        ]}>
        <Subheading style={styles.headerText}>{title}</Subheading>
        <IconButton
          color={Colors.red400}
          icon="close"
          size={24}
          onPress={onClose}
        />
      </View>
      {data && (
        <FlatList
          contentContainerStyle={listFooter}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      {objectData && (
        <FlatList
          contentContainerStyle={listFooter}
          data={objectData}
          keyExtractor={objKeyExtractor}
          renderItem={renderObjectItem}
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

export default FlatListModal;
