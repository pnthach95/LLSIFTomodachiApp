export const Config = {
  DATETIME_FORMAT_OUTPUT: 'HH:mm MMM Do YYYY',
  DATE_FORMAT_OUTPUT: 'MMM Do YYYY',
  DATETIME_FORMAT_INPUT: 'YYYY-MM-DDTHH:mm:ssZ',
  API_URL: 'https://schoolido.lu/api/',
  SCHOOLIDO: 'https://schoolido.lu',
  LLSIFNET: 'https://llsif.net',
  CACHED_DATA: 'cacheddata/',
  CARDS: 'cards/',
  IDOLS: 'idols/',
  SONGS: 'songs/',
  EVENTS: 'events/',
  CARDIDS: 'cardids/',
  GITHUB_API: 'https://api.github.com/repos/',
  REPO: 'pnthach95/LLSIFTomodachiApp/releases',
  GITHUB_PROJECT: 'https://github.com/pnthach95/LLSIFTomodachiApp',
  DEFAULT_BACKGROUND: '//i.schoolido.lu/c/1722idolizedRuby.png'
};

export const OrderingGroup = {
  CARD: [
    { label: 'Game ID', value: 'game_id' },
    { label: 'Release date', value: 'release_date' },
    { label: 'Idol', value: 'name' },
    { label: "Smile's statistics", value: 'idolized_maximum_statistics_smile' },
    { label: "Pure's statistics", value: 'idolized_maximum_statistics_pure' },
    { label: "Cool's statistics", value: 'idolized_maximum_statistics_cool' },
    { label: 'Rarity', value: 'rarity' },
    { label: 'Attribute', value: 'attribute' },
    { label: 'HP', value: 'hp' }
  ],
  SONG: [
    { label: 'Date added', value: 'id' },
    { label: 'Latest unlocked songs', value: 'latest' },
    { label: 'Song name', value: 'name' },
    { label: 'Beats per minute', value: 'BPM' },
    { label: 'Song length', value: 'time' },
    { label: 'Rank to unlock song', value: 'rank' },
    { label: 'Notes in Hard song', value: 'hard_notes' },
    { label: 'Notes in Expert song', value: 'expert_notes' },
    { label: 'Notes in Master song', value: 'master_notes' }
  ]
};

export const RELEASE_NOTE = `This app is free and open-source.

Change log:
- Version 0.4.0:
  • Rework UI.

- Version 0.3.4:
  • Small bugfix.

- Version 0.3.3:
  • Small bugfix.

- Version 0.3.2:
  • Fix Worldwide event banner in home.

- Version 0.3.1:
  • Fix notification for Android O and above.
  • Fix layout for Shadowverse event, because there is no normal round card image.

- Version 0.3.0:
  • Add LLSIF Tier cutoff data (from llsif.net) to Event detail screen.
  • Add offline warning.
  • Fix open event has '?' in Japanese name.
  • Fix load idol list temporarily. Not show no-school characters in list.
  • Update UI.

- Version 0.2.3:
  • Show notification when new update is available.
  • New view mode in Card screen.
  • Update UI.

- Version 0.2.2:
  • This version should fix memory leaking issue on some devices.

- Version 0.2.1:
  • Add notification icons.

- Version 0.2.0:
  • Add app icon.
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
  Initial release.`;

export const EventStatus = {
  UNKNOWN: 'unknown',
  ANNOUNCED: 'announced',
  ONGOING: 'ongoing',
  FINISHED: 'finished'
};

export const FirebaseTopic = {
  JP_EVENT: __DEV__ ? 'jp_event_test' : 'jp_event',
  WW_EVENT: __DEV__ ? 'ww_event_test' : 'ww_event',
  MESSAGE: __DEV__ ? 'test_only' : 'admin_message'
};
