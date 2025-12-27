"use client";

import LikeIcon from "@/assets/images/icons/LikeIcon";
import { deleteId, getProducts, getWishlistId, postId } from "@/service/api";
import { ProductDetails, Wishlist } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [active, setActive] = useState<number>(0);
  const [data, setData] = useState<ProductDetails[] | []>([]);
  const [wishlistId, setWishlistId] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist[] | []>([]);

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
      setWishlist(data);
      setWishlistId(data.map((liked: Wishlist) => liked.product_id));
    };
    data();
  }, []);

  const handleClick = (index: number) => {
    setActive(index);
  };

  const handleLike = async (id: number) => {
    const exists = wishlist.find((item) => item.product_id === id);

    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product_id !== id));
      setWishlistId((prev) => prev.filter((pid) => pid !== id));

      try {
        await deleteId(exists.id);
      } catch (err) {
        setWishlist((prev) => [...prev, exists]);
        setWishlistId((prev) => [...prev, id]);
        console.error("Delete wishlist error:", err);
      }
    } else {
      // eslint-disable-next-line react-hooks/purity
      const tempItem: Wishlist = { id: Date.now(), product_id: id };
      setWishlist((prev) => [...prev, tempItem]);
      setWishlistId((prev) => [...prev, id]);

      try {
        const newItem = await postId(id);
        setWishlist((prev) =>
          prev.map((item) => (item.id === tempItem.id ? newItem : item))
        );
      } catch (err) {
        // Rollback on error
        setWishlist((prev) => prev.filter((item) => item.id !== tempItem.id));
        setWishlistId((prev) => prev.filter((pid) => pid !== id));
        console.error("Add wishlist error:", err);
      }
    }
  };

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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 hover:cursor-pointer py-5">
        {data &&
          data.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-[#F8F8F8] p-3 rounded-2xl relative duration-100 hover:shadow-sm group"
              >
                <span
                  key={i}
                  onClick={() => handleLike(item.id)}
                  className="absolute left-3 p-2 justify-center w-10 h-10 text-[#ffffff] flex items-center font-semibold rounded-[50%] shadow-sm bg-white"
                >
                  <LikeIcon
                    liked={wishlistId.includes(item.id) ? "red" : "#000"}
                  />
                </span>
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
