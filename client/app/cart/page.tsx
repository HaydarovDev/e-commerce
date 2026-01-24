"use client";

import LikeIcon from "@/assets/images/icons/LikeIcon";
import { useWishlist } from "@/providers/WishlistProvider";
import { addToCart, getProducts, removeCart } from "@/service/api";
import { ProductDetails } from "@/types/types";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { cart, cartIds, toggleLike, wishlistIds, formatUZS } = useWishlist();
  const [products, setProducts] = useState<ProductDetails[] | []>([]);

  useEffect(() => {
    const getData = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    getData();
  }, []);

  console.log(cart);

  const filteredProducts = products.filter((product) =>
    cartIds.includes(product.id),
  );

  const handleRemove = (id: number) => {
    removeCart(id);
  };

  const handleAddToCart = (id: number) => {
    addToCart(id);
  };

  const productQuantity = (id: number) => {
    return cart.find((c) => c.product_id === id)?.quantity ?? 1;
  };

  return (
    <article className="pt-24 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {filteredProducts.length ? (
        <div className="space-y-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="
                flex gap-4 
                bg-white 
                border 
                rounded-xl 
                p-4
              "
            >
              <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>

                  <IconButton onClick={() => toggleLike(item.id)}>
                    <LikeIcon
                      liked={wishlistIds.includes(item.id) ? "red" : "#000"}
                    />
                  </IconButton>
                </div>

                {/* <div className="flex items-center justify-between mt-4"> */}
                <div className="text-lg font-semibold">
                  {formatUZS(item.price * productQuantity(item.id))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="w-7 h-7 border rounded-full"
                    onClick={() => handleRemove(item.id)}
                  >
                    -
                  </button>
                  <span>{productQuantity(item.id)}</span>

                  <button
                    className="w-7 h-7 border rounded-full"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    +
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[40vh]">
          <h1 className="text-xl text-gray-500">No cart items</h1>
        </div>
      )}
    </article>
  );
};

export default Wishlist;
