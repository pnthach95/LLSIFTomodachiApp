const logo = require('../Images/others/logo_shadow.png');
const promo = require('../Images/others/promo.png');
const event = require('../Images/others/event.png');
const empty = require('../Images/others/empty.png');
const alpaca = require('../Images/others/small_Alpaca.png');
const twoColumns = require('../Images/others/two_columns.png');
const oneColumns = require('../Images/others/one_column.png');
const scoreUp = require('../Images/skills/score_up.png');
const perfectLock = require('../Images/skills/perfect_lock.png');
const healer = require('../Images/skills/healer.png');
const special = require('../Images/skills/special.png');
const japan = require('../Images/regions/japan.png');
const world = require('../Images/regions/world.png');
const mainUnit0 = require('../Images/units/0.png');
const mainUnit1 = require('../Images/units/1.png');
const sub0 = require('../Images/subunits/0.png');
const sub1 = require('../Images/subunits/1.png');
const sub2 = require('../Images/subunits/2.png');
const sub3 = require('../Images/subunits/3.png');
const sub4 = require('../Images/subunits/4.png');
const sub5 = require('../Images/subunits/5.png');
const sub6 = require('../Images/subunits/6.png');
const sub7 = require('../Images/subunits/7.png');

const attribute0 = require('../Images/attribute/0.png');
const attribute1 = require('../Images/attribute/1.png');
const attribute2 = require('../Images/attribute/2.png');
const attribute3 = require('../Images/attribute/3.png');

const n = require('../Images/rarity/N.png');
const r = require('../Images/rarity/R.png');
const sr = require('../Images/rarity/SR.png');
const ssr = require('../Images/rarity/SSR.png');
const ur = require('../Images/rarity/UR.png');

const column = [twoColumns, oneColumns];
const skill = [scoreUp, perfectLock, healer, special];
const region = [japan, world];
const mainUnit = [mainUnit0, mainUnit1];
const subUnit = [sub0, sub1, sub2, sub3, sub4, sub5, sub6, sub7];
const attribute = [attribute0, attribute1, attribute2, attribute3];
const rarity = [n, r, sr, ssr, ur];

export default {
  logo,
  promo,
  event,
  empty,
  alpaca,
  column,
  skill,
  region,
  mainUnit,
  subUnit,
  attribute,
  rarity,
};
