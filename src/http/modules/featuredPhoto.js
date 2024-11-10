import axios from "../axios";

// Get All Items
export const getAllItems = () => {
  return axios({
    url: 'FeaturedPhoto',
    method: 'get',
  });
};

// Get Specific Item
export const getItemById = (itemId) => {
  return axios({
    url: `FeaturedPhoto/${itemId}`,
    method: 'get'
  });
};

// Add New Item
export const addItem = (data) => {
  return axios({
    url: 'FeaturedPhoto',
    method: 'post',
    data
  });
};

// Delete Specific Item
export const deleteItemById = (itemId) => {
  return axios({
    url: `FeaturedPhoto/${itemId}/`,
    method: 'delete'
  });
};
