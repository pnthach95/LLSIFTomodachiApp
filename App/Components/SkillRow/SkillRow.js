import React from 'react'
import { Text, View, Picker } from 'react-native'
import PropTypes from 'prop-types'
import { getSkills } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

const PickerItem = Picker.Item

/**
 * Skill Row
 *
 * @function selectSkill: Save `skill` state
 * @param skill state
 * @export
 * @class SkillRow
 * @extends {React.Component}
 */
class SkillRow extends React.Component {
  static propTypes = {
    skill: PropTypes.string.isRequired,
    selectSkill: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Skill</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={this.props.skill}
            onValueChange={this.props.selectSkill}>
            {this.props.skills.map((item, index) =>
              <PickerItem key={'skill' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  skills: getSkills(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillRow)
