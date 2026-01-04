"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { deleteId, getWishlistId, postId } from "@/service/api";
import { Wishlist } from "@/types/types";

interface WishlistContextType {
  wishlistIds: number[];
  toggleLike: (productId: number) => Promise<void>;
  deleteItem: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  // 🔥 mount bo‘lganda fetch
  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getWishlistId();
      setWishlist(data);
    };
    fetchWishlist();
  }, []);

  // ✅ derived state
  const wishlistIds = useMemo(
    () => wishlist.map((w) => w.product_id),
    [wishlist]
  );

  // ❤️ like / unlike
  const toggleLike = async (productId: number) => {
    const existing = wishlist.find((w) => w.product_id === productId);

    // ❌ unlike
    if (existing) {
      setWishlist((prev) => prev.filter((w) => w.product_id !== productId));

      try {
        await deleteId(existing.id);
      } catch (err) {
        // rollback
        setWishlist((prev) => [...prev, existing]);
        console.error("Delete wishlist error:", err);
      }
      return;
    }

    // ✅ like (optimistic)
    const tempItem: Wishlist = {
      id: -productId, // temp id
      product_id: productId,
    };

    setWishlist((prev) => [...prev, tempItem]);

    try {
      const newItem = await postId(productId);
      setWishlist((prev) =>
        prev.map((w) => (w.id === tempItem.id ? newItem : w))
      );
    } catch (err) {
      // rollback
      setWishlist((prev) => prev.filter((w) => w.id !== tempItem.id));
      console.error("Add wishlist error:", err);
    }
  };

  // 🗑 delete by productId
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

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleLike, deleteItem }}>
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
