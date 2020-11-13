import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type Props = {
  isEvent: BooleanOrEmpty;
  selectEvent: (isEvent: BooleanOrEmpty) => void;
};

/**
 * Event Card Row (None, True, False)
 *
 * Prop:
 * - `selectEvent`: Save `isEvent` state
 * - `isEvent`: state from parent
 */
const EventRow: React.FC<Props> = ({ isEvent, selectEvent }) => {
  const none = () => selectEvent('');
  const sTrue = () => selectEvent('True');
  const sFalse = () => selectEvent('False');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Event</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === '' && styles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === 'True' && styles.selectedValue,
          ]}>
          <Text>Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === 'False' && styles.selectedValue,
          ]}>
          <Text>None</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

EventRow.propTypes = {
  isEvent: PropTypes.any,
  selectEvent: PropTypes.any,
};

export default EventRow;
