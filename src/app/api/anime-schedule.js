import axios from 'axios';

export default async function handler(req, res) {
  const { start, end } = req.query;

  try {
    const response = await axios.get('https://cal.syoboi.jp/json/db.php', {
      params: {
        Req: 'ProgramList',
        Start: start,
        End: end,
        Order: 'StartTime'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching anime schedule:', error);
    res.status(500).json({ error: 'Failed to fetch anime schedule' });
  }
}