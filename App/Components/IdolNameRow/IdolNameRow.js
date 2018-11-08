import React from 'react'
import { Text, View, Picker } from 'react-native'
import PropTypes from 'prop-types'
import { getIdols } from '../../Stores/CachedData/Selectors'
import styles from '../../Theme/RowStyles'

const PickerItem = Picker.Item

/**
 * Idol Name Row
 *
 * @function selectIdol: Save `name` state
 * @param name state
 * @export
 * @class IdolNameRow
 * @extends {React.Component}
 */
class IdolNameRow extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    selectIdol: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Idol</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={this.props.name}
            onValueChange={this.props.selectIdol}
          >
            {this.props.idols.map((item, index) =>
              <PickerItem key={'idol' + index} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  idols: getIdols(state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolNameRow)
