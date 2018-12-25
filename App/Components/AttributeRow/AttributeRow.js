import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Images, ApplicationStyles } from '../../Theme';
import styles from '../../Theme/RowStyles';

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
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Attribute</Text>
        </View>
        <View style={styles.rightView}>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={this.props.selectAttribute('')}
              style={[
                styles.standardButton,
                { paddingLeft: 0 },
                this.props.attribute === '' && styles.selectedValue1
              ]}>
              <Image source={Images.empty} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectAttribute('Smile')}
              style={[
                styles.standardButton,
                this.props.attribute === 'Smile' && styles.selectedValue1
              ]}>
              <Image source={Images.attribute[0]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectAttribute('Pure')}
              style={[
                styles.standardButton,
                this.props.attribute === 'Pure' && styles.selectedValue1
              ]}>
              <Image source={Images.attribute[1]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectAttribute('Cool')}
              style={[
                styles.standardButton,
                this.props.attribute === 'Cool' && styles.selectedValue1
              ]}>
              <Image source={Images.attribute[2]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectAttribute('All')}
              style={[
                styles.standardButton,
                this.props.attribute === 'All' && styles.selectedValue1
              ]}>
              <Image source={Images.attribute[3]} style={styles.buttonImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

AttributeRow.propTypes = {
  attribute: PropTypes.string.isRequired,
  selectAttribute: PropTypes.func.isRequired
};

export default AttributeRow;
