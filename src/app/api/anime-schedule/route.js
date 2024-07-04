import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request) {
  console.log('Received request for current anime schedule');

  try {
    console.log('Fetching from Syoboi Calendar');
    const response = await axios.get('http://cal.syoboi.jp/rss.php');

    console.log('Received response from Syoboi Calendar');
    console.log('Response status:', response.status);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    console.log('Parsing XML');
    const result = parser.parse(response.data);
    
    console.log('XML parsed successfully');

    const items = result['rdf:RDF'].item;
    console.log('Total items:', items ? items.length : 0);

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

    console.log(`Extracted ${schedules.length} current schedules`);

    if (schedules.length === 0) {
      console.log('No current schedules found');
      return NextResponse.json({ message: 'No current schedules found' });
    }

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error in anime schedule API route:', error);
    return NextResponse.json({ error: 'Failed to fetch anime schedule', details: error.message }, { status: 500 });
  }
}