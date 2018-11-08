import React from 'react'
import { Text, View, Picker } from 'react-native'
import PropTypes from 'prop-types'
import { getSubunits } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

const PickerItem = Picker.Item

/**
 * Sub Unit Row
 *
 * @function selectSubUnit: Save `idol_sub_unit` state
 * @param idol_sub_unit state
 * @export
 * @class SubUnitRow
 * @extends {React.Component}
 */
class SubUnitRow extends React.Component {
  static propTypes = {
    idol_sub_unit: PropTypes.string.isRequired,
    selectSubUnit: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Sub unit</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={this.props.idol_sub_unit}
            onValueChange={this.props.selectSubUnit}>
            {this.props.subUnits.map((item, index) =>
              <PickerItem key={'subUnit' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  subUnits: getSubunits(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubUnitRow)
