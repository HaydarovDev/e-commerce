"use client";
import { useState } from "react";

const BestSellers = () => {
  const [active, setActive] = useState<number>(0);
  const category = [
    "Health Food",
    "Proteins",
    "Gainers",
    "Pre-Workout",
    "Accessories",
    "Ayurveda",
  ];

  const handleClick = (index: number): void => {
    setActive(index);
  };

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
                  i === active ? "after:w-full after:bg-[#38CB89]" : ""
                }`}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </article>
  );
};

export default BestSellers;
