import axios from 'axios';

const baseUrl = 'http://localhost:8050/favorites';

export const getFavorites = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const addFavorite = async (city) => {
  const response = await axios.post(baseUrl, { city });
  return response.data;
};

export const removeFavorite = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
