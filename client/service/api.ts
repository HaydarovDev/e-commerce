const BASE_URL: string = "http://127.0.0.1:8000/";

import axios from "axios";

export const getProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}api/products/?format=json`);
  return data;
};

export const postId = async (id: number) => {
  await axios.post(`${BASE_URL}wishlist/items/`, { product_id: id });
};

export const getWishlistId = async () => {
  return await axios.get(`${BASE_URL}wishlist/items/?format=json`);
};
