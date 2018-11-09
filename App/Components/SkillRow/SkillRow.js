import React from 'react'
import { Text, View, Picker } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSkills } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

/**
 * Skill Row.
 * 
 * Skill list in `this.props.skills`.
 * 
 * Prop:
 * - `selectSkill`: Save `skill` state
 * - `skill`: state from parent
 * 
 * @export
 * @class SkillRow
 * @extends {React.Component}
 */
class SkillRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Skill</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.skill}
            onValueChange={this.props.selectSkill}>
            {this.props.skills.map((item, index) =>
              <Picker.Item key={'skill' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

SkillRow.propTypes = {
  skill: PropTypes.string.isRequired,
  selectSkill: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  skills: getSkills(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SkillRow)
