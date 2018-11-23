import React from 'react'
import { Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSchools } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

/**
 * School Row.
 * 
 * School list in `this.props.schools`.
 * 
 * Prop:
 * - `selectSchool`: Save `idol_school` state
 * - `idol_school`: state from parent
 * 
 * @export
 * @class SchoolRow
 * @extends {React.Component}
 */
class SchoolRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>School</Text>
        </View>
        <View style={{ flex: 2 }}>
          <RNPickerSelect onValueChange={this.props.selectSchool}
            items={this.props.schools}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.idol_school} />
        </View>
      </View>
    )
  }
}

SchoolRow.propTypes = {
  idol_school: PropTypes.string.isRequired,
  selectSchool: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ schools: getSchools(state) })
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SchoolRow)
