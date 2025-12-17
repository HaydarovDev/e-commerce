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

export default function ProductsPage() {
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
    fetchProducts();
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId: number) => {
    const item = wishlist.find((w) => w.product_id === productId);
    if (item) {
      await fetch(`http://127.0.0.1:8000/wishlist/items/${item.id}/`, {
        method: "DELETE",
      });
    } else {
      await fetch("http://127.0.0.1:8000/wishlist/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });
    }
    await fetchWishlist(); // refresh wishlist
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Products
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => router.push("/wishlist")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Go to Wishlist
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const inWishlist = wishlist.some((w) => w.product_id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-lg text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-500 mb-4">${product.price}</p>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-2 right-2 text-2xl transition-transform transform ${
                  inWishlist ? "text-red-500 scale-110" : "text-gray-300"
                } hover:scale-125`}
              >
                ♥
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
