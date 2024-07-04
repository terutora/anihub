import axios from 'axios';

const annictClient = axios.create({
  baseURL: 'https://api.annict.com/v1',
  params: {
    access_token: process.env.ANNICT_API_KEY
  }
});

const syobocalClient = axios.create({
  baseURL: 'https://cal.syoboi.jp/api/v1'
});

export const fetchAnimeList = async (params = {}) => {
  try {
    const response = await annictClient.get('/works', { params });
    return response.data.works;
  } catch (error) {
    console.error('Error fetching anime list:', error);
    throw error;
  }
};

export const fetchAnimeSchedule = async (start, end) => {
  try {
    const response = await syobocalClient.get('/programs', {
      params: {
        start: start.toISOString(),
        end: end.toISOString()
      }
    });
    return response.data.programs;
  } catch (error) {
    console.error('Error fetching anime schedule:', error);
    throw error;
  }
};