import React from 'react'
import { Text, View, Picker } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSubunits } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

/**
 * Sub Unit Row.
 * 
 * Sub Unit list in `this.props.subUnits`.
 *
 * Prop:
 * - `selectSubUnit`: Save `idol_sub_unit` state
 * - `idol_sub_unit`: state from parent
 * 
 * @export
 * @class SubUnitRow
 * @extends {React.Component}
 */
class SubUnitRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Sub unit</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.idol_sub_unit}
            onValueChange={this.props.selectSubUnit}>
            {this.props.subUnits.map((item, index) =>
              <Picker.Item key={'subUnit' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

SubUnitRow.propTypes = {
  idol_sub_unit: PropTypes.string.isRequired,
  selectSubUnit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  subUnits: getSubunits(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SubUnitRow)
