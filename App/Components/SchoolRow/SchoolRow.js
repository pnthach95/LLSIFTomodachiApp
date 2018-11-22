import React from 'react'
import { Text, Picker, Grid, Col } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSchools } from '../../Stores/CachedData/Selectors'
import rstyles from '../../Theme/RowStyles'

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
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>School</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.idol_school}
            onValueChange={this.props.selectSchool}>
            {this.props.schools.map((item, index) =>
              <Picker.Item key={'school' + index} label={item} value={item} />)}
          </Picker>
        </Col>
      </Grid>
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
