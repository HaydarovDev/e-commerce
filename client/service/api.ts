import axios from "axios";

const BASE_URL: string = "http://127.0.0.1:8000/";

export const getProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}api/products/?format=json`);
  return data;
};

export const postId = async (id: number) => {
  try {
    const { data } = await axios.post(`${BASE_URL}wishlist/items/`, {
      product_id: id,
    });
    return data; // backend object qaytarsa shu kerak
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Wishlist POST error:", error.response?.data || error);
      throw error;
    }
  }
};

export const getWishlistId = async () => {
  return await axios.get(`${BASE_URL}wishlist/items/?format=json`);
};

export const deleteId = async (id: number) => {
  return await axios.delete(`http://127.0.0.1:8000/wishlist/items/${id}/`);
};
