import React from 'react'
import { Text, Picker, Grid, Col } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getSubunits } from '../../Stores/CachedData/Selectors'
import rstyles from '../../Theme/RowStyles'

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
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Sub unit</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.idol_sub_unit}
            onValueChange={this.props.selectSubUnit}>
            {this.props.subUnits.map((item, index) =>
              <Picker.Item key={'subUnit' + index} label={item} value={item} />)}
          </Picker>
        </Col>
      </Grid>
    )
  }
}

SubUnitRow.propTypes = {
  idol_sub_unit: PropTypes.string.isRequired,
  selectSubUnit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ subUnits: getSubunits(state) })
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SubUnitRow)
