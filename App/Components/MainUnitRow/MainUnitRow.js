import React from 'react'
import { Image } from 'react-native'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import { Images } from '../../Theme'
import rstyles from '../../Theme/RowStyles'

/**
 * Main Unit Row (None, μ's, Aqours)
 *
 * Prop:
 * - `selectMainUnit`: Save `main_unit` state
 * - `main_unit`: state from parent
 * 
 * @export
 * @class MainUnitRow
 * @extends {React.Component}
 */
class MainUnitRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Main unit</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectMainUnit('')}
              success={this.props.main_unit === ''}
              transparent={this.props.main_unit !== ''}
              dark={this.props.main_unit !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectMainUnit(`μ's`)}
              success={this.props.main_unit === `μ's`}
              transparent={this.props.main_unit !== `μ's`}
              style={rstyles.button1}>
              <Image source={Images.mainUnit[0]} style={rstyles.buttonImage1} />
            </Button>
            <Button onPress={this.props.selectMainUnit('Aqours')}
              success={this.props.main_unit === 'Aqours'}
              transparent={this.props.main_unit !== 'Aqours'}
              style={rstyles.button1}>
              <Image source={Images.mainUnit[1]} style={rstyles.buttonImage1} />
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

MainUnitRow.propTypes = {
  main_unit: PropTypes.string.isRequired,
  selectMainUnit: PropTypes.func.isRequired
}

export default MainUnitRow
