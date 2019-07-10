import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIdols } from '../../Stores/CachedData/Selectors';
import styles from '../../Theme/RowStyles';

/**
 * Idol Name Row.
 *
 * Idol list in `this.props.idols`.
 *
 * Prop:
 * - `selectIdol`: Save `name` state
 * - `name`: state from parent
 *
 * @export
 * @class IdolNameRow
 * @extends {React.Component}
 */
class IdolNameRow extends React.Component {
  render() {
    return (
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>Idol</Text>
        </View>
        <View style={{ flex: 2 }}>
          <RNPickerSelect onValueChange={this.props.selectIdol}
            items={this.props.idols}
            hideIcon={true}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            placeholderTextColor={'black'}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.name} />
        </View>
      </View>
    );
  }
}

IdolNameRow.propTypes = {
  name: PropTypes.string.isRequired,
  selectIdol: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ idols: getIdols(state) });
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(IdolNameRow);
