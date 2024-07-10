import axios from 'axios';

export const fetchAnnictData = async () => {
  try {
    const response = await axios.get('/api/annict');
    return response.data;
  } catch (error) {
    console.error('Error fetching Annict data:', error);
    throw error;
  }
};

export const fetchSyobocalData = async () => {
  try {
    const response = await axios.get('/api/syobocal');
    return response.data;
  } catch (error) {
    console.error('Error fetching Syobocal data:', error);
    throw error;
  }
};

export const searchAnime = async (query) => {
  console.log('Searching for:', query);
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    console.log('Search response status:', response.status);
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Search API error response:', errorBody);
      throw new Error(`Search API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Search results:', data);
    return data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};