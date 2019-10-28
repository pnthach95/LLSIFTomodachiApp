# Love Live School Idol Festival Tomodachi app

This project is a Love Live School Idol Festival app using data from [School Idol Tomodachi](http://schoolido.lu/)

[![Download APK file here](https://img.shields.io/github/downloads/pnthach95/LLSIFTomodachiApp/total.svg?style=flat-square)](https://github.com/pnthach95/LLSIFTomodachiApp/releases)
[![GitHub issues](https://img.shields.io/github/issues/pnthach95/LLSIFTomodachiApp.svg?style=flat-square)](https://github.com/pnthach95/LLSIFTomodachiApp/issues)

## Content

The project contains:

- [React Native](https://facebook.github.io/react-native/) (v0.61.2)
- [Redux](https://redux.js.org/) (v4.0.4)
- [Redux Saga](https://redux-saga.js.org) (v1.1.1)
- [Redux Saga Thunk](https://github.com/diegohaz/redux-saga-thunk) (v0.7.3)
- [React Navigation](https://reactnavigation.org/) (v4.0.10)
- [apisauce](https://github.com/infinitered/apisauce) (v1.1.1)
- [React Native Firebase](http://rnfirebase.io) (v5.5.6, for push notification)
- [React Native Fast Image](https://github.com/DylanVann/react-native-fast-image) (v7.0.2)
- [React Native Image Gallery](https://github.com/archriss/react-native-image-gallery) (v2.1.5)
- [React Native Picker Select](https://github.com/lawnstarter/react-native-picker-select) (v6.3.3)
- [React Native Sentry](https://sentry.io) (v1.0.6)
- [React Native Linear Gradienet](https://github.com/react-native-community/react-native-linear-gradient) (v2.5.6)
- [React Native Offline](https://github.com/rgommezz/react-native-offline) (v5.1.0)
- [React Native Indicators](https://github.com/n4kz/react-native-indicators) (v0.14.0)
- [Moment](https://momentjs.com/) (v2.24.0)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) (v6.6.0)
- [React Native Version Number](https://github.com/APSL/react-native-version-number) (v0.3.6)
- [async-storage](https://github.com/react-native-community/react-native-async-storage) (v1.6.2)
- And more...

## Directory layout

- [`App/Components`](App/Components): presentational components
- [`App/Config`](App/Config): configuration of the application
- [`App/Containers`](App/Containers): container components, i.e. the application's screens
- [`App/Images`](App/Images): images used by the application
- [`App/Sagas`](App/Sagas): redux sagas
- [`App/Services`](App/Services): application services, e.g. API clients
- [`App/Stores`](App/Stores): redux [actions, reducers and stores](https://redux.js.org/basics)
- [`App/Theme`](App/Theme): base styles for the application
- [`App/Utils`](App/Utils): some utility tools

## Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `yarn install` or `npm i` to install the dependencies
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

## Review

![01](docs/images/0.2.3/01.png)
![02](docs/images/0.2.3/02.png)
![03](docs/images/0.2.3/03.png)
![04](docs/images/0.2.3/04.png)
![05](docs/images/0.2.3/05.png)
![06](docs/images/0.2.3/06.png)
![07](docs/images/0.2.3/07.png)
![08](docs/images/0.2.3/08.png)
![09](docs/images/0.2.3/09.png)
![10](docs/images/0.2.3/10.png)
![11](docs/images/0.2.3/11.png)
![12](docs/images/0.2.3/12.png)

## TODO:

- Dark mode.

## Author

Phạm Ngọc Thạch

Email: [thachxyz123@gmail.com](mailto:thachxyz123@gmail.com)

I'm a React Native developer, play Love Live, BanGDream, Starlight everyday.

## License

© Phạm Ngọc Thạch

This project is released under the [MIT License](LICENSE).

## Version up

`npm run version:up -- --major || --minor || --patch`
