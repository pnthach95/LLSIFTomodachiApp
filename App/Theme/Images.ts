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
import muse from '../Images/units/0.png';
import Aqours from '../Images/units/1.png';
import Printemps from '../Images/subunits/0.png';
import LilyWhite from '../Images/subunits/1.png';
import Bibi from '../Images/subunits/2.png';
import CYaRon from '../Images/subunits/3.png';
import AZALEA from '../Images/subunits/4.png';
import GuiltyKiss from '../Images/subunits/5.png';
import SaintSnow from '../Images/subunits/6.png';
import ARISE from '../Images/subunits/7.png';

import Smile from '../Images/attribute/0.png';
import Pure from '../Images/attribute/1.png';
import Cool from '../Images/attribute/2.png';
import All from '../Images/attribute/3.png';

import N from '../Images/rarity/N.png';
import R from '../Images/rarity/R.png';
import SR from '../Images/rarity/SR.png';
import SSR from '../Images/rarity/SSR.png';
import UR from '../Images/rarity/UR.png';

const skill = [scoreUp, perfectLock, healer, special];
const region = [japan, world];

const subUnit = {
  Printemps,
  'Lily White': LilyWhite,
  Bibi,
  'CYaRon!': CYaRon,
  AZALEA,
  'Guilty Kiss': GuiltyKiss,
  'Saint Snow': SaintSnow,
  'A-RISE': ARISE,
};

const multi = {
  '': empty,
  Smile,
  Pure,
  Cool,
  All,
  N,
  R,
  SR,
  SSR,
  UR,
  "μ's": muse,
  Aqours,
};

export default {
  logo,
  promo,
  event,
  empty,
  alpaca,
  skill,
  region,
  subUnit,
  multi,
};
