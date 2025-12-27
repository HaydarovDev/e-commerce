"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { deleteId, getWishlistId, postId } from "@/service/api";
import { Wishlist } from "@/types/types";

interface WishlistContextType {
  wishlistIds: number[];
  toggleLike: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const { data } = await getWishlistId();
      setWishlist(data);
      setWishlistIds(data.map((item: Wishlist) => item.product_id));
    };
    fetchWishlist();
  }, []);

  const toggleLike = async (productId: number) => {
    const exists = wishlist.find((w) => w.product_id === productId);

    if (exists) {
      setWishlist((prev) => prev.filter((w) => w.product_id !== productId));
      setWishlistIds((prev) => prev.filter((id) => id !== productId));

      try {
        await deleteId(exists.id);
      } catch (err) {
        setWishlist((prev) => [...prev, exists]);
        setWishlistIds((prev) => [...prev, productId]);
        console.error("Delete wishlist error:", err);
      }
    } else {
      const tempItem: Wishlist = {
        id: Date.now(),
        product_id: productId,
      };

      setWishlist((prev) => [...prev, tempItem]);
      setWishlistIds((prev) => [...prev, productId]);

      try {
        const newItem = await postId(productId);
        setWishlist((prev) =>
          prev.map((w) => (w.id === tempItem.id ? newItem : w))
        );
      } catch (err) {
        setWishlist((prev) => prev.filter((w) => w.id !== tempItem.id));
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        console.error("Add wishlist error:", err);
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleLike }}>
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
