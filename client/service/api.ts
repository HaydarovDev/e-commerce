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
  return await axios.get(`${BASE_URL}wishlist/items/?format=json`);
};

export const deleteId = async (id: number) => {
  return await axios.delete(`http://127.0.0.1:8000/wishlist/items/${id}/`);
};

//

const API_URL = "http://127.0.0.1:8000/cart/cart/";

export async function getCart() {
  const res = await fetch(API_URL, { cache: "no-store" });
  return res.json();
}

export async function addToCart(product_id: number) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id }),
  });
  return res.json();
}

export async function removeFromCart(product_id: number) {
  await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id }),
  });
}
