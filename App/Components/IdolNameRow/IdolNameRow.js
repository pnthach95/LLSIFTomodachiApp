import React from 'react'
import { connect } from 'react-redux'
import { Text, Picker, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import { getIdols } from '../../Stores/CachedData/Selectors'
import rstyles from '../../Theme/RowStyles'

/**
 * Idol Name Row.
 * 
 * Idol list in `this.props.idols`.
 *
 * Prop:
 * - `selectIdol`: Save `name` state
 * - `name`: state from parent
 * 
 * @export
 * @class IdolNameRow
 * @extends {React.Component}
 */
class IdolNameRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Idol</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.name}
            onValueChange={this.props.selectIdol}>
            {this.props.idols.map((item, index) =>
              <Picker.Item key={'idol' + index} label={item} value={item} />)}
          </Picker>
        </Col>
      </Grid>
    )
  }
}

IdolNameRow.propTypes = {
  name: PropTypes.string.isRequired,
  selectIdol: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ idols: getIdols(state) })
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(IdolNameRow)
