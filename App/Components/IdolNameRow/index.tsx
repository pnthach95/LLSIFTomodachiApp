import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useModal } from 'react-native-modalfy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UserContext from '~/Context/UserContext';
import rowStyles from '~/Theme/RowStyles';
import type { ModalStackParamList } from '~/Utils/types';

type Props = {
  name: string;
  selectIdol: (name: string) => void;
};

/**
 * Idol Name Row.
 */
const IdolNameRow: React.FC<Props> = ({ name, selectIdol }) => {
  const { state } = useContext(UserContext);
  const { colors } = useTheme();
  const { openModal } = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: 'Idol',
      data: state.cachedData.idols,
      onPress: selectIdol,
      selectItem: name
    });
  };

  return (
    <View style={rowStyles.pickerRow}>
      <View style={rowStyles.leftView}>
        <Text>Idol</Text>
      </View>
      <TouchableRipple style={rowStyles.flex2} onPress={openList}>
        <View style={rowStyles.selectionButton}>
          <Text>{name}</Text>
          <Icon name='menu-down' size={20} color={colors.text} />
        </View>
      </TouchableRipple>
    </View>
  );
};

IdolNameRow.propTypes = {
  name: PropTypes.any,
  selectIdol: PropTypes.any
};

export default IdolNameRow;
