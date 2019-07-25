import { create } from 'apisauce';

const LLSIFnet = create({
  baseURL: 'https://llsif.net/',
  timeout: 10000,
});

/**
 * Fetch event data
 *
 * @returns
 */
async function fetchEventData(params) {
  const response = await LLSIFnet.get('download.php', params);
  if (response.ok) {
    return response.data;
  }
  return null;
}

function parseEvent(events) {
  const result = [];
  const keys = Object.keys(events);
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const element = events[key];
      result.push({
        event_id: element.event_id,
        start_date: element.start_date,
      });
    }
  });
  return result;
}

async function fetchEventInfo() {
  const response = await LLSIFnet.get('data/event_info.json');
  if (response.ok) {
    const result = {
      ww: parseEvent(response.data.en_events),
      jp: parseEvent(response.data.jp_events),
    };
    return result;
  }
  return { ww: null, jp: null };
}

export default {
  fetchEventData,
  fetchEventInfo,
};
