import React from 'react'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import rstyles from '../../Theme/RowStyles'

/**
 * Region Row (None, False, True)
 *
 * - `selectRegion`: Save `japan_only` state
 * - `japan_only` state from parent
 * 
 * @export
 * @class RegionRow
 * @extends {React.Component}
 */
class RegionRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Region</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectRegion('')}
              success={this.props.japan_only === ''}
              transparent={this.props.japan_only !== ''}
              dark={this.props.japan_only !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectRegion('False')}
              success={this.props.japan_only === 'False'}
              transparent={this.props.japan_only !== 'False'}
              dark={this.props.japan_only !== 'False'}
              style={rstyles.button1}>
              <Text uppercase={false}>EN Only</Text>
            </Button>
            <Button onPress={this.props.selectRegion('True')}
              success={this.props.japan_only === 'True'}
              transparent={this.props.japan_only !== 'True'}
              dark={this.props.japan_only !== 'True'}
              style={rstyles.button1}>
              <Text uppercase={false}>JP Only</Text>
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

RegionRow.propTypes = {
  japan_only: PropTypes.string.isRequired,
  selectRegion: PropTypes.func.isRequired
}

export default RegionRow
