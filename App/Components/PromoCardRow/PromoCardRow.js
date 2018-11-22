import React from 'react'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import rstyles from '../../Theme/RowStyles'

/**
 * Promo Card Row (None, True, False)
 *
 * Prop:
 * - `selectPromo`: Save `is_promo` state
 * - `is_promo`: state from parent
 * 
 * @export
 * @class PromoCardRow
 * @extends {React.Component}
 */
class PromoCardRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Promo card</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectPromo('')}
              success={this.props.is_promo === ''}
              transparent={this.props.is_promo !== ''}
              dark={this.props.is_promo !== ''}
              style={rstyles.button1}>
              <Text uppercase={false}>All</Text>
            </Button>
            <Button onPress={this.props.selectPromo('True')}
              success={this.props.is_promo === 'True'}
              transparent={this.props.is_promo !== 'True'}
              dark={this.props.is_promo !== 'True'}
              style={rstyles.button1}>
              <Text uppercase={false}>Only</Text>
            </Button>
            <Button onPress={this.props.selectPromo('False')}
              success={this.props.is_promo === 'False'}
              transparent={this.props.is_promo !== 'False'}
              dark={this.props.is_promo !== 'False'}
              style={rstyles.button1}>
              <Text uppercase={false}>None</Text>
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

PromoCardRow.propTypes = {
  is_promo: PropTypes.string.isRequired,
  selectPromo: PropTypes.func.isRequired
}

export default PromoCardRow
