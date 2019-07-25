import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, ApplicationStyles } from '~/Theme';

/**
 * TextRow
 *
 * Prop:
 * - item1: {text, flex, textStyle}
 * - item2: {text, flex, textStyle, onPress}
 *
 * @export
 * @class TextRow
 * @extends {React.Component}
 */
export default class TextRow extends React.Component {
  static propTypes = {
    item1: PropTypes.object,
    item2: PropTypes.object,
  }

  render() {
    return (
      <View style={ApplicationStyles.row}>
        <View style={{ flex: this.props.item1.flex }}>
          <Text style={[Fonts.style.normal, this.props.item1.textStyle]}>
            {this.props.item1.text}
          </Text>
        </View>
        <View style={{ flex: this.props.item2.flex }}>
          <Text onPress={this.props.item2.onPress}
            style={[Fonts.style.normal, this.props.item2.textStyle]}>
            {this.props.item2.text}
          </Text>
        </View>
      </View>
    );
  }
}
