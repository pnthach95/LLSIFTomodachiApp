import React from 'react'
import { Text, Picker, Grid, Col } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSkills } from '../../Stores/CachedData/Selectors'
import rstyles from '../../Theme/RowStyles'

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
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Skill</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.skill}
            onValueChange={this.props.selectSkill}>
            {this.props.skills.map((item, index) =>
              <Picker.Item key={'skill' + index} label={item} value={item} />)}
          </Picker>
        </Col>
      </Grid>
    )
  }
}

SkillRow.propTypes = {
  skill: PropTypes.string.isRequired,
  selectSkill: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ skills: getSkills(state) })
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SkillRow)
