import { Colors, Images } from '../Theme'

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

export const findMainUnit = (key) => {
  switch (key) {
    case 'Aqours':
      return Images.mainUnit[1]
    case `μ's`:
      return Images.mainUnit[0]
    default:
      return null
  }
}

export const findSubUnit = (key) => {
  switch (key) {
    case 'Printemps':
      return Images.subUnit[0]
    case 'Lily White':
      return Images.subUnit[1]
    case 'Bibi':
      return Images.subUnit[2]
    case 'CYaRon!':
      return Images.subUnit[3]
    case 'AZALEA':
      return Images.subUnit[4]
    case 'Guilty Kiss':
      return Images.subUnit[5]
    case 'Saint Snow':
      return Images.subUnit[6]
    case 'A-RISE':
      return Images.subUnit[7]
    default:
      return null
  }
}
