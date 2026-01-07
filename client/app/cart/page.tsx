"use client";

import LikeIcon from "@/assets/images/icons/LikeIcon";
import { useWishlist } from "@/providers/WishlistProvider";
import { getProducts } from "@/service/api";
import { Product } from "@/types/types";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { cartIds, toggleLike, wishlistIds } = useWishlist();
  const [products, setProducts] = useState<Product[] | []>([]);

  console.log(cartIds);

  useEffect(() => {
    const getData = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    getData();
  }, []);

  const filteredProducts = products.filter((product) =>
    cartIds.includes(product.id)
  );

  return (
    <article className="grid grid-cols-5 gap-5 py-5 pt-20 px-10">
      {filteredProducts.length ? (
        filteredProducts.map((item) => (
          <div key={item.id} className="bg-[#F8F8F8] p-3 rounded-2xl relative">
            <IconButton onClick={() => toggleLike(item.id)}>
              <LikeIcon
                liked={wishlistIds.includes(item.id) ? "red" : "#000"}
              />
            </IconButton>

            <Image src={item.image} alt={item.title} width={300} height={300} />

            <h3>{item.title}</h3>
          </div>
        ))
      ) : (
        <h1>Wishlist bo‘sh</h1>
      )}
    </article>
  );
};

export default Wishlist;
