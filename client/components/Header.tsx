import FlashIcon from "@/assets/images/icons/FlashIcon";
import LikedIcon from "@/assets/images/icons/LikedIcon";
import SearchIcon from "@/assets/images/icons/SearchIcon";
import UserIcon from "@/assets/images/icons/UserIcon";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white flex px-10 py-2 justify-between shadow-sm absolute z-10">
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
        <button aria-label="wishlist">
          <Link href="">
            <LikedIcon />
          </Link>
        </button>
        <button aria-label="account">
          <Link href="">
            <UserIcon />
          </Link>
        </button>
      </ul>
    </header>
  );
};

export default Header;
