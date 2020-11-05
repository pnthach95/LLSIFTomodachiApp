import logo from '../Images/others/logo_shadow.png';
import promo from '../Images/others/promo.png';
import event from '../Images/others/event.png';
import empty from '../Images/others/empty.png';
import alpaca from '../Images/others/small_Alpaca.png';
import scoreUp from '../Images/skills/score_up.png';
import perfectLock from '../Images/skills/perfect_lock.png';
import healer from '../Images/skills/healer.png';
import special from '../Images/skills/special.png';
import japan from '../Images/regions/japan.png';
import world from '../Images/regions/world.png';
import mainUnit0 from '../Images/units/0.png';
import mainUnit1 from '../Images/units/1.png';
import sub0 from '../Images/subunits/0.png';
import sub1 from '../Images/subunits/1.png';
import sub2 from '../Images/subunits/2.png';
import sub3 from '../Images/subunits/3.png';
import sub4 from '../Images/subunits/4.png';
import sub5 from '../Images/subunits/5.png';
import sub6 from '../Images/subunits/6.png';
import sub7 from '../Images/subunits/7.png';

import attribute0 from '../Images/attribute/0.png';
import attribute1 from '../Images/attribute/1.png';
import attribute2 from '../Images/attribute/2.png';
import attribute3 from '../Images/attribute/3.png';

import n from '../Images/rarity/N.png';
import r from '../Images/rarity/R.png';
import sr from '../Images/rarity/SR.png';
import ssr from '../Images/rarity/SSR.png';
import ur from '../Images/rarity/UR.png';

const skill = [scoreUp, perfectLock, healer, special];
const region = [japan, world];
const mainUnit = {
  "μ's": mainUnit0,
  Aqours: mainUnit1
};

const subUnit = {
  Printemps: sub0,
  'Lily White': sub1,
  Bibi: sub2,
  'CYaRon!': sub3,
  AZALEA: sub4,
  'Guilty Kiss': sub5,
  'Saint Snow': sub6,
  'A-RISE': sub7
};

const attribute = {
  Smile: attribute0,
  Pure: attribute1,
  Cool: attribute2,
  All: attribute3,
  '': null
};

const rarity = [n, r, sr, ssr, ur];

export default {
  logo,
  promo,
  event,
  empty,
  alpaca,
  skill,
  region,
  mainUnit,
  subUnit,
  attribute,
  rarity
};
