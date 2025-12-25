"use client";
import LikedIcon from "@/assets/images/icons/LikedIcon";
import { getProducts, getWishlistId, postId } from "@/service/api";
import { ProductDetails, Wishlist } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [active, setActive] = useState<number>(0);
  const [data, setData] = useState<ProductDetails[] | []>([]);
  const [wishlistId, setWishlistId] = useState<Wishlist[] | []>([]);

  const category = [
    "Health Food",
    "Proteins",
    "Gainers",
    "Pre-Workout",
    "Accessories",
    "Ayurveda",
  ];

  useEffect(() => {
    const data = async () => {
      const productsList = await getProducts();
      setData(productsList);
      const { data } = await getWishlistId();
      setWishlistId(data);
    };
    data();
  }, []);

  const handleClick = (index: number): void => {
    setActive(index);
  };

  console.log(data);

  return (
    <article className="pt-15 p-4">
      <h1 className="text-2xl font-bold">Best seller</h1>
      <ul className="flex gap-3">
        {category &&
          category.map((item, i) => {
            return (
              <li
                key={item}
                onClick={() => handleClick(i)}
                className={`hover:text-[#38CB89] cursor-pointer p-1 duration-100 relative after:content after:absolute after:left-0 after:bottom-0 after:-z-1 after:w-0 after:h-0.5 after:duration-100 ${
                  i === active
                    ? "after:w-full text-[#38CB89] after:bg-[#38CB89]"
                    : ""
                }`}
              >
                {item}
              </li>
            );
          })}
      </ul>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 hover:cursor-pointer">
        {data &&
          data.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-[#F8F8F8] p-3 rounded-2xl relative duration-100 hover:shadow-sm group"
              >
                {wishlistId &&
                  wishlistId.map((id) => {
                    return (
                      <span
                        key={id.id}
                        onClick={() => postId(item.id)}
                        className="absolute left-3 p-2 justify-center w-10 h-10 text-[#ffffff] flex items-center font-semibold rounded-[50%] shadow-sm bg-white"
                      >
                        <LikedIcon />
                      </span>
                    );
                  })}
                <div>
                  <div className="overflow-hidden rounded-2xl px-3">
                    <Image
                      src={item.image}
                      alt="product image"
                      width={100}
                      height={100}
                      className="bg-white object-cover w-full rounded-2xl"
                      loading="eager"
                    />

                    <button className="w-full btn bg-[#38CB89] text-white cursor-pointer py-2 rounded-[7px] translate-y-[105%] group-hover:-translate-y-3 transition-all duration-120">
                      Add to cart
                    </button>
                  </div>
                </div>
                <h3>{item.title}</h3>
                <div className="flex gap-2">
                  {/* <p className="text-[#38CB89]">{item.newPrice}</p>
                  <del className="text-[#CB4138]">{item.oldPrice}</del> */}
                </div>
              </div>
            );
          })}
      </div>
    </article>
  );
};

export default BestSellers;
