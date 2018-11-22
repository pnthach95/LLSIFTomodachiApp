import React from 'react'
import { Image } from 'react-native'
import { Text, Row, Button, Grid, Col } from 'native-base'
import PropTypes from 'prop-types'
import { Images } from '../../Theme'
import rstyles from '../../Theme/RowStyles'

/**
 * Rarity Row (None, N, R, SR, SSR, UR)
 *
 * Prop:
 * - `selectRarity`: Save `rarity` state
 * - `rarity`: state from parent
 * 
 * @export
 * @class RarityRow
 * @extends {React.Component}
 */
class RarityRow extends React.Component {
  render() {
    return (
      <Grid>
        <Col style={rstyles.leftView}>
          <Text>Rarity</Text>
        </Col>
        <Col style={rstyles.rightView}>
          <Row>
            <Button onPress={this.props.selectRarity('')}
              success={this.props.rarity === ''}
              transparent={this.props.rarity !== ''}
              style={rstyles.button1}>
              <Image source={Images.empty} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectRarity('N')}
              success={this.props.rarity === 'N'}
              transparent={this.props.rarity !== 'N'}
              style={rstyles.button1}>
              <Image source={Images.rarity[0]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectRarity('R')}
              success={this.props.rarity === 'R'}
              transparent={this.props.rarity !== 'R'}
              style={rstyles.button1}>
              <Image source={Images.rarity[1]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectRarity('SR')}
              success={this.props.rarity === 'SR'}
              transparent={this.props.rarity !== 'SR'}
              style={rstyles.button1}>
              <Image source={Images.rarity[2]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectRarity('SSR')}
              success={this.props.rarity === 'SSR'}
              transparent={this.props.rarity !== 'SSR'}
              style={rstyles.button1}>
              <Image source={Images.rarity[3]} style={rstyles.buttonImage} />
            </Button>
            <Button onPress={this.props.selectRarity('UR')}
              success={this.props.rarity === 'UR'}
              transparent={this.props.rarity !== 'UR'}
              style={rstyles.button1}>
              <Image source={Images.rarity[4]} style={rstyles.buttonImage} />
            </Button>
          </Row>
        </Col>
      </Grid>
    )
  }
}

RarityRow.propTypes = {
  rarity: PropTypes.string.isRequired,
  selectRarity: PropTypes.func.isRequired
}

export default RarityRow
