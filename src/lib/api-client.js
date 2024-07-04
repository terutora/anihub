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