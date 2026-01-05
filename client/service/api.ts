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
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Wishlist POST error:", error.response?.data || error);
      throw error;
    }
  }
};

export const getWishlistId = async () => {
  const { data } = await axios.get(`${BASE_URL}wishlist/items/?format=json`);
  return data;
};

export const deleteId = async (id: number) => {
  return await axios.delete(`http://127.0.0.1:8000/wishlist/items/${id}/`);
};

export async function getCart() {
  const res = await axios.get(`${BASE_URL}cart/cart/?format=json`);
  return res;
}

export const addToCart = async (product_id: number) => {
  return await axios.post(
    `${BASE_URL}cart/cart/`,
    { product_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export async function removeFromCart(product_id: number) {
  await axios.delete(`${BASE_URL}/cart/cart`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      product_id,
    },
  });
}
