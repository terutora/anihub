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
        per_page: 10
      }
    });
    console.log('Annict API response:', response.data);
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
  console.log('Annict client: Fetching anime detail with id:', id);

  try {
    const response = await annictClient.get('/works', {
      params: {
        filter_ids: id,
        }
    });
    console.log('Annict client: Full API response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.works && response.data.works.length > 0) {
      const animeDetail = response.data.works[0];
      console.log('Annict client: Matching anime found:', animeDetail);
      
      // 画像URLの取得
      if (animeDetail.images) {
        animeDetail.imageUrl = getImageUrl(animeDetail.images);
      }
      
      return animeDetail;
    }
    console.log('Annict client: No matching anime found for ID:', id);
    return null;
  } catch (error) {
    console.error('Annict client: Error fetching anime detail:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 画像URLを取得する関数
function getImageUrl(images) {
  if (images.recommended_url) return images.recommended_url;
  if (images.facebook && images.facebook.og_image_url) return images.facebook.og_image_url;
  if (images.twitter && images.twitter.image_url) return images.twitter.image_url;
  return null; // 適切な画像URLが見つからない場合
}

export const fetchAnimeCasts = async (workId) => {
  console.log('Annict client: Fetching casts for work id:', workId);

  try {
    const response = await annictClient.get('/casts', {
      params: {
        filter_work_id: workId,
        per_page: 50,
        sort_id: 'asc',
        fields: 'id,name,character.id,character.name,person.id,person.name'
      }
    });
    console.log('Annict client: Casts API response:', JSON.stringify(response.data, null, 2));
    
    return response.data.casts;
  } catch (error) {
    console.error('Annict client: Error fetching casts:', error.message);
    if (error.response) {
      console.error('Error response:', JSON.stringify(error.response.data, null, 2));
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    }
    throw error;
  }
};