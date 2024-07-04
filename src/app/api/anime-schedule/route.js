import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request) {
  console.log('Received request for anime schedule');

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
    console.log('Parsed result structure:', JSON.stringify(result, null, 2).substring(0, 1000));

    const items = result['rdf:RDF'].item;
    console.log('Items:', items);

    const schedules = Array.isArray(items) 
      ? items.map(item => ({
          title: item.title,
          date: item['dc:date'],
          publisher: item['dc:publisher'],
          genre: item['tv:feed']['tv:genre'],
          startTime: item['tv:feed']['tv:startDatetime'],
          endTime: item['tv:feed']['tv:endDatetime']
        }))
      : [];

    console.log(`Extracted ${schedules.length} schedules`);

    if (schedules.length === 0) {
      console.log('No schedules found');
      return NextResponse.json({ message: 'No schedules found', parsedResult: result['rdf:RDF'] });
    }

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Error in anime schedule API route:', error);
    return NextResponse.json({ error: 'Failed to fetch anime schedule', details: error.message }, { status: 500 });
  }
}