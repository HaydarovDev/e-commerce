import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link href={"/products"}>products</Link>
      <Link href={"/wishlist"}>wishlist</Link>
    </div>
  );
}
