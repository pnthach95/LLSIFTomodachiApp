import React from 'react'
import { Image } from 'react-native'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import { Images } from '../../Theme'
import rstyles from '../../Theme/RowStyles'

/**
 * Attribute Row (None, Smile, Pure, Cool, All)
 *
 * Prop:
 * - `selectAttribute`: Save `attribute` state
 * - `attribute`: state from parent
 * 
 * @export
 * @class AttributeRow
 * @extends {React.Component}
 */
class AttributeRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Attribute</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectAttribute('')}
              success={this.props.attribute === ''}
              transparent={this.props.attribute !== ''}
              style={rstyles.button1}>
              <Image source={Images.empty} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectAttribute('Smile')}
              success={this.props.attribute === 'Smile'}
              transparent={this.props.attribute !== 'Smile'}
              style={rstyles.button1}>
              <Image source={Images.attribute[0]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectAttribute('Pure')}
              success={this.props.attribute === 'Pure'}
              transparent={this.props.attribute !== 'Pure'}
              style={rstyles.button1}>
              <Image source={Images.attribute[1]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectAttribute('Cool')}
              success={this.props.attribute === 'Cool'}
              transparent={this.props.attribute !== 'Cool'}
              style={rstyles.button1}>
              <Image source={Images.attribute[2]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectAttribute('All')}
              success={this.props.attribute === 'All'}
              transparent={this.props.attribute !== 'All'}
              style={rstyles.button1}>
              <Image source={Images.attribute[3]} style={rstyles.buttonImage} />
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

AttributeRow.propTypes = {
  attribute: PropTypes.string.isRequired,
  selectAttribute: PropTypes.func.isRequired
}

export default AttributeRow
