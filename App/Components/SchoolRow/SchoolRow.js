import React from 'react'
import { Text, View, Picker } from 'react-native'
import PropTypes from 'prop-types'
import { getSchools } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

const PickerItem = Picker.Item

/**
 * School Row
 *
 * @function selectSchool: Save `idol_school` state
 * @param idol_school state
 * @export
 * @class SchoolRow
 * @extends {React.Component}
 */
class SchoolRow extends React.Component {
  static propTypes = {
    idol_school: PropTypes.string.isRequired,
    selectSchool: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>School</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={this.props.idol_school}
            onValueChange={this.props.selectSchool}>
            {this.props.schools.map((item, index) =>
              <PickerItem key={'school' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  schools: getSchools(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolRow)
