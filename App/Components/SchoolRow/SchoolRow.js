import React from 'react'
import { Text, View, Picker, Platform } from 'react-native'
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
          <Picker mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
            selectedValue={this.props.idol_school}
            onValueChange={this.props.selectSchool}>
            {this.props.schools.map((item, index) =>
              <Picker.Item key={'school' + index} label={item} value={item} />)}
          </Picker>
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
