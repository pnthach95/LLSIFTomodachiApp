import React from 'react'
import { View, Platform } from 'react-native'
import PhotoView from 'react-native-photo-view'
import { TabView, PagerScroll, PagerPan } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

export default class ImageViewerScreen extends React.Component {
  constructor(props) {
    super(props)
    const { images, index } = this.props.navigation.state.params
    this.state = {
      loading: true,
      index: index,
      images: images.map(image => ({
        url: image,
        loading: true,
      })),
      routes: images.map((image, index) => ({ key: index + 'image' })),
      hideHeader: true,
    };
  }

  renderPager = props =>
    Platform.OS === 'ios'
      ? <PagerScroll {...props} />
      : <PagerPan {...props} />;

  renderScene = ({ route }) => {
    if (Math.abs(this.state.index - this.state.routes.indexOf(route)) > 2) {
      return null;
    }
    const image = this.state.images[parseInt(route.key[0])].url;
    return (
      <View key={image.url} style={styles.slide}>
        <PhotoView
          source={{ uri: image.url }}
          resizeMode="contain"
          androidScaleType="fitCenter"
          minimumZoomScale={1}
          maximumZoomScale={3}
          style={styles.photo} />
      </View>
    );
  };

  handleChangeTab = index => this.setState({ index })

  render() {
    return (
      <View style={styles.container}>
        <Icon name={'ios-close'} size={40} color={'white'}
          onPress={() => this.props.navigation.goBack()}
          style={styles.close} />
        <TabView
          renderTabBar={() => <View />}
          style={styles.slide}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderPager={this.renderPager}
          onIndexChange={this.handleChangeTab} />
      </View>
    )
  }
}
