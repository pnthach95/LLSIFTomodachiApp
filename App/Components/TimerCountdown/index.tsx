import React, { useState, useEffect } from 'react';
import { TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

const TimerCountdown = ({
  initialSecondsRemaining,
  interval = 1000,
  style
}: {
  initialSecondsRemaining: number;
  interval?: number;
  style?: TextStyle;
}) => {
  const [remaining, setRemaining] = useState(initialSecondsRemaining);

  const getFormattedTime = (t: number) => {
    const remainingSec = Math.round(t / 1000);
    const seconds = parseInt((remainingSec % 60).toString(), 10);
    const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
    const hours = parseInt(((remainingSec / 3600) % 24).toString(), 10);
    const days = parseInt((remainingSec / (3600 * 24)).toString(), 10);
    const s = seconds < 10 ? `0${seconds}` : seconds;
    let m = minutes < 10 ? `0${minutes}` : minutes;
    let h = hours < 10 ? `0${hours}` : hours;
    const d = days == 0 ? '' : days + (days == 1 ? ' day ' : ' days ');
    h = h === '00' ? '' : h + (h == 1 ? ' hour ' : ' hours ');
    m = m === '00' ? '' : m + (m == 1 ? ' minute ' : ' minutes ');
    return `${d + h + m + s} seconds`;
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