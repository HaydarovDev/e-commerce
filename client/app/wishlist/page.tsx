"use client";

import LikeIcon from "@/assets/images/icons/LikeIcon";
import { useWishlist } from "@/providers/WishlistProvider";
import { getProducts } from "@/service/api";
import { ProductDetails } from "@/types/types";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
const Wishlist = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const { wishlistIds, deleteItem } = useWishlist();

  useEffect(() => {
    const getData = async () => {
      const products: ProductDetails[] = await getProducts();
      setProducts(products);
    };
    getData();
  }, []);

  const findProduct = products.filter((product) =>
    wishlistIds.includes(product.id),
  );

  return (
    <article className="grid grid-cols-5 gap-5 py-5 pt-20 px-10">
      {findProduct.length ? (
        findProduct.map((item) => (
          <div key={item.id} className="bg-[#F8F8F8] p-3 rounded-2xl relative">
            <IconButton onClick={() => deleteItem(item.id)}>
              <LikeIcon liked="red" />
            </IconButton>

            <Image
              src={item.image}
              alt={item.title}
              className="rounded-2xl"
              width={300}
              height={300}
            />

            <h3>{item.title}</h3>
          </div>
        ))
      ) : (
        <h1>Wishlist empty</h1>
      )}
    </article>
  );
};

export default Wishlist;
