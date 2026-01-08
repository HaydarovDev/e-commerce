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
  created_at?: string;
}

export interface WishlistItem {
  product_id: number;
}

// export interface Product {
//   id: number;
//   image: string;
//   title: string;
// }

export interface Cart {
  id: number;
  product_id: number;
  quantity: number;
}
