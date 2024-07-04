import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const syobocalClient = axios.create({
  baseURL: 'http://cal.syoboi.jp'
});

export const fetchCurrentAnimeSchedule = async () => {
  try {
    const response = await syobocalClient.get('/rss.php');
    console.log('Syobocal API response:', response.data); // デバッグ用ログ

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const result = parser.parse(response.data);
    console.log('Parsed XML:', JSON.stringify(result, null, 2)); // デバッグ用ログ

    const items = result['rdf:RDF'].item;
    console.log('Items:', items); // デバッグ用ログ

    const now = new Date();
    const schedules = Array.isArray(items) 
      ? items
          .map(item => ({
            title: item.title,
            date: item['dc:date'],
            publisher: item['dc:publisher'],
            genre: item['tv:feed']['tv:genre'],
            startTime: new Date(item['tv:feed']['tv:startDatetime']),
            endTime: new Date(item['tv:feed']['tv:endDatetime'])
          }))
          .filter(item => item.startTime <= now && item.endTime > now)
          .sort((a, b) => a.endTime - b.endTime)
      : [];

    console.log('Filtered schedules:', schedules); // デバッグ用ログ
    return schedules;
  } catch (error) {
    console.error('Error fetching current anime schedule:', error);
    throw error;
  }
};