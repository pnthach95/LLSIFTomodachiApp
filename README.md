# Love Live School Idol Festival Tomodachi app

This project is a Love Live School Idol Festival app using data from [School Idol Tomodachi](https://schoolido.lu/) and [LLSIF.net](https://llsif.net/)

[![Download APK file here](https://img.shields.io/github/downloads/pnthach95/LLSIFTomodachiApp/total.svg?style=flat-square)](https://github.com/pnthach95/LLSIFTomodachiApp/releases)
[![GitHub issues](https://img.shields.io/github/issues/pnthach95/LLSIFTomodachiApp.svg?style=flat-square)](https://github.com/pnthach95/LLSIFTomodachiApp/issues)

## Content

The project contains:

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Animated TabBar](https://github.com/gorhom/react-native-animated-tabbar)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [apisauce](https://github.com/infinitered/apisauce)
- [React Native Firebase](https://rnfirebase.io)
- [React Native Fast Image](https://github.com/DylanVann/react-native-fast-image)
- [React Native Image Viewing](https://github.com/jobtoday/react-native-image-viewing)
- [React Native Offline](https://github.com/rgommezz/react-native-offline)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native Version Number](https://github.com/APSL/react-native-version-number)
- [React Native Async Storage](https://react-native-async-storage.github.io/async-storage/)
- [react-native-modalfy](https://colorfy-software.gitbook.io/react-native-modalfy/)
- [dayjs](https://day.js.org/)
- And more...

## Directory layout

- [`App/Components`](App/Components): presentational components
- [`App/Config`](App/Config): configuration of the application
- [`App/screens`](App/screens): application's screens
- [`App/Context`](App/Context): react context
- [`App/hooks`](App/hooks): custom react hooks
- [`App/Images`](App/Images): images used by the application
- [`App/modals`](App/modals): modals
- [`App/Services`](App/Services): application services, e.g. API clients
- [`App/Theme`](App/Theme): base styles for the application
- [`App/Utils`](App/Utils): some utility tools

## Requirements

- Node 8 or greater is required.
- Development for iOS requires a Mac and Xcode 11 or up, and will target iOS 10 and up.
- Know about [React Native](https://reactnative.dev).

## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `yarn install` or `npm i` to install the dependencies
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

## Review

| Light                     | Dark                           |
| ------------------------- | ------------------------------ |
| ![01](docs/images/01.png) | ![01](docs/images/01_dark.png) |
| ![02](docs/images/02.png) | ![02](docs/images/02_dark.png) |
| ![03](docs/images/03.png) | ![03](docs/images/03_dark.png) |
| ![04](docs/images/04.png) | ![04](docs/images/04_dark.png) |
| ![05](docs/images/05.png) | ![05](docs/images/05_dark.png) |
| ![06](docs/images/06.png) | ![06](docs/images/06_dark.png) |
| ![07](docs/images/07.png) | ![07](docs/images/07_dark.png) |
| ![08](docs/images/08.png) | ![08](docs/images/08_dark.png) |
| ![09](docs/images/09.png) | ![09](docs/images/09_dark.png) |
| ![10](docs/images/10.png) | ![10](docs/images/10_dark.png) |
| ![11](docs/images/11.png) | ![11](docs/images/11_dark.png) |

## Author

Phạm Ngọc Thạch

I'm a React Native developer, play Love Live, BanGDream, Starlight everyday.

## License

© Phạm Ngọc Thạch

This project is released under the [MIT License](LICENSE).

## Version up

`yarn run version:up -- --major || --minor || --patch`
