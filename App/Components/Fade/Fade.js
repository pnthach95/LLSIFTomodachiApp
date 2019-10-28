import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

/**
 * [Tutorial here!](https://goshakkk.name/react-native-animated-appearance-disappearance/)
 *
 * Prop
 * - visible:
 *
 * @export
 * @class Fade
 * @extends {Component}
 */
export default class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
    this.visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  static propTypes = {
    visible: PropTypes.any,
    style: PropTypes.any,
    children: PropTypes.any,
  };

  static getDerivedStateFromProps(nextProps) {
    return { visible: nextProps.visible };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    Animated.timing(this.visibility, {
      toValue: this.state.visible ? 1 : 0,
      duration: 500,
    }).start();
  }

  render() {
    const {
      visible, style, children, ...rest
    } = this.props;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}
