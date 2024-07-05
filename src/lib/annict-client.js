import axios from 'axios';

const annictClient = axios.create({
  baseURL: 'https://api.annict.com/v1',
  params: {
    access_token: process.env.NEXT_PUBLIC_ANNICT_API_KEY
  }
});

export const fetchCurrentSeasonAnime = async () => {
  try {
    const response = await annictClient.get('/works', {
      params: {
        filter_season: getCurrentSeason(),
        sort_watchers_count: 'desc',
        per_page: 50
      }
    });
    return response.data.works;
  } catch (error) {
    console.error('Error fetching current season anime:', error);
    throw error;
  }
};

function getCurrentSeason() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  let season;

  if (month >= 1 && month <= 3) season = 'winter';
  else if (month >= 4 && month <= 6) season = 'spring';
  else if (month >= 7 && month <= 9) season = 'summer';
  else season = 'autumn';

  return `${year}-${season}`;
};

export const fetchAnimeDetail = async (id) => {
  console.log('Fetching anime detail with id:', id);

  try {
    const response = await annictClient.get('/works', {
      params: {
        filter_ids: id,
        fields: 'id,title,media,images,media_text,season_name_text,episodes_count,watchers_count,rating_average,synopsis,broadcast_text',
        access_token: process.env.NEXT_PUBLIC_ANNICT_API_KEY
      }
    });
    console.log('Annict API response:', response.data);
    
    if (response.data.works && response.data.works.length > 0) {
      return response.data.works[0];
    } else {
      throw new Error('No anime found with the given ID');
    }
  } catch (error) {
    console.error('Error fetching anime detail:', error.response ? error.response.data : error.message);
    throw error;
  }
};