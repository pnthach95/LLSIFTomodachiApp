import Smile from './attribute/0.png';
import Pure from './attribute/1.png';
import Cool from './attribute/2.png';
import All from './attribute/3.png';
import chika from './characters/chika.png';
import dia from './characters/dia.png';
import eli from './characters/eli.png';
import hanamaru from './characters/hanamaru.png';
import hanayo from './characters/hanayo.png';
import honoka from './characters/honoka.png';
import kanan from './characters/kanan.png';
import kotori from './characters/kotori.png';
import leah from './characters/leah.png';
import maki from './characters/maki.png';
import mari from './characters/mari.png';
import nico from './characters/nico.png';
import nozomi from './characters/nozomi.png';
import riko from './characters/riko.png';
import rin from './characters/rin.png';
import ruby from './characters/ruby.png';
import sarah from './characters/sarah.png';
import umi from './characters/umi.png';
import yoshiko from './characters/yoshiko.png';
import you from './characters/you.png';
import empty from './others/empty.png';
import event from './others/event.png';
import logo from './others/logo_shadow.png';
import promo from './others/promo.png';
import alpaca from './others/small_Alpaca.png';
import N from './rarity/N.png';
import R from './rarity/R.png';
import SR from './rarity/SR.png';
import SSR from './rarity/SSR.png';
import UR from './rarity/UR.png';
import japan from './regions/japan.png';
import world from './regions/world.png';
import healer from './skills/healer.png';
import perfectLock from './skills/perfect_lock.png';
import scoreUp from './skills/score_up.png';
import special from './skills/special.png';
import Printemps from './subunits/0.png';
import LilyWhite from './subunits/1.png';
import QU4RTZ from './subunits/10.png';
import R3BIRTH from './subunits/11.png';
import SunnyPassion from './subunits/11.png';
import Bibi from './subunits/2.png';
import CYaRon from './subunits/3.png';
import AZALEA from './subunits/4.png';
import GuiltyKiss from './subunits/5.png';
import SaintSnow from './subunits/6.png';
import ARISE from './subunits/7.png';
import AZuNa from './subunits/8.png';
import DiverDiva from './subunits/9.png';
import muse from './units/0.png';
import Aqours from './units/1.png';
import Nijigasaki from './units/2.png';
import Liella from './units/3.png';

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
  R3BIRTH,
  QU4RTZ,
  'Diver Diva': DiverDiva,
  'A-Zu-Na': AZuNa,
  'Sunny Passion': SunnyPassion,
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
  Nijigasaki,
  'Nijigasaki High Scho': Nijigasaki,
  'Liella!': Liella,
};

const characters = {
  'Ayase Eli': eli,
  'Hoshizora Rin': rin,
  'Koizumi Hanayo': hanayo,
  'Kousaka Honoka': honoka,
  'Minami Kotori': kotori,
  'Nishikino Maki': maki,
  'Sonoda Umi': umi,
  'Toujou Nozomi': nozomi,
  'Yazawa Nico': nico,
  'Takami Chika': chika,
  'Sakurauchi Riko': riko,
  'Watanabe You': you,
  'Kurosawa Dia': dia,
  'Ohara Mari': mari,
  'Matsuura Kanan': kanan,
  'Kurosawa Ruby': ruby,
  'Kunikida Hanamaru': hanamaru,
  'Tsushima Yoshiko': yoshiko,
  'Kazuno Leah': leah,
  'Kazuno Sarah': sarah,
};

const Images = {
  logo,
  promo,
  event,
  empty,
  alpaca,
  skill,
  region,
  subUnit,
  multi,
  characters,
};

export {Images};
