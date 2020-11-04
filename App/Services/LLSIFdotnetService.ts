import { create } from 'apisauce';
import {
  LLSIFnetEvent,
  LLSIFnetData,
  LLNETEvent,
  LLNETEventInfo,
  LLSIFnetParams
} from '~/Utils/types';

const LLSIFnet = create({
  baseURL: 'https://llsif.net/',
  timeout: 10000
});

/**
 * Fetch event data
 */
const fetchEventData = async (params: LLSIFnetParams) => {
  const response = await LLSIFnet.get(`data/${params.server}/${params.id}.csv`);
  if (response.ok) {
    return response.data;
  }
  return null;
};

const parseEvent = (events: Record<string, LLSIFnetEvent>) => {
  const result: LLNETEvent[] = [];
  const keys = Object.keys(events);
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const element = events[key];
      result.push({
        event_id: element.event_id,
        start_date: element.start_date
      });
    }
  });
  return result;
};

const fetchEventInfo = async (): Promise<LLNETEventInfo> => {
  const response = await LLSIFnet.get<LLSIFnetData>('data/event_info.json');
  if (response.ok && response.data) {
    const result = {
      ww: parseEvent(response.data.en_events),
      jp: parseEvent(response.data.jp_events)
    };
    return result;
  }
  return { ww: null, jp: null };
};

export default {
  fetchEventData,
  fetchEventInfo
};
