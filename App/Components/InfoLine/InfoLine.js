import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { openLink } from '../../Utils';
import styles from './styles';

/**
 * InfoLine
 *
 * Prop:
 * - title
 * - content
 *
 * @export
 * @class InfoLine
 * @extends {React.Component}
 */
export default class InfoLine extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    myanimelist: PropTypes.string
  }

  static defaultProps = {
    twitter: null,
    instagram: null,
    myanimelist: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View>
          <Text selectable style={styles.content}>{this.props.content}</Text>
          {this.props.twitter !== null &&
            <Text style={styles.content}>
              Twitter: <Text onPress={() => openLink('https://twitter.com/' + this.props.twitter)}
                style={[styles.content, styles.link]}>
                {this.props.twitter}
              </Text>
            </Text>}
          {this.props.instagram !== null &&
            <Text style={styles.content}>
              Instagram: <Text onPress={() => openLink('https://www.instagram.com/' + this.props.instagram)}
                style={[styles.content, styles.link]}>
                {this.props.instagram}
              </Text>
            </Text>}
          {this.props.myanimelist !== null &&
            <Text style={styles.content}>
              MyAnimeList: <Text onPress={() => openLink(this.props.myanimelist)}
                style={[styles.content, styles.link]}>
                {this.props.myanimelist}
              </Text>
            </Text>}
        </View>
      </View>
    );
  }
}
