import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useModal } from 'react-native-modalfy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import rowStyles from '~/Theme/RowStyles';

import type { ModalStackParamList } from '~/typings';

type Props = {
  name: string;
  value: string;
  list: string[];
  onSelect: (name: string) => void;
};

/** Idol Name Row */
const PickerRow = ({ name, value, list, onSelect }: Props): JSX.Element => {
  const { colors } = useTheme();
  const { openModal } = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: name,
      data: list,
      onPress: onSelect,
      selectedItem: value,
    });
  };

  return (
    <View style={rowStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>{name}</Text>
      </View>
      <TouchableRipple style={rowStyles.flex2} onPress={openList}>
        <View style={rowStyles.selectionButton}>
          <Text>{value}</Text>
          <Icon name='menu-down' size={20} color={colors.text} />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default PickerRow;
