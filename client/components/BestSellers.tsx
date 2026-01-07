"use client";

import LikeIcon from "@/assets/images/icons/LikeIcon";
import { getProducts } from "@/service/api";
import { ProductDetails } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWishlist } from "@/providers/WishlistProvider";
import { IconButton } from "@mui/material";

const BestSellers = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState<ProductDetails[]>([]);
  const { wishlistIds, toggleLike, handleAddCart } = useWishlist();

  const category = [
    "Health Food",
    "Proteins",
    "Gainers",
    "Pre-Workout",
    "Accessories",
    "Ayurveda",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setData(products);
    };
    fetchProducts();
  }, []);

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <article className="pt-15 p-4">
      <h1 className="text-2xl font-bold">Best seller</h1>

      <ul className="flex gap-3">
        {category.map((item, i) => (
          <li
            key={item}
            onClick={() => handleClick(i)}
            className={`cursor-pointer p-1 duration-100 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:-z-1 after:w-0 after:h-0.5 after:duration-100 hover:text-[#38CB89] ${
              i === active
                ? "after:w-full text-[#38CB89] after:bg-[#38CB89]"
                : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-5 gap-5 py-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-[#F8F8F8] p-3 rounded-2xl relative group"
          >
            <IconButton
              onClick={() => toggleLike(item.id)}
              sx={{
                position: "absolute",
                left: 12,
                top: 12,
                width: 40,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <LikeIcon
                liked={wishlistIds.includes(item.id) ? "red" : "#000"}
              />
            </IconButton>

            <div className="overflow-hidden rounded-2xl px-3">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="object-cover w-full rounded-2xl bg-white"
              />

              <button
                onClick={() => handleAddCart(item.id)}
                className="w-full btn bg-[#38CB89] text-white cursor-pointer py-2 rounded-[7px]
                           translate-y-[105%] group-hover:-translate-y-3
                           transition-all duration-120"
              >
                Add to cart
              </button>
            </div>

            <h3 className="mt-2">{item.title}</h3>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BestSellers;
