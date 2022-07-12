import {responsiveWidth} from 'react-native-responsive-dimensions';

export default {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  navBarHeight: 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
    cardWidth: 512,
    cardHeight: 720,
    itemWidth: (responsiveWidth(100) - 10) / 2 - 10,
    smallItemWidth: (responsiveWidth(100) - 10) / 3 - 10,
  },
  widthBanner: responsiveWidth(100) - 40,
};
