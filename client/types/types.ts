export interface ProductDetails {
  id: number;
  title: string;
  desc: string;
  price: number;
  category: string;
  count: number;
  image: string;
}

export interface Wishlist {
  id: number;
  product_id: number;
  created_at: string;
}
