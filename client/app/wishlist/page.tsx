"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface WishlistItem {
  id: number;
  product_id: number;
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/products/");
    setProducts(await res.json());
  };

  const fetchWishlist = async () => {
    const res = await fetch("http://127.0.0.1:8000/wishlist/items/");
    setWishlist(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/wishlist/items/${id}/`, {
      method: "DELETE",
    });
    fetchWishlist();
  };

  // map wishlist items to full product info
  const wishlistProducts = wishlist
    .map((w) => products.find((p) => p.id === w.product_id))
    .filter(Boolean) as Product[];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Wishlist
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Go to Products
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => {
          const item = wishlist.find((w) => w.product_id === product.id)!;
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              {product.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 flex flex-col grow">
                <h2 className="font-semibold text-lg text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-500 mb-4">${product.price}</p>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {wishlistProducts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          Your wishlist is empty
        </p>
      )}
    </div>
  );
}
