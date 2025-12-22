const BASE_URL: string = "http://127.0.0.1:8000/api/products/";

import axios from "axios";

export const getProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}?format=json`);
  return data;
};
