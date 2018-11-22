import React from 'react'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import rstyles from '../../Theme/RowStyles'

/**
 * Year Row (None, First, Second, Third)
 *
 * Prop:
 * - `selectYear`: Save `idol_year` state
 * - `idol_year`: state from parent
 * 
 * @export
 * @class YearRow
 * @extends {React.Component}
 */
class YearRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Year</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectYear('')}
              success={this.props.idol_year === ''}
              transparent={this.props.idol_year !== ''}
              dark={this.props.idol_year !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectYear('First')}
              success={this.props.idol_year === 'First'}
              transparent={this.props.idol_year !== 'First'}
              dark={this.props.idol_year !== 'First'}
              style={rstyles.button1}>
              <Text uppercase={false}>1st</Text>
            </Button>
            <Button onPress={this.props.selectYear('Second')}
              success={this.props.idol_year === 'Second'}
              transparent={this.props.idol_year !== 'Second'}
              dark={this.props.idol_year !== 'Second'}
              style={rstyles.button1}>
              <Text uppercase={false}>2nd</Text>
            </Button>
            <Button onPress={this.props.selectYear('Third')}
              success={this.props.idol_year === 'Third'}
              transparent={this.props.idol_year !== 'Third'}
              dark={this.props.idol_year !== 'Third'}
              style={rstyles.button1}>
              <Text uppercase={false}>3rd</Text>
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

YearRow.propTypes = {
  idol_year: PropTypes.string.isRequired,
  selectYear: PropTypes.func.isRequired
}

export default YearRow
