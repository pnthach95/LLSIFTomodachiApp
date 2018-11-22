import React from 'react'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import rstyles from '../../Theme/RowStyles'

/**
 * Event Card Row (None, True, False)
 *
 * Prop:
 * - `selectEvent`: Save `is_event` state
 * - `is_event`: state from parent
 * 
 * @export
 * @class EventRow
 * @extends {React.Component}
 */
class EventRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Event</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectEvent('')}
              success={this.props.is_event === ''}
              transparent={this.props.is_event !== ''}
              dark={this.props.is_event !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectEvent('True')}
              success={this.props.is_event === 'True'}
              transparent={this.props.is_event !== 'True'}
              dark={this.props.is_event !== 'True'}
              style={rstyles.button1}>
              <Text uppercase={false}>Only</Text>
            </Button>
            <Button onPress={this.props.selectEvent('False')}
              success={this.props.is_event === 'False'}
              transparent={this.props.is_event !== 'False'}
              dark={this.props.is_event !== 'False'}
              style={rstyles.button1}>
              <Text uppercase={false}>None</Text>
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

EventRow.propTypes = {
  is_event: PropTypes.string.isRequired,
  selectEvent: PropTypes.func.isRequired
}

export default EventRow
