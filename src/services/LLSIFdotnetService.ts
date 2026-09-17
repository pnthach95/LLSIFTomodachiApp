import {create} from 'apisauce';

const LLSIFnet = create({baseURL: 'https://llsif.net/', timeout: 10000});

/** Fetch event data */
const fetchEventData = async (
  params: LLSIFnetParams,
): Promise<string | null> => {
  const l = `data/${params.server}/${params.id}.csv`;
  const response = await LLSIFnet.get<string>(l);
  if (response.ok && response.data) {
    return response.data;
  }
  return null;
};

const parseEvent = (events: Record<string, LLSIFnetEvent>) => {
  const result: LLNETEvent[] = [];
  const keys = Object.keys(events);
  keys.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const element = events[key];
      result.push({
        event_id: element.event_id,
        event_name: element.event_name,
        start_date: element.start_date,
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
      jp: parseEvent(response.data.jp_events),
    };
    return result;
  }
  return {ww: [], jp: []};
};

export default {fetchEventData, fetchEventInfo};
