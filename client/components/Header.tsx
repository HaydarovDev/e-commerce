import SearchIcon from "@/assets/images/icons/SearchIcon";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="">Market</Link>
      <ul>
        <li>Products</li>
        <li>Contact Us</li>
        <label htmlFor="">
          <SearchIcon />
        </label>
      </ul>
    </header>
  );
};

export default Header;
