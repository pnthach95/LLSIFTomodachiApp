import React from 'react';
import { View, Text } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default class ImageViewerScreen extends React.Component {
  constructor(props) {
    super(props);
    const { images, index } = this.props.navigation.state.params;
    this.state = {
      loading: true,
      index: index,
      images: images.map(image => ({ source: { uri: image.url } })),
      hideHeader: false
    };
  }

  _handleOnPressImage = () => this.setState(prevState => ({ hideHeader: !prevState.hideHeader }));

  _onChangeImage = (index) => this.setState({ index });

  header() {
    return (
      <View style={styles.headerAbsolutePosition}>
        <Icon name={'ios-close'} size={40} color={'white'}
          onPress={() => this.props.navigation.goBack()}
          style={styles.close} />
      </View>)
  }

  error = () => <View style={styles.loaderContainer}>
    <Icon name={'ios-close-circle-outline'} color={'red'} size={60} />
    <Text style={styles.textCenter}>This image cannot be displayed</Text>
  </View>

  render() {
    const { index } = this.props.navigation.state.params;
    let { images, hideHeader } = this.state;
    return (
      <View style={styles.container}>
        <Gallery images={images} pageMargin={10}
          style={styles.container} initialPage={index}
          onPageSelected={this._onChangeImage}
          errorComponent={this.error}
          onSingleTapConfirmed={this._handleOnPressImage} />
        {hideHeader || this.header()}
      </View>
    )
  }
}
