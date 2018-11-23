import React from 'react'
import { Text, View, Picker } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getIdols } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

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
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Idol</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker mode={'dropdown'}
            selectedValue={this.props.name}
            onValueChange={this.props.selectIdol}>
            {this.props.idols.map((item, index) =>
              <Picker.Item key={'idol' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

IdolNameRow.propTypes = {
  name: PropTypes.string.isRequired,
  selectIdol: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  idols: getIdols(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(IdolNameRow)
