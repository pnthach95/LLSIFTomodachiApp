import { Colors } from '../Theme'

export const AddHTTPS = (link) => {
  return 'https:' + link
}

export const findColorByAttribute = (key) => {
  switch (key) {
    case 'Smile':
      return [Colors.pink, Colors.lightPink]
    case 'Pure':
      return [Colors.green, Colors.lightGreen]
    case 'Cool':
      return [Colors.blue, Colors.lightBlue]
    default:
      return [Colors.violet, Colors.lightViolet]
  }
}
