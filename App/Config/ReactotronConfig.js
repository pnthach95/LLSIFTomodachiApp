import Reactotron, { asyncStorage } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import apisaucePlugin from 'reactotron-apisauce'

const reactotron = Reactotron
  .configure({ name: 'Love Live', host: '192.168.1.142', port: 9090 })
  .useReactNative()
  .use(asyncStorage())
  .use(reactotronRedux())
  .use(sagaPlugin())
  .use(apisaucePlugin())
  .connect()

if (__DEV__) {
  reactotron.connect()
  reactotron.clear()
}

export default reactotron
