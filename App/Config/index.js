export const Config = {
  DATETIME_FORMAT_OUTPUT: 'HH:mm MMM Do YYYY',
  DATETIME_FORMAT_INPUT: 'YYYY-MM-DDTHH:mm:ssZ',
  API_URL: 'https://schoolido.lu/api/',
  SCHOOLIDO: 'https://schoolido.lu',
  CACHED_DATA: 'cacheddata/',
  CARDS: 'cards/',
  IDOLS: 'idols/',
  SONGS: 'songs/',
  EVENTS: 'events/',
  CARDIDS: 'cardids/',
  GITHUB_PROJECT: 'https://github.com/pnthach95/LLSIFTomodachiApp',
  DEFAULT_BACKGROUND: '//i.schoolido.lu/c/1722idolizedRuby.png'
}

export const RELEASE_NOTE = `This app is open-source.

Press Version to view background.

Change log:

- Version 0.2.0:
  • Add icon app.
  • Add notification when events started.
  • Update notifications settings.
  • Fix UI.

- Version 0.1.1:
  • Update countdown text, image viewer.
  • Show upcoming events in home screen.
  • Fix UI.

- Version 0.1.0:
  • Add drawer button.
  • Add "Worldwide only" option.
  • Add card viewer.
  • Fix chibi images in Idol tab.
  • Fix 404 error.
  • Change some UIs.
  
- Version 0.0.1:
  Initial release.`

export const EventStatus = {
  UNKNOWN: 'unknown',
  ANNOUNCED: 'announced',
  ONGOING: 'ongoing',
  FINISHED: 'finished'
}

export const FirebaseTopic = {
  JP_EVENT: (__DEV__) ? 'jp_event_test' : 'jp_event',
  WW_EVENT: (__DEV__) ? 'ww_event_test' : 'ww_event',
  MESSAGE: (__DEV__) ? 'admin_message' : 'test_only'
}
