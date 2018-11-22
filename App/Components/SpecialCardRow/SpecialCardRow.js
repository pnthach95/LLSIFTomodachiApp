import React from 'react'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import rstyles from '../../Theme/RowStyles'

/**
 * Special Card Row (None, True, False)
 * 
 * Prop:
 * - `selectSpecial`: Save `is_special` state
 * - `is_special`: state from parent
 * 
 * @export
 * @class SpecialCardRow
 * @extends {React.Component}
 */
class SpecialCardRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Special card</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectSpecial('')}
              success={this.props.is_special === ''}
              transparent={this.props.is_special !== ''}
              dark={this.props.is_special !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectSpecial('True')}
              success={this.props.is_special === 'True'}
              transparent={this.props.is_special !== 'True'}
              dark={this.props.is_special !== 'True'}
              style={rstyles.button1}>
              <Text uppercase={false}>Only</Text>
            </Button>
            <Button onPress={this.props.selectSpecial('False')}
              success={this.props.is_special === 'False'}
              transparent={this.props.is_special !== 'False'}
              dark={this.props.is_special !== 'False'}
              style={rstyles.button1}>
              <Text uppercase={false}>None</Text>
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

SpecialCardRow.propTypes = {
  is_special: PropTypes.string.isRequired,
  selectSpecial: PropTypes.func.isRequired
}

export default SpecialCardRow
