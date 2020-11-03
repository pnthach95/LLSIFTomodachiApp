import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import { BooleanOrEmpty } from '~/Utils/type';

type EventRowType = {
  isEvent: BooleanOrEmpty;
  selectEvent: (isEvent: BooleanOrEmpty) => void;
};

/**
 * Event Card Row (None, True, False)
 *
 * Prop:
 * - `selectEvent`: Save `isEvent` state
 * - `isEvent`: state from parent
 *
 * @export
 * @class EventRow
 * @extends {React.Component}
 */
const EventRow: React.FC<EventRowType> = ({ isEvent, selectEvent }) => {
  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Event</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity
          onPress={() => selectEvent('')}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === '' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectEvent('True')}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === 'True' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>Only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectEvent('False')}
          style={[
            styles.textButton,
            styles.standardButton,
            isEvent === 'False' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventRow;
