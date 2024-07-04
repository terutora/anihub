import axios from 'axios';

const annictClient = axios.create({
    baseURL: 'https://api.annict.com/v1',
    params: {
      access_token: process.env.NEXT_PUBLIC_ANNICT_API_KEY
    }
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
    const response = await axios.get('/api/anime-schedule', {
      params: { 
        start: start.toISOString(), 
        end: end.toISOString() 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching anime schedule:', error);
    throw error;
  }
};