"use client";
import FlashIcon from "@/assets/images/icons/FlashIcon";
import LikedIcon from "@/assets/images/icons/LikedIcon";
import SearchIcon from "@/assets/images/icons/SearchIcon";
import UserIcon from "@/assets/images/icons/UserIcon";
import WishlistIcon from "@/assets/images/icons/WishlistIcon";
import { useWishlist } from "@/providers/WishlistProvider";
import { IconButton } from "@mui/material";
import Link from "next/link";

const Header = () => {
  const { wishlistIds, cartIds } = useWishlist();

  return (
    <header className="w-full bg-white flex px-10 py-2 justify-between shadow-sm fixed z-10">
      <Link href="/" className="flex text-2xl font-bold items-center">
        <FlashIcon />
        Market
      </Link>
      <ul className="flex items-center gap-5 font-semibold">
        <Link href="/products" className="hidden md:block">
          Products
        </Link>
        <Link href="" className="hidden md:block">
          Contact Us
        </Link>
        <label
          htmlFor="search"
          className="hidden sm:flex items-center border p-1 rounded-[7px] gap-2 mx-3"
        >
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            className="outline-0"
            id="search"
          />
        </label>
        <Link href="/wishlist">
          <IconButton aria-label="wishlist" className="relative ">
            <LikedIcon />
            <span className="absolute top-[-4] right-0 text-[15px] font-bold">
              {wishlistIds.length === 0 ? "" : wishlistIds.length}
            </span>
          </IconButton>
        </Link>
        <Link href="/cart">
          <IconButton>
            <WishlistIcon />
            <span className="absolute top-[-4] right-0 text-[15px] font-bold">
              {cartIds.length === 0 ? "" : cartIds.length}
            </span>
          </IconButton>
        </Link>
        <IconButton aria-label="account">
          <Link href="">
            <UserIcon />
          </Link>
        </IconButton>
      </ul>
    </header>
  );
};

export default Header;
