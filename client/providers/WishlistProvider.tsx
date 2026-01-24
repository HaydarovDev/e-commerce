"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  addToCart,
  deleteId,
  getCart,
  getWishlistId,
  postId,
} from "@/service/api";
import { Cart, Wishlist } from "@/types/types";

interface WishlistContextType {
  wishlistIds: number[];
  toggleLike: (productId: number) => Promise<void>;
  deleteItem: (productId: number) => Promise<void>;
  postItem: (product_id: number) => Promise<void>;
  handleAddCart: (product_id: number) => Promise<void>;
  cartIds: number[];
  formatUZS: (amount: number) => string;
  cart: Cart[];
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [cart, setCart] = useState<Cart[] | []>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getWishlistId();
      setWishlist(data);
    };
    fetchWishlist();
    const getCartId = async () => {
      const { data } = await getCart();
      setCart(data);
    };
    getCartId();
  }, []);

  const wishlistIds = useMemo(
    () => wishlist.map((w) => w.product_id),
    [wishlist],
  );

  const cartIds = useMemo(() => cart.map((w) => w.product_id), [cart]);

  const handleAddCart = async (product_id: number) => {
    await addToCart(product_id);
  };

  const toggleLike = async (productId: number) => {
    const existing = wishlist.find((w) => w.product_id === productId);

    if (existing) {
      setWishlist((prev) => prev.filter((w) => w.product_id !== productId));

      try {
        await deleteId(existing.id);
      } catch (err) {
        setWishlist((prev) => [...prev, existing]);
        console.error("Delete wishlist error:", err);
      }
      return;
    }

    const tempItem: Wishlist = {
      id: -productId,
      product_id: productId,
    };

    setWishlist((prev) => [...prev, tempItem]);

    try {
      const newItem = await postId(productId);
      setWishlist((prev) =>
        prev.map((w) => (w.id === tempItem.id ? newItem : w)),
      );
    } catch (err) {
      setWishlist((prev) => prev.filter((w) => w.id !== tempItem.id));
      console.error("Add wishlist error:", err);
    }
  };

  const deleteItem = async (productId: number) => {
    const item = wishlist.find((w) => w.product_id === productId);
    if (!item) return;

    setWishlist((prev) => prev.filter((w) => w.product_id !== productId));

    try {
      await deleteId(item.id);
    } catch (err) {
      setWishlist((prev) => [...prev, item]);
      console.error("Delete item error:", err);
    }
  };

  const formatUZS = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const postItem = async () => {};

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleLike,
        deleteItem,
        cartIds,
        postItem,
        handleAddCart,
        cart,
        formatUZS,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return ctx;
};
