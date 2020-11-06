import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useModal } from 'react-native-modalfy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import rowStyles from '~/Theme/RowStyles';
import type { ModalStackParamList, SkillType } from '~/Utils/types';

type Props = {
  name: string;
  value: string;
  list: string[];
  onSelect: (name: string & SkillType) => void;
};

/**
 * Idol Name Row.
 */
const PickerRow: React.FC<Props> = ({ name, value, list, onSelect }) => {
  const { colors } = useTheme();
  const { openModal } = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: name,
      data: list,
      onPress: onSelect,
      selectItem: value
    });
  };

  return (
    <View style={rowStyles.pickerRow}>
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

PickerRow.propTypes = {
  name: PropTypes.any,
  value: PropTypes.any,
  list: PropTypes.any,
  onSelect: PropTypes.any
};

export default PickerRow;
