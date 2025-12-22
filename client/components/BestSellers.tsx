"use client";
import { getProducts } from "@/service/api";
import { ProductDetails } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [active, setActive] = useState<number>(0);
  const [data, setData] = useState<ProductDetails[] | []>([]);
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
    };
    data();
  }, []);

  const handleClick = (index: number): void => {
    setActive(index);
  };

  console.log(data);

  return (
    <article className="pt-15">
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
        {data &&
          data.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-[#F8F8F8] p-3 rounded-2xl relative duration-100 hover:shadow-sm group"
              >
                <span className="absolute left-3 p-2 justify-center w-10 h-10 text-[#ffffff] flex items-center font-semibold rounded-[50%] bg-[#CB4138]">
                  -50%
                </span>
                <div>
                  <div className="overflow-hidden bg-[#FFFFFF] rounded-2xl px-3">
                    <Image
                      src={item.image}
                      alt="product image"
                      width={100}
                      height={100}
                      className="bg-white object-cover"
                      loading="eager"
                    />

                    <button
                      // onClick={() => console.log(item.id)}
                      className="w-full btn text-white cursor-pointer py-2 rounded-[7px] translate-y-[105%] group-hover:-translate-y-3 transition-all duration-120"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <p>{item.title}</p>
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
