import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';

import type {TextStyle} from 'react-native';

type Props = {
  seconds: number;
  interval?: number;
  style?: TextStyle;
};

const TimerCountdown = ({seconds, interval = 1000, style}: Props) => {
  const [remaining, setRemaining] = useState(seconds);

  const getFormattedTime = (t: number) => {
    const remainingSec = Math.round(t / 1000);
    const _seconds = parseInt((remainingSec % 60).toString(), 10);
    const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
    const hours = parseInt(((remainingSec / 3600) % 24).toString(), 10);
    const days = parseInt((remainingSec / (3600 * 24)).toString(), 10);
    const s = _seconds < 10 ? `0${_seconds}` : `${_seconds}`;
    let m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let h = hours < 10 ? `0${hours}` : `${hours}`;
    const d =
      days === 0 ? '' : String(days) + (days === 1 ? ' day ' : ' days ');
    h =
      h === '00'
        ? ''
        : String(h) + (parseInt(h, 10) === 1 ? ' hour ' : ' hours ');
    m =
      m === '00'
        ? ''
        : String(m) + (parseInt(m, 10) === 1 ? ' minute ' : ' minutes ');
    return `${d}${h}${m}${s} seconds`;
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setRemaining(remaining - interval);
    }, interval);
    return () => {
      clearTimeout(id);
    };
  });

  return <Text style={style}>{getFormattedTime(remaining)}</Text>;
};

export default TimerCountdown;
